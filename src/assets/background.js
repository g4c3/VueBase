// chrome.browserAction.onClicked.addListener(() => {
//     console.log("background loaded")
//     alert("background loaded")
//     chrome.tabs.query({ active: true }, (tabs) => {
//         const tab = tabs[0];
//         chrome.tabs.update(tab.id, {
//             url: 'https://stackoverflow.com/questions/68945425/update-and-run-pre-defined-link-on-current-tab-chrome-extension',
//         });
//     });
// });