### page.locator(..) 'role' vs page.getByRole(..)

  const btn = page.locator('role=button[name="Ask XXX support"]')
  await expect(btn).toBeVisible();

* client request
```
{
	"id": 6,
	"guid": "frame@dc858989272bc3a720edb8ed425c6a9b",
	"method": "expect",
	"params": {
		"selector": "role=button[name=\"Ask XXX support\"]",
		"expression": "to.be.visible",
		"expectedValue": {
			"value": {
				"v": "undefined"
			},
			"handles": []
		},
		"isNot": false,
		"timeout": 5000
	},
	"metadata": {
		"location": {
			"file": "D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\hlm-all-locators1.js",
			"line": 26,
			"column": 22
		},
		"internal": false
	}
}
```
* server response err
```
{
	"id": 6,
	"result": {
		"matches": false,
		"received": {
			"s": "<element(s) not found>"
		},
		"timedOut": true,
		"log": [
			"  - Expect \"to.be.visible\" with timeout 5000ms",
			"  - waiting for locator('role=button[name=\"Ask XXX support\"]')"
		]
	}
}
```
* server response ok
```
{
	"id": 6,
	"result": {
		"matches": true,
		"received": {
			"s": "visible"
		}
	}
}
```

  const btn = page.getByRole('button', { name: 'Ask XXX support' });
  await expect(btn).toBeVisible();

* client request
```
{
	"id": 7,
	"guid": "frame@dc858989272bc3a720edb8ed425c6a9b",
	"method": "expect",
	"params": {
		"selector": "internal:role=button[name=\"Ask XXX support\"i]",
		"expression": "to.be.visible",
		"expectedValue": {
			"value": {
				"v": "undefined"
			},
			"handles": []
		},
		"isNot": false,
		"timeout": 5000
	},
	"metadata": {
		"location": {
			"file": "D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\hlm-all-locators1.js",
			"line": 28,
			"column": 22
		},
		"internal": false
	}
}
```
* server response err
```
{
	"id": 7,
	"result": {
		"matches": false,
		"received": {
			"s": "<element(s) not found>"
		},
		"timedOut": true,
		"log": [
			"  - Expect \"to.be.visible\" with timeout 5000ms",
			"  - waiting for getByRole('button', { name: 'Ask XXX support' })"
		]
	}
}
```
* server response ok
```
{
	"id": 7,
	"result": {
		"matches": true,
		"received": {
			"s": "visible"
		}
	}
}
```
  const btn = page.locator('role=button[name="Ask XXX support"]')
  await btn.click();

* client request
```
{
	"id": 8,
	"guid": "frame@dc858989272bc3a720edb8ed425c6a9b",
	"method": "click",
	"params": {
		"selector": "role=button[name=\"Ask XXX support\"]",
		"strict": true,
		"timeout": 30000
	},
	"metadata": {
		"location": {
			"file": "D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\hlm-all-locators1.js",
			"line": 29,
			"column": 14
		},
		"internal": false
	}
}
```
* server response err
```
{
	"id": 8,
	"error": {
		"error": {
			"message": "Timeout 30000ms exceeded.",
			"stack": "TimeoutError: Timeout 30000ms exceeded.\n    at ProgressController.run (..."
		}
	},
	"log": [
		"  - waiting for locator('role=button[name=\"Ask XXX support\"]')"
	]
}
```
* server response ok
```
{
	"id": 8
}
```
  const btn = page.getByRole('button', { name: 'Ask XXX support' });
  await btn.click();

* client request
```
{
	"id": 12,
	"guid": "frame@dc858989272bc3a720edb8ed425c6a9b",
	"method": "click",
	"params": {
		"selector": "internal:role=button[name=\"Ask XXX support\"i]",
		"strict": true,
		"timeout": 30000
	},
	"metadata": {
		"location": {
			"file": "D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\hlm-all-locators1.js",
			"line": 33,
			"column": 14
		},
		"internal": false
	}
}
```
* server response err
```
{
	"id": 12,
	"error": {
		"error": {
			"message": "Timeout 30000ms exceeded.",
			"stack": "TimeoutError: Timeout 30000ms exceeded.\n    at ProgressController.run (D:\\EPM-...",
			"name": "TimeoutError"
		}
	},
	"log": [
		"  - waiting for getByRole('button', { name: 'Ask XXX support' })"
	]
}
```
* server response ok
```
{
	"id": 12
}
```  
### page.locator(..) more than 1 element exception

  // By CSS attributes
  await expect(page.locator('a.t-btn.t-btn_md')).toBeVisible(); 

