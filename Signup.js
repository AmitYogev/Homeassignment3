//Signup

function createNewVisitor(event) {
    // Prevent default form submission behavior
    event.preventDefault();
  
    // Retrieve the value of the input field
    const nameInput = document.getElementById("name");
    const name = nameInput.value.trim();

    // Validate input
    if (!name) {
      alert("Please enter a name.");
      return;
    }
  
    // Check if the visitor already exists
    if (visitorExists(name)) {
      alert("Visitor already exists. Please choose a different name.");
      return;
    }
  
    // Create a new visitor object
    const newVisitor = makeVisitor(name);
  
    // Update the visitors array
    visitors.push(newVisitor);
  
    // Save updated visitor data to local storage
    localStorage.setItem("visitors", JSON.stringify(visitors));
   // Optionally, redirect to Login.html
   window.location.href ="Login.html";
    // Optionally, do something after creating the visitor, like redirecting or showing a success message
    alert("Visitor created successfully!");
  
    // Clear the input field
    nameInput.value = "";
  }
  
  function visitorExists(name) {
    // Check if a visitor with the given name already exists
    return visitors.some(visitor => visitor.name === name);
  }
  
  function makeVisitor(name) {
    // Create a new visitor object with the given name and default properties
    return {
      name: name,
      coins: 50 
    }
  }
  
  /**************************************
    Add event listener for form submission
    */
  const createForm = document.getElementById("create-visitor-form");
  if (createForm) {
    createForm.addEventListener("submit", createNewVisitor);
  }
  