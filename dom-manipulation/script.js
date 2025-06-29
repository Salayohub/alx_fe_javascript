// Initial quote array
let quotes = [
  { text: "Success doesn’t start with a plan — it starts with belief.", category: "Motivation" },
  { text: "Mistakes are not failures, they are the syllabus of experience.", category: "Learning" },
  { text: "True love is not about perfection, but patience.", category: "Love" },
  { text: "Peace isn't found in silence — it's found in balance.", category: "Mindfulness" }
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `"${quote.text}" <br><small>— ${quote.category}</small>`;
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    alert("Quote added successfully!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill in both fields.");
  }
}

// ✅ Function to dynamically create the quote input form
function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.style.marginTop = "30px";

  const heading = document.createElement("h3");
  heading.textContent = "Add a New Quote";

  const inputText = document.createElement("input");
  inputText.id = "newQuoteText";
  inputText.placeholder = "Enter a new quote";
  inputText.type = "text";

  const inputCategory = document.createElement("input");
  inputCategory.id = "newQuoteCategory";
  inputCategory.placeholder = "Enter quote category";
  inputCategory.type = "text";

  const button = document.createElement("button");
  button.textContent = "Add Quote";
  button.onclick = addQuote;

  // Add spacing between inputs
  inputText.style.marginRight = "10px";
  inputCategory.style.marginRight = "10px";

  // Append to container
  formContainer.appendChild(heading);
  formContainer.appendChild(inputText);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(button);

  // Append form to the body
  document.body.appendChild(formContainer);
}

// Event listener for new quote button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Initial display and form creation
showRandomQuote();
createAddQuoteForm(); // ✅ Now this function exists and runs
