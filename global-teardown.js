// Runs once after all workers complete
import fs from 'fs';
import path from 'path';

export default async function () {
  console.log('\n=== ALL WORKERS COMPLETED - AGGREGATING RESULTS ===');

  const resultsDir = 'performance-reports';
  const aggregated = await aggregateAllWorkerResults(resultsDir);

  // Save final aggregated results
  const finalResults = generateFinalReport(aggregated);
  fs.writeFileSync(
    path.join(resultsDir, 'FINAL-AGGREGATED-RESULTS.txt'),
    finalResults,
    'utf-8'
  );

  console.log('Final aggregated results saved!');
  console.log(finalResults);
}

async function aggregateAllWorkerResults(resultsDir) {
  // read from all run-*.json files
  const runFiles = fs.readdirSync(resultsDir).filter(file => file.startsWith('run-') && file.endsWith('.json'));

  // Merge data from all run files into actionExecutionTimes
  const actionExecutionTimes = {};
  
  for (const runFile of runFiles) {
    const filePath = path.join(resultsDir, runFile);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const workerData = JSON.parse(fileContent);
    
    // Merge each action's times into the aggregated object
    for (const [actionName, times] of Object.entries(workerData)) {
      if (!actionExecutionTimes[actionName]) {
        actionExecutionTimes[actionName] = [];
      }
      actionExecutionTimes[actionName].push(...times);
    }
  }

  // Calculate statistics for each action
  const actionStats = {};
  for (const [actionName, times] of Object.entries(actionExecutionTimes)) {
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);

    actionStats[actionName] = {
      average: avgTime.toFixed(2),
      min: minTime,
      max: maxTime,
      total: times.reduce((a, b) => a + b, 0),
      count: times.length,
      allTimes: times
    };
  }

  return actionStats;
}

function generateFinalReport(aggregated) {
  let report = '=== FINAL AGGREGATED PERFORMANCE RESULTS ===\n\n';
  report += 'Action Name\tAvg (ms)\tMin (ms)\tMax (ms)\tTotal (ms)\tCount\n';
  
  for (const [actionName, stats] of Object.entries(aggregated)) {
    report += `${actionName.padEnd(25)}\t${stats.average}\t${stats.min}\t${stats.max}\t${stats.total}\t${stats.count}\n`;
  }
  
  return report;
}