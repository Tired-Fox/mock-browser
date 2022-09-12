import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import './browser.scss';

const HOME = 'https://www.google.com/webhp?igu=1&safe=active&ssui=on';
const SEARCH = 'https://www.google.com/search?igu=1&ei=&q=';

let leftMenu = true;

function formatURI(uri) {
    if (['.', '/'].some(value => uri.includes(value))) {
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
                <a href="#" id="content-open-leftMenu"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('left-ui').classList.remove('d-none');
                        document.getElementById('content-open-leftMenu').classList.add('d-none');
                        leftMenu = true;
                    }}>
                    <i class="fa-regular fa-square-caret-right normal"></i>
                </a>
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
        <div id="left-ui">
            <div class="left-controls">
                <div>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        history.back();
                    }}>
                        <p>&lt;</p>
                    </a>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        history.forward();
                    }}>
                        <p>&gt;</p>
                    </a>
                </div>
                <button onClick={(e) => {
                    document.getElementById('left-ui').classList.add('d-none');
                    document.getElementById('content-open-leftMenu').classList.remove('d-none');
                }}>
                    <i class="fa-regular fa-square-caret-left normal"></i>
                </button>
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