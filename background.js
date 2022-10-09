/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
  console.log("Item removed successfully");
}

function onResponse(r) {
  console.log("Response: " + r);
}
/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}

function onDisconnect(p){
  p0 = p;
}

/*
Create all the context menu items.
*/
browser.menus.create({
  id: "streamlink-link",
  title: browser.i18n.getMessage("menuItemLinkStreamlink"),
  contexts: ["link"]
}, onCreated);

browser.menus.create({
  id: "streamlink-page",
  title: browser.i18n.getMessage("menuItemPageStreamlink"),
  contexts: ["page"]
}, onCreated);

nativeName = "streamlink_helper";
//var port = browser.runtime.connectNative(nativeName);

//port.onMessage.addListener(onResponse);
//port.onDisconnect.addListener(onDisconnect);
/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "streamlink-link":
      url = info.linkUrl;

      break;
    case "streamlink-page":
      url = info.pageUrl;
      break;
  }
  if(url !== undefined && url !== null){
    console.log(url);
    browser.runtime.sendNativeMessage(nativeName, url)
      .then(onResponse, onError);
  }
});

browser.commands.onCommand.addListener((command) => {
  if (command === "launch-streamlink") {
    browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT})
      .then(tabs => browser.tabs.sendMessage(tabs[0].id, "gethoveredurl"))
      .then(url => {
        if (url !== undefined) {
          return browser.runtime.sendNativeMessage(nativeName, url);
        } else {
          return Promise.reject("no response!");
        }
      })
      .then(onResponse, onError);
  }
})

// Let other extensions invoke this extension.
browser.runtime.onMessageExternal.addListener((url, sender) => {
  // Ensure we got a valid URL
  if(url && (typeof url ==='string' || url instanceof String)) {
    try {
      new URL(url);
    }
    catch(e) {
      return Promise.reject(e);
    }
    return browser.runtime.sendNativeMessage(nativeName, url)
      .then(onResponse, onError);
  }
  else {  
    message = 'Error in argument url:\n';
    if(url) {
      message += url.toString();
    }
    else {
      message += 'url was null';
    }
    return Promise.reject(message);
  }
});
