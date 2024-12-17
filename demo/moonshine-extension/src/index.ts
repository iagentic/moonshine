import { MoonshineSettings } from "@usefulsensors/moonshine";

if (typeof chrome !== "undefined") {
    if (typeof browser !== "undefined") {
        // firefox
        MoonshineSettings.BASE_ASSET_PATH = browser.runtime.getURL("/");
    } else {
        // chrome
        MoonshineSettings.BASE_ASSET_PATH = chrome.runtime.getURL("/");
    }
}

import { MoonshineElementManager } from "@usefulsensors/moonshine";

var inputAreaSelectors: Array<string> | undefined = undefined;
var styleSheet: string | undefined = undefined;
var postInjectionFunction: Function | undefined = undefined;

switch (window.location.host) {
    case "chatgpt.com":
        inputAreaSelectors = ["#prompt-textarea"];
        styleSheet = `
        .moonshine-container {
            position: inherit !important;
            display: inherit !important;
        }
        .moonshine-button {
            top: 8px !important;
            right: 11px !important;
        }
        @media (prefers-color-scheme: dark) {
            .moonshine-button span svg path {
                fill: white;
            }
        }
        @media (prefers-color-scheme: light) {
            .moonshine-button span svg path {
                fill: black;
            }
        }
        `;
        postInjectionFunction = (controlElement, targetInputElement) => {};
}

var elementManager = new MoonshineElementManager(
    "/model/tiny/",
    inputAreaSelectors,
    styleSheet,
    postInjectionFunction
);
setInterval(() => {
    // re-autoinject every second, since some elements may not exist on page load (e.g., in react-based sites)
    elementManager.autoInjectElements();
    elementManager.initControlElements();
}, 1000);
