document.addEventListener("DOMContentLoaded", () => {
  const breedSelect = document.getElementById("breedSelect");
  const fetchBreedDogBtn = document.getElementById("fetchBreedDogBtn");
  const dogImageDisplay = document.getElementById("dogImageDisplay");

  // Fetch the list of dog breeds when the page loads
  fetchBreeds();

  function fetchBreeds() {
    const breedApiUrl = "https://dog.ceo/api/breeds/list/all";
    fetch(breedApiUrl)
      .then((response) => response.json())
      .then((data) => {
        populateBreedDropdown(data.message);
      })
      .catch((error) => {
        console.error("Error fetching breed list:", error);
      });
  }

  function populateBreedDropdown(breeds) {
    for (const breed in breeds) {
      const option = document.createElement("option");
      option.value = breed;
      option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
      breedSelect.appendChild(option);
    }
  }

  fetchBreedDogBtn.addEventListener("click", () => {
    const selectedBreed = breedSelect.value;
    if (selectedBreed) {
      fetchBreedDogImage(selectedBreed);
    } else {
      alert("Please select a breed!");
    }
  });

  function fetchBreedDogImage(breed) {
    const breedApiUrl = `https://dog.ceo/api/breed/${breed}/images/random`;
    fetch(breedApiUrl)
      .then((response) => response.json())
      .then((data) => {
        displayDogImage(data.message);
      })
      .catch((error) => {
        console.error("Error fetching breed image:", error);
      });
  }

  function displayDogImage(imageUrl) {
    const dogImageHTML = `<img src="${imageUrl}" alt="Dog Breed Image" class="dog-image" />`;
    dogImageDisplay.innerHTML = dogImageHTML;
  }
});
