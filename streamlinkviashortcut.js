browser.runtime.onMessage.addListener((command, sender, sendResponse) => {
   if (command === "gethoveredurl") {
    let someHover = document.querySelector("a:hover");
    if (someHover !== undefined) {
      let url = someHover.href;
      sendResponse(url);
    }
  }
})