* client request
```
{
	"id": 7,
	"guid": "frame@c139078732ab7c3d7e93b4d616372d3d",
	"method": "expect",
	"params": {
		"selector": "a.t-btn.t-btn_md",
		"expression": "to.be.visible",
		"expectedValue": {
			"value": {
				"v": "undefined"
			},
			"handles": []
		},
		"isNot": false,
		"timeout": 5000
	},
	"metadata": {
		"location": {
			"file": "D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\hlm-all-locators2.js",
			"line": 26,
			"column": 50
		},
		"internal": false
	}
}
```
* server response err
```
{
	"id": 7,
	"error": {
		"error": {
			"message": "Error: strict mode violation: locator('a.t-btn.t-btn_md') resolved to 2 elements:\n    1) <a target=\"\" class=\"t-btn t-btn_md \" data-buttonfieldset=\"button\" href=\"https://github.com/healenium/healenium\">↵Get started↵</a> aka getByRole('link', { name: 'Get started', exact: true })\n    2) <a target=\"_blank\" data-buttonfieldset=\"button\" class=\"t588__btn t-btn t-btn_md \" href=\"https://github.com/healenium/healenium\">…</a> aka getByRole('link', { name: 'Get started now' })\n",
			"stack": "Error: Error: strict mode violation: locator('a.t-btn.t-btn_md') resolved to 2 elements:\n    1) <a target=\"\" class=\"t-btn t-btn_md \" data-buttonfieldset=\"button\" href=\"https://github.com/healenium/healenium\">↵Get started↵</a> aka getByRole('link', { name: 'Get started', exact: true })\n    2) <a target=\"_blank\" data-buttonfieldset=\"button\" class=\"t588__btn t-btn t-btn_md \" href=\"https://github.com/healenium/healenium\">…</a> aka getByRole('link', { name: 'Get started now' })\n\n    at CRExecutionContext.evaluateWithArguments (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\chromium\\crExecutionContext.js:80:13)\n    at runNextTicks (node:internal/process/task_queues:65:5)\n    at process.processImmediate (node:internal/timers:459:9)\n    at async LongStandingScope._race (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\utils\\isomorphic\\manualPromise.js:94:14)\n    at async evaluateExpression (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\javascript.js:217:12)\n    at async Frame._expectInternal (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\frames.js:1225:57)\n    at async D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\frames.js:1182:18\n    at async ProgressController.run (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\progress.js:80:22)\n    at async Frame._expectImpl (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\frames.js:1181:31)\n    at async Frame.expect (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\frames.js:1165:20)",
			"name": "Error"
		}
	},
	"log": [
		"  - Expect \"to.be.visible\" with timeout 5000ms",
		"  - waiting for locator('a.t-btn.t-btn_md')"
	]
}
```

### page.locator(..).nth(..)

  await expect(page.locator('a.t-btn.t-btn_md').first()).toBeVisible();
  await expect(page.locator('a.t-btn.t-btn_md').nth(0)).toBeVisible();
  // err
  await expect(page.locator('a.t-btn.t-btn_md').nth(100)).toBeVisible();

