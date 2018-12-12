"use strict";
const LOADING_ICON_CLASS = 'core--loading-icon';
function getLoadingIcon(pageCentered = false) {
    const loadingIconContainer = document.createElement('div');
    loadingIconContainer.classList.add(LOADING_ICON_CLASS);
    const loadingIcon = document.createElement('img');
    loadingIcon.src = './images/loading.gif';
    if (pageCentered) {
        loadingIcon.classList.add('core--page-centered');
    }
    loadingIconContainer.appendChild(loadingIcon);
    return loadingIconContainer;
}
function removeLoadingIcon() {
    const loadingIcons = document.getElementsByClassName(LOADING_ICON_CLASS);
    for (let i = 0; i < loadingIcons.length; i++) {
        loadingIcons[i].remove();
    }
}
//# sourceMappingURL=core.js.map