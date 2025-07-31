export async function getNodePath(page, locator) {
  // Handle both string selectors and Locator objects
  const elementHandle = typeof locator === 'string' 
    ? await page.$(locator)
    : await locator.elementHandle();

  if (!elementHandle) {
    return JSON.stringify({
      items: null,
      url: page.url()
    });
  }

  const result = await page.evaluate((element) => {
    const items = [];
    let currentElement = element;

    while (currentElement && currentElement !== document) {
      let child = currentElement;
      let index = 0;
      while (child = child.previousElementSibling) index++;

      const node = {
        tag: currentElement.tagName?.toLowerCase() || null,
        id: currentElement.id || null,
        index: index,
        classes: [],
        other: {},
        innerText: currentElement.innerText || ""
      };

      if (currentElement.hasAttribute("class")) {
        node.classes = currentElement.className.split(/\s+/).filter(Boolean);
      }

      Array.from(currentElement.attributes).forEach(attr => {
        if (!['id', 'class'].includes(attr.name)) {
          node.other[attr.name] = attr.value;
        }
      });

      items.unshift(node);
      currentElement = currentElement.parentNode;
    }

    let nodePath =  {
      items: items,
      url: window.location.href
    };

    return JSON.stringify(nodePath);
  }, elementHandle);

  await elementHandle.dispose();
  return result;
}