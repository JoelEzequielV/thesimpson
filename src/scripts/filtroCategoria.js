
import personajes from '../data/personajes';

document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("cards");
  const paginationContainer = document.getElementById("pagination");
  const checkboxes = document.querySelectorAll(".filtro-categoria");

  const perPage = 4;
  let filtros = [];

  // 🔹 Obtener favoritos desde localStorage
  const getFavoritos = () => {
    return JSON.parse(localStorage.getItem("favoritos")) || [];
  };

  // 🔹 Marcar visualmente los favoritos
  const actualizarFavoritosUI = () => {
    const favoritos = getFavoritos();
    document.querySelectorAll(".card-gg").forEach(card => {
      const id = Number(card.dataset.id);
      const btn = card.querySelector(".btn-fav");

      if (favoritos.some(fav => fav.id === id)) {
        btn.textContent = "✅ Quitar de Favoritos";
        btn.classList.remove("btn-outline-info");
        btn.classList.add("btn-outline-danger");
      } else {
        btn.textContent = "❤️ Añadir a Favoritos";
        btn.classList.remove("btn-success");
        btn.classList.add("btn-outline-info");
      }
    });
  };

  // 🔹 Asignar eventos a los botones de favoritos
  const asignarEventosFavoritos = () => {
    document.querySelectorAll(".btn-fav").forEach(btn => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".card-gg");
        const id = Number(card.dataset.id);
        const nombre = card.dataset.nombre;
        const imagen = card.dataset.imagen;
  
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  
        const index = favoritos.findIndex(p => p.id === id);
  
        if (index !== -1) {
          favoritos.splice(index, 1); // quitar
        } else {
          favoritos.push({ id, nombre, imagen }); // añadir
        }
  
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        actualizarFavoritosUI();
      });
    });
  };
  

  const render = (page = 1) => {
    let filtrados = personajes;

    // Aplicar filtros
    if (filtros.length > 0) {
      filtrados = personajes.filter(p => filtros.includes(p.categoria));
    }

    const totalPages = Math.ceil(filtrados.length / perPage);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginados = filtrados.slice(start, end);

    // Renderizar cards
    cardsContainer.innerHTML = '';
    paginados.forEach(p => {
      const col = document.createElement("div");
      col.className = "col-md-3 mb-4";
      col.innerHTML = `
  <div class="card h-100 card-gg" data-id=${p.id} data-nombre="${p.nombre}" data-imagen="${p.imagen.replace('../../public', '')}">
    <img src=${p.imagen.replace('../../public', '')} class="imgCards1 card-img-top" alt=${p.nombre} />
    <div class="card-body">
      <h5 class="card-title">${p.nombre}</h5>
      <a href="/personaje/${p.id}" class="btn btn-outline-warning my-2">Ver más</a>
      <button class="btn btn-outline-info btn-fav">❤️ Añadir a Favoritos</button>
    </div>
  </div>`;
      cardsContainer.appendChild(col);
    });

    // Reasignar eventos y actualizar favoritos visuales
    actualizarFavoritosUI();
    asignarEventosFavoritos();

    // paginación
    paginationContainer.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${i === page ? 'active' : ''}`;
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      li.addEventListener("click", e => {
        e.preventDefault();
        render(i);
      });
      paginationContainer.appendChild(li);
    }
  };

  checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      filtros = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      render(1);
    });
  });

  render();
});
