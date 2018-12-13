import { TrOptions } from '../models/global';

const LOADING_ICON_CLASS = 'core--loading-icon';

export function registerSidenav() {
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
            sidenavToggleButton.classList.replace('fa-bars', 'fa-times')
        } else {
            sidenav.style.width = '0px';
            sidenavToggleButton.classList.replace('fa-times', 'fa-bars')
        }
    };
}

function sideNavLink(href: string, display: string): HTMLAnchorElement {
    const a = document.createElement('a');
    a.href = href;
    a.innerHTML = display;
    return a;
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
    options.classes = options.classes || [];

    const tr = document.createElement('tr');
    tr.classList.add(...options.classes);
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