import { TrOptions } from '../models/global';

const LOADING_ICON_CLASS = 'core--loading-icon';

export function registerSidenav() {
    const sidenav = document.getElementById('nav--sidenav');
    const sidenavToggleButton = document.getElementById('nav--toggle');
    sidenavToggleButton.onclick = () => {
        console.log(sidenav.style.width);
        if (sidenav.style.width === '0px') {
            sidenav.style.width = '200px';
            sidenavToggleButton.classList.replace('fa-bars', 'fa-times')
        } else {
            sidenav.style.width = '0px';
            sidenavToggleButton.classList.replace('fa-times', 'fa-bars')
        }
    };
}

export function getLoadingIcon(pageCentered: boolean = false) {
    const loadingIconContainer = document.createElement('div')
    loadingIconContainer.classList.add(LOADING_ICON_CLASS);
    
    const loadingIcon = document.createElement('img');
    loadingIcon.src = './images/loading.gif';
    if (pageCentered) { loadingIcon.classList.add('core--page-centered') }
    
    loadingIconContainer.appendChild(loadingIcon);
    return loadingIconContainer;
}

export function removeLoadingIcon() {
    const loadingIcons = document.getElementsByClassName(LOADING_ICON_CLASS);
    for (let i = 0; i < loadingIcons.length; i++) {
        loadingIcons[i].remove();
    }
}

export function createTr(data: any[], options: TrOptions = {}): HTMLTableRowElement {
    options.type = options.type || 'td';
    options.highlight = (typeof options.highlight === 'undefined') ? true : options.highlight;

    const tr = document.createElement('tr');
    for (let i = 0; i < data.length; i++) {
        const td = document.createElement(options.type);
        if (options.colspan) { td.colSpan = options.colspan; }
        td.innerHTML = data[i];
        tr.appendChild(td);
    }

    if (options.highlight && tr.children.length > 1) {
        const highlightIndexOne = options.invertHighlight ? 2 : 0;
        const highlightIndexTwo = options.invertHighlight ? 0 : 2;

        if (parseFloat(tr.children[0].innerHTML) === parseFloat(tr.children[2].innerHTML)) {
            (<HTMLElement> tr.children[0]).style.color = 'royalblue';
            (<HTMLElement> tr.children[2]).style.color = 'royalblue';
        } else if (parseFloat(tr.children[0].innerHTML) > parseFloat(tr.children[2].innerHTML)) {
            (<HTMLElement> tr.children[highlightIndexOne]).style.color = 'green';
            (<HTMLElement> tr.children[highlightIndexTwo]).style.color = 'orangered';
        } else {
            (<HTMLElement> tr.children[highlightIndexTwo]).style.color = 'green';
            (<HTMLElement> tr.children[highlightIndexOne]).style.color = 'orangered';
        }
    }

    return tr;
}