// Quote data
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

// Function to add a new quote from input fields
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    alert("Quote added successfully!");
    // Clear inputs
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill in both the quote and category.");
  }
}

// Attach event listener to Show New Quote button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Show one quote initially on page load
showRandomQuote();
