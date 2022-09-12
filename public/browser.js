window.onload = () => {
    document.getElementById("search-form").addEventListener('submit', submitSearch);
}

function submitSearch(e) {
    e.preventDefault();
    const sinput = document.getElementById("search-input");
    const ciframe = document.getElementById("content-iframe");

    if (['.', '/'].some(value => sinput.value.includes(value))) {
        ciframe.src = `http://${sinput.value}`;
    } else {
        ciframe.src = `https://www.google.com/search?igu=1&ei=&q=${encodeURIComponent(sinput.value)}`;
    }

    sinput.value = '';
}

function iframeLoad(e) {
    console.log("Page loaded");

    try {
        document.getElementById('content-iframe').contentDocument;
    }
    catch (err) {
        console.log(err);
    }

}