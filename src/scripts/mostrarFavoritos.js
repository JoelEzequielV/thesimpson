document.addEventListener('DOMContentLoaded', () => {

  const contenedor = document.getElementById('contenedor-favoritos');
  const paginador = document.getElementById('pagination');
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  const perPage = 4;
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get("page")) || 1;

  const totalPages = Math.ceil(favoritos.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginados = favoritos.slice(start, end);

  contenedor.innerHTML = '';
  paginador.innerHTML = '';

  if (favoritos.length === 0) {
    contenedor.innerHTML = '<p class="text-center fontLS fontBS">No tienes personajes en favoritos.</p>';
    return;
  }

  paginados.forEach(p => {
    const card = document.createElement('div');
    card.classList.add('col-md-3', 'mb-4');
    card.innerHTML = `
      <div class="card h-100 card-gg" data-id=${p.id}>
        <img src=${p.imagen} class="imgCards1 card-img-top" alt=${p.nombre} />
        <div class="card-body">
          <h5 class="card-title">${p.nombre}</h5>
          <a href="/personaje/${p.id}" class="btn btn-outline-warning my-2">Ver más</a>
          <button class="btn btn-outline-danger btn-remove" data-id="${p.id}" data-nombre=${p.nombre}>💔 Quitar de Favoritos</button>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });

  // paginación
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.className = `page-item ${i === page ? 'active' : ''}`;
    li.innerHTML = `<a class="page-link" href="?page=${i}">${i}</a>`;
    paginador.appendChild(li);
  }

  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const nombre = btn.dataset.nombre;
  
      Swal.fire({
        title: '¿Quitar a '+nombre+' de favoritos?',
        text: '¿Estás seguro que deseas quitar este personaje de tus favoritos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, quitar',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn btn-warning', 
          cancelButton: 'btn btn-danger',
      }
      }).then(result => {
        if (result.isConfirmed) {
          let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
          favoritos = favoritos.filter(p => p.id !== id);
          localStorage.setItem('favoritos', JSON.stringify(favoritos));
  
          if (favoritos.length <= start && page > 1) {
            window.location.href = `?page=${page - 1}`;
          } else {
            location.reload();
          }
        }
      });
    });
  });
  

});

