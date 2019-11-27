"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LOADING_ICON_CLASS = 'core--loading-icon';
function registerSidenav() {
    const sidenav = document.getElementById('nav--sidenav');
    const sidenavToggleButton = document.getElementById('nav--toggle');
    sidenav.appendChild(sideNavLink('index.html', 'Home'));
    sidenav.appendChild(sideNavLink('condensed.html', 'Condensed Games'));
    sidenav.appendChild(sideNavLink('scores.html', 'Scores'));
    sidenav.appendChild(sideNavLink('standings.html', 'Standings'));
    sidenavToggleButton.onclick = () => {
        console.log(sidenav.style.width);
        if (sidenav.style.width === '0px') {
            sidenav.style.width = '200px';
            sidenavToggleButton.classList.replace('fa-bars', 'fa-times');
        }
        else {
            sidenav.style.width = '0px';
            sidenavToggleButton.classList.replace('fa-times', 'fa-bars');
        }
    };
}
exports.registerSidenav = registerSidenav;
function sideNavLink(href, display) {
    const a = document.createElement('a');
    a.href = href;
    a.innerHTML = display;
    return a;
}
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
exports.getLoadingIcon = getLoadingIcon;
function removeLoadingIcon() {
    const loadingIcons = document.getElementsByClassName(LOADING_ICON_CLASS);
    for (let i = 0; i < loadingIcons.length; i++) {
        loadingIcons[i].remove();
    }
}
exports.removeLoadingIcon = removeLoadingIcon;
function createTr(data, options = {}) {
    options.type = options.type || 'td';
    options.classes = options.classes || [];
    const tr = document.createElement('tr');
    tr.classList.add(...options.classes);
    for (let i = 0; i < data.length; i++) {
        const td = document.createElement(options.type);
        if (options.colspan) {
            td.colSpan = options.colspan;
        }
        td.innerHTML = data[i];
        tr.appendChild(td);
    }
    if (options.highlight && tr.children.length > 1) {
        const highlightIndexOne = options.invertHighlight ? 2 : 0;
        const highlightIndexTwo = options.invertHighlight ? 0 : 2;
        if (parseFloat(tr.children[0].innerHTML) === parseFloat(tr.children[2].innerHTML)) {
            tr.children[0].style.color = 'royalblue';
            tr.children[2].style.color = 'royalblue';
        }
        else if (parseFloat(tr.children[0].innerHTML) > parseFloat(tr.children[2].innerHTML)) {
            tr.children[highlightIndexOne].style.color = 'green';
            tr.children[highlightIndexTwo].style.color = 'orangered';
        }
        else {
            tr.children[highlightIndexTwo].style.color = 'green';
            tr.children[highlightIndexOne].style.color = 'orangered';
        }
    }
    return tr;
}
exports.createTr = createTr;
