import createEl from '../utilities/createEl.js';

export default function createModal(content, confirmButton) {
    const modalOverlay = createEl({
        className: 'modal-overlay',
    });

    const modalContainer = createEl({
        className: 'modal-container',
    });

    const modalContent = createEl({
        className: 'modal-content',
    });

    const buttonsContainer = createEl({
        className: 'flex-sb',
    });

    const cancelButton = createEl({
        tag: 'button',
        className: 'btn',
    }, ['Закрыть']);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            removeModalOverlay(modalOverlay);
        }
    });

    cancelButton.addEventListener('click', () => {
        removeModalOverlay(modalOverlay);
    });

    modalContainer.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    modalOverlay.addEventListener('click', () => {
        removeModalOverlay(modalOverlay);
    });

    buttonsContainer.append(cancelButton);
    if (confirmButton) {
        buttonsContainer.append(confirmButton);
    }
    modalContent.append(content, buttonsContainer);
    modalContainer.append(modalContent);
    modalOverlay.append(modalContainer);
    document.body.style.overflow = 'hidden';

    document.body.append(modalOverlay);
}

function removeModalOverlay(el) {
    if (document.body.contains(el)) {
        document.body.removeChild(el);
        document.body.style.overflow = 'auto';
    }
}