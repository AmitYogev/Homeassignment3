let animalforview = [...animals];

function renderAvailableAnimals(animalsToRender) {
    const animalCardsContainer = document.getElementById("animal-cards");
    animalCardsContainer.innerHTML = ""; // ננקה את התוכן הקיים של הדיב לפני שנכניס אליו את החיות המסוננות מחדש

    // אם אין חיות להציג, נציג הודעה למשתמש
    if (animalsToRender.length === 0) {
        animalCardsContainer.innerText = "No animals found.";
        return;
    }

    const animalCards = animalsToRender.map(getanimalsHTMLCard);
    animalCardsContainer.append(...animalCards);
}

function visitAnimal(animalName) {
    localStorage.setItem('selectedAnimal', animalName);
    window.location.href = 'animal.html'; 
}

function setFilter(filterKey, filterValue) {
    // סינון החיות לפי הפילטר המתאים
    let filteredAnimals;
    if (filterKey === 'isPredator' || filterKey === 'habitat' || filterKey === 'color') {
        filteredAnimals = animalforview.filter(animal => animal[filterKey] === filterValue);
    } else if (filterKey === 'weight' || filterKey === 'height') {
        filteredAnimals = animalforview.filter(animal => animal[filterKey] > filterValue);
    } else {
        console.log('Invalid filter key');
        return;
    }
    
    // שמירת הפילטרים ב-localStorage
    localStorage.setItem('filters', JSON.stringify({filterKey, filterValue }));
    
    // רנדור את החיות המסוננות
    renderAvailableAnimals(filteredAnimals);
}

const getanimalTemplate = (animal) => {
    return `<div class="card"  >
            <img class="card-img-top" src="${animal.image}" alt="${animal.name}"/>
            <div class="card-body">
              <p class="card-text">Predator? ${animal.isPredator}</p>
              <p class="card-text">Wight: ${animal.weight} </p>
              <p class="card-text">Hight: ${animal.height} </p>
              <p class="card-text">Color: ${animal.color} </p>
              <p class="card-text">Habitat: ${animal.habitat}</p>
            </div>
          </div>`;
};

const getanimalsHTMLCard = (animal) => {
    const template = getanimalTemplate(animal);
    const wrapper = document.createElement("div");
    wrapper.className = "animals-card";
    wrapper.innerHTML = template;
    return wrapper;
};

document.addEventListener("DOMContentLoaded", () => {
    renderAvailableAnimals(animalforview);

    // קבלת המסננים מה-localStorage אם הם קיימים
    const savedFilters = JSON.parse(localStorage.getItem('filters'));
    if (savedFilters) {
        setFilter(savedFilters.filterKey, savedFilters.filterValue);
    }

    // טיפול באירוע של קלט בשדה החיפוש
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase(); // קבלת הטקסט שהוזן בשדה החיפוש
        const filteredAnimals = animalforview.filter(animal => animal.name.toLowerCase().includes(searchTerm)); // סינון החיות לפי הטקסט שהוזן בשדה החיפוש
        renderAvailableAnimals(filteredAnimals); // רנדור של החיות המסוננות
    });
});