* client request
```
{
	"id": 13,
	"guid": "frame@87983c0aee275a541bedc5b335a85269",
	"method": "expect",
	"params": {
		"selector": "a.t-btn.t-btn_md >> nth=0",
		"expression": "to.be.visible",
		"expectedValue": {
			"value": {
				"v": "undefined"
			},
			"handles": []
		},
		"isNot": false,
		"timeout": 5000
	},
	"metadata": {
		"location": {
			"file": "D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\hlm-all-locators2.js",
			"line": 43,
			"column": 58
		},
		"internal": false
	}
}
```
* server response err
```
{
	"id": 13,
	"result": {
		"matches": false,
		"received": {
			"s": "<element(s) not found>"
		},
		"timedOut": true,
		"log": [
			"  - Expect \"to.be.visible\" with timeout 5000ms",
			"  - waiting for locator('a.t-btn.t-btn_md').nth(100)"
		]
	}
}
```
* server response ok
```
{
	"id": 13,
	"result": {
		"matches": true,
		"received": {
			"s": "visible"
		}
	}
}
```
### page.locator(..).filter(..)

  await expect(page.locator('#nav816068316 a.t-btn.t-btn_md')
    .filter({ hasText: 'Get started' })).toBeVisible();

* client request
```
{
    "id": 6,
    "guid": "frame@c17bc1e227124e95b67b1a75fec5eb10",
    "method": "expect",
    "params": {
        "selector": "#nav816068316 a.t-btn.t-btn_md >> internal:has-text=\"Get started\"i",
        "expression": "to.be.visible",
        "expectedValue": {
            "value": {
                "v": "undefined"
            },
            "handles": []
        },
        "isNot": false,
        "timeout": 5000
    },
    "metadata": {
        "location": {
            "file": "D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\hlm-all-locators2.js",
            "line": 64,
            "column": 42
        },
        "internal": false
    }
}
```
* server response err 
```
{
	"id": 6,
	"result": {
		"matches": false,
		"received": {
			"s": "<element(s) not found>"
		},
		"timedOut": true,
		"log": [
			"  - Expect \"to.be.visible\" with timeout 5000ms",
			"  - waiting for locator('#nav816068316 a.t-btn.t-btn_mdX').filter({ hasText: 'Get started' })"
		]
	}
}
```
* server response ok
```
{
	"id": 6,
	"result": {
		"matches": true,
		"received": {
			"s": "visible"
		}
	}
}
```

### page.locator(..).getByText(..)

  await expect(page.locator('#rec639241715').getByText('Contacts')).toBeVisible();

* client request
```
{
	"id": 6,
	"guid": "frame@3d5ce58573a8f7d8fe60fb5935348aa2",
	"method": "expect",
	"params": {
		"selector": "#rec639241715 >> internal:text=\"Contacts\"i",
		"expression": "to.be.visible",
		"expectedValue": {
			"value": {
				"v": "undefined"
			},
			"handles": []
		},
		"isNot": false,
		"timeout": 5000
	},
	"metadata": {
		"location": {
			"file": "D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\hlm-all-locators3.js",
			"line": 22,
			"column": 69
		},
		"internal": false
	}
}
```
* server response err
```
{
	"id": 6,
	"result": {
		"matches": false,
		"received": {
			"s": "<element(s) not found>"
		},
		"timedOut": true,
		"log": [
			"  - Expect \"to.be.visible\" with timeout 5000ms",
			"  - waiting for locator('#rec639241715').getByText('ContactsXX')"
		]
	}
}
```
* server response ok
```
{
	"id": 6,
	"result": {
		"matches": true,
		"received": {
			"s": "visible"
		}
	}
}
```
###  page.frameLocator(..).locator(..)
  
  await expect(page.frameLocator('#youtube-iframe-639241701-1634159005179')
    .locator('button.ytp-large-play-button')).toBeVisible();

* client request
```
{
	"id": 6,
	"guid": "frame@0304f7ef32cc01becd2046d50369b59e",
	"method": "expect",
	"params": {
		"selector": "#youtube-iframe-639241701-1634159005179 >> internal:control=enter-frame >> button.ytp-large-play-button",
		"expression": "to.be.visible",
		"expectedValue": {
			"value": {
				"v": "undefined"
			},
			"handles": []
		},
		"isNot": false,
		"timeout": 5000
	},
	"metadata": {
		"location": {
			"file": "D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\hlm-all-locators1.js",
			"line": 52,
			"column": 47
		},
		"internal": false
	}
}
```
* server response err
```
{
	"id": 6,
	"result": {
		"matches": false,
		"received": {
			"s": "<element(s) not found>"
		},
		"timedOut": true,
		"log": [
			"  - Expect \"to.be.visible\" with timeout 5000ms",
			"  - waiting for locator('#youtube-iframe-639241701-1634159005179').contentFrame().locator('button.ytp-large-play-buttonX')"
		]
	}
}
```
* server response ok
```
{
	"id": 6,
	"result": {
		"matches": true,
		"received": {
			"s": "visible"
		}
	}
}
```
### page.locator(..).toHaveCount(..);

	await expect(page.locator('text=Get started')).toHaveCount(3);

