const CHARACTERS_URL = "http://localhost:3000/characters";
const animalList = document.getElementById("animals-list");
const animalDetailsContainer = document.getElementById("animal-details");
const voteButton = document.getElementById("vote-button");
const resetButton = document.getElementById("reset-button");
const addAnimalForm = document.getElementById("add-animal-form");

// Fetch animals from the URL
async function fetchAnimals() {
  try {
    const response = await fetch(CHARACTERS_URL);
    const data = await response.json();
    renderAnimals(data);
  } catch (error) {
    console.log("Error fetching animals:", error);
  }
}

// Render the animals on the page
function renderAnimals(data) {
  animalList.innerHTML = "";
  data.forEach((animal) => {
    const li = document.createElement("li");
    li.textContent = animal.name;
    li.addEventListener("click", () => {
      showAnimalDetails(animal);
    });
    animalList.appendChild(li);
  });
}

// Show the details of the selected animal
function showAnimalDetails(animal) {
  animalDetailsContainer.innerHTML = `
    <h2>${animal.name}</h2>
    <img src="${animal.image}" alt="${animal.name}">
    <p>Votes: <span id="vote-count">${animal.votes}</span></p>
  `;

  voteButton.disabled = false;
  voteButton.addEventListener("click", () => {
    incrementVotes(animal);
  });
}

// Increment the votes for the selected animal
function incrementVotes(animal) {
  const voteCountElement = document.getElementById("vote-count");
  animal.votes += 1;
  voteCountElement.textContent = animal.votes;
}

// Reset the votes for all animals
async function resetVotes() {
  try {
    const response = await fetch(CHARACTERS_URL);
    const data = await response.json();
    data.forEach((animal) => {
      animal.votes = 0;
    });

    await fetch(CHARACTERS_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Reset the UI
    const voteCountElements = document.getElementsByClassName("vote-count");
    Array.from(voteCountElements).forEach((element) => {
      element.textContent = "0";
    });
  } catch (error) {
    console.log("Error resetting votes:", error);
  }
}

// Add a new animal
async function addAnimal(event) {
  event.preventDefault();

  const nameInput = document.getElementById("animal-name");
  const imageInput = document.getElementById("animal-image");

  const newAnimal = {
    name: nameInput.value,
    image: imageInput.value,
    votes: 0,
  };

  try {
    await fetch(CHARACTERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAnimal),
    });

    // Clear the form inputs
    nameInput.value = "";
    imageInput.value = "";

    // Fetch and render the updated animals
    fetchAnimals();
  } catch (error) {
    console.log("Error adding animal:", error);
  }
}

// Event listeners
resetButton.addEventListener("click", resetVotes);
addAnimalForm.addEventListener("submit", addAnimal);

// Fetch and render the animals
fetchAnimals();
