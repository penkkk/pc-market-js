import { initCatalog } from './catalog.js';

const modalFunc = (modal, openBtn, closeBtn) => {
    openBtn.addEventListener('click', () => { modal.showModal() });

    closeBtn.addEventListener('click', () => { modal.close() });
}


const modal = document.getElementById("callback-modal");
const openBtn = document.getElementById('open-modal-btn');
const closeBtn = document.getElementById('close-modal-btn');


if (modal && openBtn && closeBtn) {
    modalFunc(modal, openBtn, closeBtn);
}

initCatalog();
