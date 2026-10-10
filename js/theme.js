/**
 * Controle de Tema (Dark Mode / Light Mode)
 * Léa Nascimento - Regularização Imobiliária
 */

(function () {
  const THEME_KEY = 'lea_nascimento_theme';
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const htmlBody = document.body;

  // Obter tema salvo ou preferência do sistema
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    // Padrão do site é Dark (inspirado na sofisticação do azul #081734 e ouro)
    return 'dark';
  }

  // Aplicar tema
  function applyTheme(theme) {
    htmlBody.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    themeToggleBtns.forEach((btn) => {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro');
    });
  }

  // Inicialização
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  // Event Listeners nos botões de alternância
  themeToggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Adicionar classe de transição suave de 3 segundos
      htmlBody.classList.add('theme-transitioning');
      
      const active = htmlBody.getAttribute('data-theme') || 'dark';
      const nextTheme = active === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);

      // Remover a classe após a transição terminar
      setTimeout(() => {
        htmlBody.classList.remove('theme-transitioning');
      }, 1000);
    });
  });
})();