* client request
```
{
	"id": 6,
	"guid": "frame@1df63f743a6c05852916f1f261dbcb30",
	"method": "expect",
	"params": {
		"selector": "text=Get started",
		"expression": "to.have.count",
		"expectedNumber": 3,
		"expectedValue": {
			"value": {
				"v": "undefined"
			},
			"handles": []
		},
		"isNot": false,
		"timeout": 5000
	},
	"metadata": {
		"location": {
			"file": "D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\hlm-all-locators1.js",
			"line": 71,
			"column": 50
		},
		"internal": false
	}
}
```	
* server response err
```
{
	"id": 6,
	"result": {
		"matches": false,
		"received": {
			"n": 0
		},
		"timedOut": true,
		"log": [
			"  - Expect \"to.have.count\" with timeout 5000ms",
			"  - waiting for locator('text=Get startedX')",
			"    8 × locator resolved to 0 elements",
			"      - unexpected value \"0\""
		]
	}
}
```
* server response ok
```
{
	"id": 6,
	"result": {
		"matches": true,
		"received": {
			"n": 3
		}
	}
}
```
### Error: strict mode violation: locator(

	await expect(page.locator('input[type="email"]')).toBeAttached();

* client request
```
{
	"id": 6,
	"guid": "frame@2a2937b5951e50b7dc8b2c6ab1bfbe93",
	"method": "expect",
	"params": {
		"selector": "input[type=\"email\"]",
		"expression": "to.be.attached",
		"expectedValue": {
			"value": {
				"v": "undefined"
			},
			"handles": []
		},
		"isNot": false,
		"timeout": 5000
	},
	"metadata": {
		"location": {
			"file": "D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\hlm-all-locators4.js",
			"line": 22,
			"column": 53
		},
		"internal": false
	}
}
```
* server response err
```
{
	"id": 6,
	"error": {
		"error": {
			"message": "Error: strict mode violation: locator('input[type=\"email\"]') resolved to 2 elements:\n    1) <input value=\"\" type=\"email\" name=\"Email\" data-tilda-req=\"1\" autocomplete=\"email\" aria-required=\"true\" placeholder=\"required\" data-tilda-rule=\"email\" id=\"input_1495810354468\" class=\"t-input js-tilda-rule\" aria-describedby=\"error_1495810354468\"/> aka getByLabel('Your Email')\n    2) <input value=\"\" type=\"email\" name=\"Email\" data-tilda-req=\"1\" autocomplete=\"email\" aria-required=\"true\" data-tilda-rule=\"email\" id=\"input_1493283059688\" class=\"t-input js-tilda-rule\" placeholder=\"mail@example.com\" aria-describedby=\"error_1493283059688\"/> aka getByRole('textbox', { name: 'mail@example.com' })\n",
			"stack": "Error: Error: strict mode violation: locator('input[type=\"email\"]') resolved to 2 elements:\n    1) <input value=\"\" type=\"email\" name=\"Email\" data-tilda-req=\"1\" autocomplete=\"email\" aria-required=\"true\" placeholder=\"required\" data-tilda-rule=\"email\" id=\"input_1495810354468\" class=\"t-input js-tilda-rule\" aria-describedby=\"error_1495810354468\"/> aka getByLabel('Your Email')\n    2) <input value=\"\" type=\"email\" name=\"Email\" data-tilda-req=\"1\" autocomplete=\"email\" aria-required=\"true\" data-tilda-rule=\"email\" id=\"input_1493283059688\" class=\"t-input js-tilda-rule\" placeholder=\"mail@example.com\" aria-describedby=\"error_1493283059688\"/> aka getByRole('textbox', { name: 'mail@example.com' })\n\n    at CRExecutionContext.evaluateWithArguments (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\chromium\\crExecutionContext.js:80:13)\n    at async LongStandingScope._race (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\utils\\isomorphic\\manualPromise.js:94:14)\n    at async evaluateExpression (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\javascript.js:217:12)\n    at async Frame._expectInternal (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\frames.js:1225:57)\n    at async D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\frames.js:1182:18\n    at async ProgressController.run (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\progress.js:80:22)\n    at async Frame._expectImpl (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\frames.js:1181:31)\n    at async Frame.expect (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\frames.js:1165:20)\n    at async FrameDispatcher.expect (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\dispatchers\\frameDispatcher.js:212:20)\n    at async LongStandingScope._race (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\utils\\isomorphic\\manualPromise.js:94:14)",
			"name": "Error"
		}
	},
	"log": [
		"  - Expect \"to.be.attached\" with timeout 5000ms",
		"  - waiting for locator('input[type=\"email\"]')"
	]
}
```

