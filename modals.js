document.addEventListener('DOMContentLoaded', () => {

    const bgAnimClass = "show-modal";
    const modalAnimClass = "inDown";
    const modalContentSelector = ".modal-content";
    const modalOpenedClass = "modal-opened";
    let visibleModal = null;

    const toggleModal = (modal) => {
        if (!modal) return;
        modal && (modal.open ? closeModal(modal) : openModal(modal));
    };

    const openModal = (modal) => {
        visibleModal = modal;
        let modalContent = modal.querySelector(modalContentSelector);
        modal.classList.add(bgAnimClass);
        document.documentElement.classList.add(modalOpenedClass);
        modalContent.classList.add(modalAnimClass);
        modal.showModal();
    };

    const closeModal = (modal) => {
        visibleModal = null;
        let modalContent = modal.querySelector(modalContentSelector);
        modal.classList.remove(bgAnimClass);
        modalContent.classList.remove(modalAnimClass);
        document.documentElement.classList.remove(modalOpenedClass);
        modal.close();
    };

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && visibleModal) {
            closeModal(visibleModal);
        }
    });

    document.querySelectorAll(".modal-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            let modal = document.querySelector(btn.getAttribute("data-target"));
            toggleModal(modal);
        });
    });

    document.addEventListener("click", (e) => {
        if (visibleModal === null) return;
        const modalContent = visibleModal.querySelector(modalContentSelector);
        const isClickInside = modalContent.contains(e.target);
        const isClickOnClose = e.target.classList.contains('modal-close');
        if (!isClickInside || isClickOnClose) {
            closeModal(visibleModal);
        }
    });

});
