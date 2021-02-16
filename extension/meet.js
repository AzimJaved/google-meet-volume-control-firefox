(() => {
    let volume = 1;

    const setAllVolume = (volume) => {
        const adjustedVolume = volume ** 2.5;
        document
            .querySelectorAll('audio, video')
            .forEach(el => (el.volume = adjustedVolume ?? 1));
    };

    chrome.storage.sync.get(['volume'], res => void (volume = res.volume ?? 1));

    chrome.storage.onChanged.addListener(changes => {
        if (changes['volume']) volume = changes['volume'].newValue;

        setAllVolume(volume);
    });

    setInterval(() => {
        setAllVolume(volume);
    }, 100);
})();
