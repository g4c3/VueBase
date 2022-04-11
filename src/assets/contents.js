// browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
//     browser.tabs.sendMessage(tabs[0].id, {
//       msg: { action: "change_body_color", value: 'hey' }
//     });
// });


// chrome.runtime.onMessage.addListener(function(rq, sender, sendResponse) {
//     console.log("background loaded")
//     setTimeout(function() {
//         sendResponse({status: true});
//     }, 1);
//     return true;  // Return true to fix the error
// });