(() => {
    chrome.runtime.onInstalled.addListener(details => {
        if (details.reason !== 'install') {
            browser.storage.sync.set({ volume: 1 });
        }
        // browser.declarativeContent.onPageChanged.removeRules(undefined, () => {
        //     browser.declarativeContent.onPageChanged.addRules([
        //         {
        //             conditions: [
        //                 new browser.declarativeContent.PageStateMatcher({
        //                     pageUrl: { hostEquals: 'meet.google.com' }
        //                 })
        //             ],
        //             actions: [new browser.declarativeContent.ShowPageAction()]
        //         }
        //     ]);
        // });
    });
})();
