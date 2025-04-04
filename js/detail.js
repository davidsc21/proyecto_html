const loadPolyfill = () => {
    return new Promise((resolve) => {
      if (typeof HTMLDialogElement === 'function') {
        resolve(null);
      } else {
        const script = document.createElement('script');
        script.src = 'https://cdn.skypack.dev/dialog-polyfill@0.5.6';
        script.onload = () => resolve(window.dialogPolyfill);
        document.body.appendChild(script);
      }
    });
  };
  
  // Función principal que se ejecuta cuando el DOM está listo
  const initDialog = async () => {
    const dialog = document.querySelector('dialog');
    const openDialogBtn = document.getElementById('open_dialog');
    const closeDialogBtn = document.getElementById('close_dialog');
    
    // Verificamos si necesitamos el polyfill
    const dialogPolyfill = await loadPolyfill();
  
    // Si necesitamos el polyfill, lo registramos
    if (dialogPolyfill && typeof dialog.showModal !== 'function') {
      dialogPolyfill.registerDialog(dialog);
    }
  
    // Elementos enfocables dentro del diálogo
    const getFocusableElements = () => {
      return dialog.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      );
    };
  
    // Manejo del foco para accesibilidad
    const trapFocus = (e) => {
      if (e.key === 'Tab') {
        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;
  
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
  
        if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        } else if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      }
    };
  
    // Abrir diálogo
    const openDialog = () => {
      dialog.showModal();
      dialog.addEventListener('keydown', trapFocus);
      
      // Enfocar el primer elemento interactivo
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    };
  
    // Cerrar diálogo
    const closeDialog = (e) => {
      e.preventDefault();
      dialog.close();
      dialog.removeEventListener('keydown', trapFocus);
      openDialogBtn.focus();
    };
  
    // Event listeners
    openDialogBtn.addEventListener('click', openDialog);
    closeDialogBtn.addEventListener('click', closeDialog);
  
    // Cerrar al hacer clic fuera del diálogo
    dialog.addEventListener('click', (e) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close();
      }
    });
  };
  
  // Inicializamos cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', initDialog);