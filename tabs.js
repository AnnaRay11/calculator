"use strict"

function tabs(){
    function bindTabs(tabClass, tabContent, activeTab, startTab, startContent) {
        const tab = document.querySelectorAll(tabClass);
        const content = document.querySelectorAll(tabContent);
        const startT = document.querySelector(startTab);
        const startC = document.querySelector(startContent);

        // saving the original font color
        tab.forEach(el => {
            el.dataset.originalColor = getComputedStyle(el).color;
            el.style.fontWeight = "bolder";
        });
    
        tab.forEach(item => item.addEventListener('click', () => {
            if(item.classList.contains(activeTab)) {
                return;
            };

            tab.forEach(el => {
                el.classList.remove(activeTab)
            });

            item.classList.add(activeTab);

            content.forEach(el => {
              el.style.display = 'none';
            });

            const activeContent = document.querySelector('#' + item.dataset.tab);
            activeContent.style.display = activeContent.id === 'tab-1' ? 'flex' : 'block';

            tab.forEach(el => el.style.color = el.dataset.originalColor); //back to original color when not active
            item.style.color = '#f3701e'; //changing font color when active
            
        }))

        startT.classList.add(activeTab);
        startT.style.color = '#f3701e';
        startC.classList.add(activeTab);


    }

    bindTabs('.tab', '.content', 'active', '[data-tab="tab-1"]', '#tab-1')
}



