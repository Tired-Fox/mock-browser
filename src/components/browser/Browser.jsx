import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import './browser.scss';

const HOME = 'https://www.google.com/webhp?igu=1&safe=active&ssui=on';
const SEARCH = 'https://www.google.com/search?igu=1&ei=&q=';

let leftMenu = true;

function formatURI(uri) {
    const urlRegex = new RegExp('(http:|https:)+[^\s]+');
    if (urlRegex.test(uri)) {
        return encodeURI(uri);
    } else if (['.', '/', 'www'].some(value => uri.includes(value))) {
        return `http://${uri}`;
    } else {
        return `${SEARCH}${encodeURIComponent(uri)}`;
    }
}

export function Content({ ...props }) {
    console.log(props.url);
    return (
        <>
            <div id="content">
                <iframe
                    id="content-iframe"
                    src={props.url}>
                </iframe>

            </div>

        </>
    );
}

export function LeftBar({ ...props }) {
    let url = '';

    return (
        <div id="left-ui" class="expand">
            <div class="left-controls">
                <div>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        history.back();
                    }}>
                        <i class="fa-solid fa-arrow-left small"></i>
                    </a>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        history.forward();
                    }}>
                        <i class="fa-solid fa-arrow-right small"></i>
                    </a>
                    <a id="lm-reload" href="#" onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('content-iframe').src += '';
                    }}>
                        <i class="fa-solid fa-rotate-right small"></i>
                    </a>
                </div>
            </div>
            <input
                id="search-bar"
                class="small"
                type="text"
                placeholder="Search"
                name="search"
                value={url}
                onChange={(e) => {
                    url = e.target.value;
                    if (url) {
                        props.searchHook(formatURI(url));
                        url = ''
                    }
                }}
            />
        </div>
    );
}

export function Browser({ ...props }) {
    const [url, setUrl] = useState(HOME);

    const newUrl = (url) => {
        console.log(url);
        setUrl(url);
    }

    return (
        <>
            <div class="blur-background">
                <div class="ui-container">
                    <div class="modern-ui">
                        <LeftBar searchHook={newUrl} />
                        <Content url={url} />
                    </div>
                </div>
            </div>
        </>
    );
}