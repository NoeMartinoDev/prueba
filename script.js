const input = document.querySelector("#searchBar")
const button = document.querySelector("#buttonSearch")
const container = document.querySelector("#container")

button.addEventListener("click", (e) => {
  e.preventDefault()
  let character = input.value

  //Vaciamos el contenido del container al realizar una nueva búsqueda
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }

  if (character != "") {
    getCharacters(character)
      //Capturamos el resultado de la async fn (un array) y por cada elemento llamamos a showCharacters
      .then((characters) => {
        if (Array.isArray(characters)) {
          characters.forEach((c) => showCharacters(c))
        }
      })
  } else {
    alert("Escribí el nombre de un personaje")
  }
})

async function getCharacters(character) {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${character}`)
    if (response.status < 400) {
    const datos = await response.json()
    input.value = ""
    return datos.results
    } else {
      //Manejo el error teniendo en cuenta la respuesta de la API
      const error = await response.json()
      if(error.error === "There is nothing here") {
        container.classList.remove("section")
        input.value = ""
        alert("Personaje inexistente")
      }
    }
  } catch (err){
    console.log(err)
  }
}

const showCharacters = (character) => {
  let divCharacter = document.createElement('div')
    divCharacter.innerHTML = `
        <h3 class="detail">${character.name}</h3>
        <img src="${character.image}"></img>
    `
    container.appendChild(divCharacter)
    container.classList.add("section")

    //Creo una clase para seleccionar todos los h3 y poder agregarles el evento del click
    const detail = divCharacter.querySelector(".detail");
    detail.addEventListener("click", () => {
      showDetail(character)
    })
}

const showDetail = (character) => {
  container.innerHTML = ""
  let divCharacter = document.createElement('div')
  divCharacter.innerHTML = `
        <h2>${character.name}</h2>
        <div class="detailDiv">
          <img src="${character.image}"></img>
          <div class="divP">
          <p>Especie: ${character.species}</p>
          <p>Género: ${character.gender}</p>
          <p>Estado: ${character.status}</p>
          </div>
        </div>
    `
    container.appendChild(divCharacter)
}


