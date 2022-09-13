import { h, Fragment } from 'preact';
import { useState, useRef } from 'preact/hooks';
import './browser.scss';

const HOME = 'https://www.google.com/webhp?igu=1&safe=active&ssui=on';
const SEARCH = 'https://www.google.com/search?igu=1&ei=&q=';

let leftMenu = true;
let tab = 'tab-0';

import { Projects } from '../../data/WebProjects.json';

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

    const selectTab = (selected) => {
        document.getElementById(tab)?.classList.remove('selected');
        tab = selected
        document.getElementById(tab)?.classList.add('selected');
    }

    let tabComponents = [];
    for (let i = 0; i < Projects.length; i++) {
        tabComponents.push(
            <Tab
                id={`tab-${i}`}
                title={Projects[i].title}
                href={Projects[i].href}
                callback={props.searchHook}
                select={selectTab}
            />
        )
    }

    return (
        <>
            <div class="tab-list">
                {
                    tabComponents
                }
            </div>
            <div id="left-ui" class="expand">
                <div>
                    <div class="left-controls">
                        <div>
                            <a href="#" title="Click to go back" onClick={(e) => {
                                e.preventDefault();
                                history.back();
                            }}>
                                <i class="fa-solid fa-arrow-left small"></i>
                            </a>
                            <a href="#" title="Click to go forward" onClick={(e) => {
                                e.preventDefault();
                                history.forward();
                            }}>
                                <i class="fa-solid fa-arrow-right small"></i>
                            </a>
                            <a id="lm-reload" title="Reload this page" href="#" onClick={(e) => {
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

                    <a href="#" title="Home" onClick={(e) => {
                        e.preventDefault();
                        props.searchHook(HOME);
                        document.getElementById(tab)?.classList.remove('selected');
                        tab = 'tab-a'
                    }}>
                        <i class="fa-solid fa-house-user small"></i>
                    </a>
                    <a href="$" target="_blank" title="Open in new tab" onClick={(e) => {
                        e.preventDefault();
                        const href = document.getElementById('content-iframe').src;

                        window.open(href, '_blank');
                    }}>
                        <i class="fa-solid fa-arrow-up-from-bracket small"></i>
                    </a>
                </div>

            </div>
        </>
    );
}

export function Tab({ ...props }) {
    return (
        <>
            <div id={props.id} class="tab">
                <button onClick={(e) => {
                    e.preventDefault();
                    props.callback(formatURI(props.href));
                    props.select(props.id);
                }}>
                    <p>{props.title}</p>
                </button>
            </div>
        </>
    );
}

export function Browser({ ...props }) {
    const [url, setUrl] = useState(HOME);

    const newUrl = (url) => {
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