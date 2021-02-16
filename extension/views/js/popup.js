let volume = 1;

// Throttle function from StackOverflow (https://stackoverflow.com/questions/27078285/simple-throttle-in-js)
const throttle = (fn, threshold = 100, scope) => {
    let last, deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date(),
            args = arguments;
        if (last && now < last + threshold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(() => {
                last = now;
                fn.apply(context, args);
            }, threshold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
};

const setNewVolume = (newVolume) => {
    if (newVolume < 0) newVolume = 0;
    if (newVolume > 1) newVolume = 1;

    volume = newVolume;

    document.querySelector(
        '#volume-display'
    ).textContent = String(Math.round(newVolume * 100));
    saveVolume();
};

const saveVolume = throttle(() => {
    chrome.storage.sync.set({ volume });
}, 200);

document
    .querySelector('#volume')
    .addEventListener('input', (event) => {
        const newVolume = Number((event.target).value);

        setNewVolume(newVolume);
    });

chrome.storage.sync.get(['volume'], res => {
    console.log('Setting volume to first ', res.volume);
    setNewVolume(res.volume ?? 1);
    document.querySelector('#volume').value = res.volume ?? 1;
});
