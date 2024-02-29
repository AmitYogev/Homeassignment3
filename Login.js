
  //Login
  // _________________________________________________________________________
  // const gotozooButton=()=>{
//   const gotozooButton = document.createElement("button");
//   gotozooButton.innerText = "Go To Zoo";
//   gotozooButton.className = "go-to-zoo-Button";
//   gotozooButton.addEventListener("click",window.location.href ="zoo.html")
// }
const gotozooButton = () => 
{
  const gotozooButtonElement = document.createElement("button");
  gotozooButtonElement.innerText = "Go To Zoo";
  gotozooButtonElement.className = "go-to-zoo-Button";
  gotozooButtonElement.addEventListener("click", () => {
    window.location.href = "zoo.html";
  });
  // הוסף את הכפתור לתוך ה- body של המסמך
  document.body.appendChild(gotozooButtonElement);
}


gotozooButton();


  let visitorsForView = [...visitors]; 
  

  function logout() 
  {
    // מחקית המבקר הנוכחי מהלוקל סטוראג
    localStorage.removeItem('currentVisitor');
    console.log('Visitor logged out.');
}

  const dialog = document.querySelector("#visitors-dialog");

  const getvisitorsHTMLCard = (visitor) => {
    const template = getVisitorTemplate(visitor);
    const wrapper = document.createElement("div");
    wrapper.className = "visitors-card";
    wrapper.innerHTML = template;
    wrapper.addEventListener("click", () => {handlevisitorClick(visitor)});
    return wrapper;
  };

  const getCloseModalHTMLButton = () => {
    const closeButton = document.createElement("button");
    closeButton.innerText = "Close modal";
    closeButton.addEventListener("click", () => dialog.close());
    return closeButton;
  };

  const getVisitorTemplate = (visitor) => {
    return `<div class="card"  >
            <img class="card-img-top" src="./image.jps/man.jpg" alt="${visitor.name}"/>
            <div class="card-body">
              <p class="card-text">${visitor.name}</p>
              <p class="card-text">${visitor.coins} $</p>
            </div>
          </div>`;
  }

  const handlevisitorClick = (visitor) => {
    dialog.innerHTML = "";
    const element = document.createElement("div");
    element.innerHTML = getVisitorTemplate(visitor);
    dialog.append(getCloseModalHTMLButton(), getSelectVisitorButton(visitor), getvisitorsHTMLCard(visitor));
    dialog.showModal();
};

  
  const getSearchBox = () => {
    const queryInput = document.createElement("input");
    queryInput.id = "query-input";
    queryInput.placeholder = "Search visitors";
    queryInput.className = "form-control my-4";
    queryInput.oninput = (e) => {
      visitorsForView =  visitors.filter((visitor) =>
      visitor.name.includes(e.target.value)
      );
      rendervisitors();
    };
    return queryInput;
  };
  
  const getEmptyCardsHTMLTemplate = () => {
    const templateWrapper = document.createElement("div");
    templateWrapper.className = "empty-result";
  
    const template = `
      <h2>No visitors Found</h2>
      <p>We're sorry, but no products match your search or filter criteria.</p>
      <button id="clear-filter-btn" class="btn btn-dark">Clear search text</button>`;
    templateWrapper.innerHTML = template;
    templateWrapper.children["clear-filter-btn"].addEventListener("click",clearSearchBox);
    return templateWrapper;
  };
  
  const clearSearchBox = () => {
    const input = document.getElementById("query-input");
    input.value = "";
    visitorsForView = [...  visitors];
    rendervisitors();
  };
  
  const rendervisitors = () => {
    const visitorCards = visitorsForView.map(getvisitorsHTMLCard);
    const visitorsPlaceholder = document.getElementById("placeholder");
    visitorsPlaceholder.innerHTML = "";
  
    if (!visitorCards.length) {
      visitorsPlaceholder.appendChild(getEmptyCardsHTMLTemplate());
    }
    visitorsPlaceholder.append(...visitorCards);
  };
  
  document.body.insertAdjacentElement("afterbegin", getSearchBox());
  window.addEventListener("load", rendervisitors);
  //______________________________________________________________________________________________

  
  let title = document.createElement("h1");
  title.id = "title_welcome";
  document.body.insertAdjacentElement("afterbegin", title);
  
  // בדיקה אם קיים מבקר מחובר בעת טעינת העמוד
  window.addEventListener("load", () => {
      const currentVisitor = JSON.parse(localStorage.getItem('currentVisitor'));
      if (currentVisitor) {
          title.textContent = `Welcome to the Zoo, ${currentVisitor.name}!`;
      }
  });
  
  const selectedVisitortothelocal = (visitorName) => {
      const selectedVisitor = visitors.find(visitor => visitor.name === visitorName);
      if (selectedVisitor) {
          localStorage.setItem('currentVisitor', JSON.stringify(selectedVisitor));
          alert(`Visitor ${selectedVisitor.name} logged in.`);
          title.textContent = `Welcome to the Zoo, ${selectedVisitor.name}!`;
      } else {
          alert(`Visitor ${visitorName} not found.`);
      }
  };
  
  const getSelectVisitorButton = (visitor) => {
      const selectVisitorButton = document.createElement("button");
      selectVisitorButton.innerText = "Select visitor";
      selectVisitorButton.className = "Visitor-Button";
      selectVisitorButton.addEventListener("click", () => selectedVisitortothelocal(visitor.name));
      return selectVisitorButton;
  };

//____________________________________________________________________________________________________-

