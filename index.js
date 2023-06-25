URL = "http://localhost:3000/characters"

function fetchAnimals(){
    fetch(URL)
    .then(res => res.json())
    .then(data => renderAnimals(data))
}

function renderAnimals(data){
    const ul = document.createElement("animals")
    const div = document.getElementById("card")

    data.forEach(animal => {
        const li = document.createElement("li")
        li.innerHTML = animal.name;
    })

}