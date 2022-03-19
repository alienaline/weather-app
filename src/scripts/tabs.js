import VAR from './view.js';

let tabs = VAR.TABS;
let windows = VAR.WINDOWS;

tabs.forEach(elem => {
    elem.addEventListener('click', () => {
        let currentTab = elem;
        let tabId = currentTab.getAttribute('data-tab');
        let currentWindow = document.querySelector(tabId);

        tabs.forEach(elem => {
            elem.classList.remove('active-tab');
        })

        windows.forEach(elem => {
            elem.classList.remove('active-window');
        })

        currentTab.classList.add('active-tab');
        currentWindow.classList.add('active-window');
    })
})




/* 
function changeTab(event) {
    let target = event.target;
    if (!target.classList.contains('active-tab')) {
        let activeTab = document.querySelector('.active-tab');
        activeTab.classList.remove('active-tab');
        target.classList.add('active-tab');
    } else {
        return false;
    }
}

for (let tab of VAR.TABS) {
    tab.addEventListener('click', changeTab);
}

*/
