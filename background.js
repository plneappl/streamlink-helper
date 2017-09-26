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

nativeName = "streamlink_firefox_helper";
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
    //console.log(port);
    s = browser.runtime.sendNativeMessage(nativeName, url);
    //port.postMessage(info.linkUrl);
    s.then(onResponse, onError);
  } 
});
