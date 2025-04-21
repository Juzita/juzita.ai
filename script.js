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
  
  // Manipulação do formulário de inscrição na lista de espera
  const waitlistForm = document.querySelector('.waitlist-form');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      
      try {
        const response = await fetch(this.action, {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          alert('Cadastro realizado! Você receberá atualizações por e-mail e WhatsApp quando a Juzita estiver pronta.');
          this.reset();
        } else {
          alert('Ocorreu um erro. Por favor, tente novamente.');
        }
      } catch (error) {
        console.error('Error:', error);
        // Fallback para redirecionamento em caso de erro
        window.location.href = this.action + "?" + new URLSearchParams(formData).toString();
      }
    });
  }
});
