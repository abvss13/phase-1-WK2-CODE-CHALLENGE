// This URL shows where the anamiamls is fetched
const URL = "http://localhost:3000/characters";

// Fetch animals from the URL
function fetchAnimals() {
  fetch(URL)
    .then(res => res.json())
    .then(data => renderAnimals(data));
}

// Render the animals on the page
function renderAnimals(data) {
  const ul = document.getElementById("animals");
  const div = document.getElementById("card");

  data.forEach(animal => {
    const li = document.createElement("li");
    li.innerHTML = animal.name;

    const animalCard = document.createElement("div");
    animalCard.classList.add("animal-card");
    animalCard.innerHTML = `
        <img src="${animal.image}"/>
        <h2>${animal.name}</h2>
    `;

    const votes = document.createElement("div");
    votes.innerHTML = `Votes: ${animal.votes}`;

    animalCard.appendChild(votes);

    const btn = document.createElement("button");
    btn.textContent = "VOTE";

    btn.addEventListener("click", () => {
      votes.innerText = `Votes: ${parseInt(votes.innerText.split(": ")[1]) + 1}`;
    });

    animalCard.appendChild(btn);

    li.addEventListener("click", () => {
      div.innerText = "";
      div.appendChild(animalCard);
      if (!animalCard.classList.contains("active")) {
        animalCard.classList.add("active");
        div.appendChild(animalCard);
      }
    });

    ul.appendChild(li);
  });
}

// Fetch and render the animals
fetchAnimals();
