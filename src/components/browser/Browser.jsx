import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import './browser.scss';

function formatURI(uri) {
    if (['.', '/'].some(value => uri.includes(value))) {
        return `http://${uri}`;
    } else {
        return `https://www.google.com/search?igu=1&ei=&q=${encodeURIComponent(uri)}`;
    }
}

export function Content({ ...props }) {
    console.log(props.url);
    return (
        <>
            <iframe
                id="content-iframe"
                src={formatURI(props.url)}></iframe>
        </>
    );
}

export function LeftBar({ ...props }) {
    let url = '';
    return (
        <div class="left-ui">
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
                        props.searchHook(url);
                        url = ''
                    }
                }}
            />
        </div>
    );
}

export function Browser({ ...props }) {
    const [url, setUrl] = useState('www.google.com/webhp?igu=1&safe=active&ssui=on');
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