### focus error

  await page.locator('input[type="email"]#input_1493283059688_X').focus();

* client request
```
{
	"id": 15,
	"guid": "frame@b8e205b7cf90ea81b5b69bdd28c8f7fe",
	"method": "focus",
	"params": {
		"selector": "input[type=\"email\"]#input_1493283059688_X",
		"strict": true,
		"timeout": 30000
	},
	"metadata": {
		"location": {
			"file": "D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\hlm-all-locators4.js",
			"line": 59,
			"column": 67
		},
		"internal": false
	}
}
```
* server response err
```
{
	"id": 15,
	"error": {
		"error": {
			"message": "Timeout 30000ms exceeded.",
			"stack": "TimeoutError: Timeout 30000ms exceeded.\n    at ProgressController.run (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\progress.js:76:26)\n    at Frame.focus (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\frames.js:1012:22)\n    at FrameDispatcher.focus (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\dispatchers\\frameDispatcher.js:132:23)\n    at FrameDispatcher._handleCommand (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\dispatchers\\dispatcher.js:88:40)\n    at DispatcherConnection.dispatch (D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\node_modules\\playwright-core\\lib\\server\\dispatchers\\dispatcher.js:309:39)",
			"name": "TimeoutError"
		}
	},
	"log": [
		"  - waiting for locator('input[type=\"email\"]#input_1493283059688_X')"
	]
}
```

## page.$(selector)

const element = await page.$('a[role="button"]:has-text("Ask support")');

{
	"id": 6,
	"guid": "frame@e337be6a1610859e6ca33820f5084a4e",
	"method": "querySelector",
	"params": {
		"selector": "a[role=\"button\"]:has-text(\"Ask support\")"
	},
	"metadata": {
		"location": {
			"file": "D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\hlm-all-locators1-depr.js",
			"line": 78,
			"column": 32
		},
		"internal": false
	}
}

{
	"id": 6,
	"result": {}
}

{
	"id": 6,
	"result": {
		"element": {
			"guid": "handle@26c00260335615374bb78beff9e81f39"
		}
	}
}

## page.$$(selector)

const elements = await page.$$('a:has-text("Get startedX")');

{
    "id": 34,
    "guid": "frame@e584303fdad3ce3480c08a290a915afa",
    "method": "querySelectorAll",
    "params": {
        "selector": "a:has-text(\"Get started\")"
    },
    "metadata": {
        "location": {
            "file": "D:\\EPM-HLM\\tests\\playwright-based-tests\\javascript\\hlm-all-locators1-depr.js",
            "line": 83,
            "column": 31
        },
        "internal": false
    }
}

{
	"id": 34,
	"result": {
		"elements": []
	}
}

{
	"id": 34,
	"result": {
		"elements": [
			{
				"guid": "handle@070b35f82f650ab08f2d3d659d1cf19c"
			},
			{
				"guid": "handle@855ab58b8ef57c8371da6a5c26ee005e"
			}
		]
	}
}