/**
 * Controle de Acordeão Retrátil (Seção 3 - Serviços)
 * Léa Nascimento - Regularização Imobiliária
 */

document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item, index) => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    // Abre o primeiro item por padrão para guiar a leitura do visitante
    if (index === 0) {
      item.classList.add('active');
      content.style.maxHeight = content.scrollHeight + 'px';
    }

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros acordeões para manter o layout limpo e moderno
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.accordion-content');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Alterna o item atual
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Reajuste de max-height em caso de resize da janela
  window.addEventListener('resize', () => {
    const activeItem = document.querySelector('.accordion-item.active');
    if (activeItem) {
      const activeContent = activeItem.querySelector('.accordion-content');
      if (activeContent) {
        activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
      }
    }
  });
});
