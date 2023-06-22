window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

    const response = await fetch("http://localhost:3031/api/movies");
    const pelicula = await response.json();

   /* Codigo que debemos usar para mostrar los datos en el frontend */
    let movies = pelicula.data;

    if (!localStorage.getItem("favoritas")) {
      const favoritas = []
      localStorage.setItem("favoritas", JSON.stringify(favoritas))
    }

    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card1");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      const Editar = document.createElement("div");
      Editar.innerHTML = "<a href='formulario_edit.html' class='botonAgregar ec-stars-wrapper direction-page '>Editar/Eliminar</a>";

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      const bttn = document.createElement("button")
      bttn.innerHTML = `&#9733;`
      bttn.setAttribute("class", "botonModificar ec-stars-wrapper botonAgregarfav")
      
      bttn.setAttribute("id", movie.id)
      
      const favoritas = JSON.parse(localStorage.getItem("favoritas")) || [];
      if (favoritas.find(favorita => favorita.id === movie.id)) {
        bttn.classList.add("disabled");
      }
      bttn.addEventListener("click", (e) => {
        e.preventDefault()

        let favoritas = JSON.parse(localStorage.getItem("favoritas"))

        if (!favoritas.find(favorita => favorita.id === +e.target.id)) {
          favoritas.push(movie)

          bttn.classList.add("disabled")

          bttn.style.color = "goldenrod"
  
        } else {
          console.log("Favorito a eliminar:", e.target.id);
          favoritas = favoritas.filter(favorita => favorita.id !== +e.target.id);
          console.log("Lista actualizada de favoritas:", favoritas);

          bttn.classList.remove("disabled");
          localStorage.removeItem("favoritas");
          localStorage.setItem("favoritas", JSON.stringify(favoritas));
          bttn.style.color = "white"
        }


        localStorage.setItem("favoritas", JSON.stringify(favoritas))


      })
      card.appendChild(duracion);
      card.appendChild(bttn)
      card.appendChild(Editar);
    });
  
};