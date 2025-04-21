// Controle dos formulários expansíveis
document.addEventListener('DOMContentLoaded', function() {
  // Seleciona todos os botões de expansão de formulário
  const triggers = document.querySelectorAll('.form-trigger');
  
  // Adiciona listener de evento a cada botão
  triggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      // Obtém o ID do alvo
      const target = this.getAttribute('data-target');
      const formContainer = document.getElementById(target);
      
      // Fecha todos os outros formulários
      document.querySelectorAll('.form-container').forEach(container => {
        if (container.id !== target) {
          container.classList.remove('expanded');
          
          // Restaura ícone de seta
          const triggerElement = document.querySelector(`[data-target="${container.id}"]`);
          if (triggerElement) {
            const arrow = triggerElement.querySelector('svg');
            if (arrow) {
              arrow.style.transform = 'rotate(0)';
            }
          }
        }
      });
      
      // Alterna o estado do formulário atual
      formContainer.classList.toggle('expanded');
      
      // Anima o ícone de seta
      const arrow = this.querySelector('svg');
      if (arrow) {
        arrow.style.transform = formContainer.classList.contains('expanded') 
          ? 'rotate(180deg)' 
          : 'rotate(0)';
      }
      
      // Rola suavemente até o formulário se ele estiver expandido
      if (formContainer.classList.contains('expanded')) {
        setTimeout(() => {
          formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    });
  });

  // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});
