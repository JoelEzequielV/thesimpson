export function favoritos() {
    const botonesFav = document.querySelectorAll('.btn-fav');
  
    botonesFav.forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.card');
        const id = card.dataset.id;
        const titulo = card.querySelector('.card-title').textContent;
        // const descripcion = card.querySelector('.card-text').textContent;
        const imagen = card.querySelector('img').src;
  
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  
        const yaEsta = favoritos.find(p => p.id === id);
  
        if (yaEsta) {
          favoritos = favoritos.filter(p => p.id !== id);
          btn.textContent = '❤️ Añadir a Favoritos';
        } else {
          favoritos.push({ id, nombre, imagen });
          btn.textContent = '💔 Quitar de Favoritos';
        }
  
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
      });
    });
  
    // Marcar los favoritos al cargar
    marcarFavoritos();
  };
  
  function marcarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    document.querySelectorAll('.card').forEach(card => {
      const id = card.dataset.id;
      const btn = card.querySelector('.btn-fav');
      if (favoritos.find(p => p.id === id)) {
        btn.textContent = '💔 Quitar de Favoritos';
      }
    });
  }
  favoritos();