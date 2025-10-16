// Runs once before all tests
import fs from 'fs';

export default async function() {
  // Clean previous results
  const resultsDir = 'performance-reports';
  if (fs.existsSync(resultsDir)) {
    fs.rmSync(resultsDir, { recursive: true });
  }
  fs.mkdirSync(resultsDir, { recursive: true });
  console.log('Global setup completed');
}