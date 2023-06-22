window.onload = () => {
    /**
     * @param {string} selector 
     * @return {HTMLElement}
     */
        const qs = (selector) => document.querySelector(selector); 
    
        let form = qs("form");
        let title = qs("#title");
        let rating = qs("#rating");
        let awards = qs("#awards");
        let release_date = qs("#release_date");
        let length = qs("#length");
        let agregar = qs(".botonAgregar");
        
    
        agregar.addEventListener("click", () => {
    
            let datosNuevos = {
                title : title.value,
                rating : rating.value,
                awards : awards.value,
                release_date : release_date.value,
                length : length.value
            }
    
            let settings = {
                method: "POST",
                body: JSON.stringify(datosNuevos),
                headers: {"Content-Type" : "application/json"}
            }
    
            let url = `http://localhost:3031/api/movies/create`
    
    
            fetch(url, settings)
            .then((response) => response.json())
            .then(() => {
                 alert("creado!")
            })
    
        })

    }