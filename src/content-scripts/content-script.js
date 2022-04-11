console.log('Hello from the content-script')
//   setTimeout(function() {
//       sendResponse({status: true});
//   }, 1);
//   return true;  // Return true to fix the error



// browser.extension.sendRequest({
//     title: 'giveSomeTitle', params: paramsToSend
//   }, function(result) { 
//     // Do Some action
// });

// const messageToShow =
//   "IyMjIyMjICAjIyMjIyMjIyAjIyMjIyMjIyAgIyMjIyMjIyMgICAgIyMjICAgICMjICAgICAjIyAjIyMjIyMjIyAjIyMjIyMjIyAgICAgIAojIyAgICAjIyAgICAjIyAgICAjIyAgICAgIyMgIyMgICAgICAgICAjIyAjIyAgICMjICAgICAjIyAjIyAgICAgICAjIyAgICAgIyMgICAgIAojIyAgICAgICAgICAjIyAgICAjIyAgICAgIyMgIyMgICAgICAgICMjICAgIyMgICMjICAgICAjIyAjIyAgICAgICAjIyAgICAgIyMgICAgIAogIyMjIyMjICAgICAjIyAgICAjIyMjIyMjIyAgIyMjIyMjICAgIyMgICAgICMjICMjICAgICAjIyAjIyMjIyMgICAjIyMjIyMjIyAgICAgIAogICAgICAjIyAgICAjIyAgICAjIyAgICMjICAgIyMgICAgICAgIyMjIyMjIyMjICAjIyAgICMjICAjIyAgICAgICAjIyAgICMjICAgICAgIAojIyAgICAjIyAgICAjIyAgICAjIyAgICAjIyAgIyMgICAgICAgIyMgICAgICMjICAgIyMgIyMgICAjIyAgICAgICAjIyAgICAjIyAgIyMjIAogIyMjIyMjICAgICAjIyAgICAjIyAgICAgIyMgIyMjIyMjIyMgIyMgICAgICMjICAgICMjIyAgICAjIyMjIyMjIyAjIyAgICAgIyMgIyMj";

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   // Once we receive a message from the popup
//   if (request.msg) {
//     // If message has the `action` key `print_in_console`
//     if (request.msg.action === "print_in_console") {
//       // print awesome text on console
//       console.log(`%c ${atob(messageToShow)}`, "color:#38B549;");
//     } else if (request.msg.action === "change_body_color") {
//       // message contains different `action` key. This time it's a `change_body_color`.
//       document.body.style.background = request.msg.value;
//     }
//   }
// });