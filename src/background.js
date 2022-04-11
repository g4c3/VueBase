// browser.browserAction.onClicked.addListener(function (tab) {
//   console.log('Hello from the background')
//   alert('dfsd')
//   browser.tabs.executeScript({
//     file: 'content-script.js',
//   });
// })

// browser.runtime.onMessage.addListener(function(rq, sender, sendResponse) {
//   // alert("script")
//   setTimeout(function() {
//       sendResponse({status: true});
//   }, 1);
//   return true;  // Return true to fix the error
//   // browser.tabs.executeScript({
//   //   file: 'content-script.js',
//   // });
// });

// chrome.runtime.onMessage.addListener(function(rq, sender, sendResponse) {
//   alert("sdafa")
//   console.log("sdafa")
//   setTimeout(function() {
//       sendResponse({status: true});
//   }, 1);
//   return true;  // Return true to fix the error
// });
chrome.tabs.query({ active: true }, (tabs) => {
  const tab = tabs[0];
  browser.tabs.update(tab.id, {
    url: 'https://stackoverflow.com/questions/68945425/update-and-run-pre-defined-link-on-current-tab-chrome-extension',
  });
});


// chrome.browserAction.onClicked.addListener(() => {
//   chrome.
//   chrome.tabs.query({ active: true }, (tabs) => {
//       const tab = tabs[0];
//       chrome.tabs.update(tab.id, {
//           url: 'https://stackoverflow.com/questions/68945425/update-and-run-pre-defined-link-on-current-tab-chrome-extension',
//       });
//   });
// });