let quotes = [];

// Load from localStorage
function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  quotes = stored ? JSON.parse(stored) : [];
  if (quotes.length === 0) {
    quotes = [
      { text: "Success doesn’t start with a plan — it starts with belief.", category: "Motivation" },
      { text: "True love is not about perfection, but patience.", category: "Love" },
      { text: "Mistakes are not failures, they are the syllabus of experience.", category: "Learning" },
      { text: "Peace isn't found in silence — it's found in balance.", category: "Mindfulness" }
    ];
    saveQuotes();
  }
}

// Save to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Save selected filter
function saveSelectedCategory(category) {
  localStorage.setItem("selectedCategory", category);
}

// Get saved filter
function getSavedCategory() {
  return localStorage.getItem("selectedCategory") || "all";
}

// Populate category dropdown
function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");
  const categories = ["all", ...new Set(quotes.map(q => q.category))];

  dropdown.innerHTML = ""; // Clear existing options
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    dropdown.appendChild(option);
  });

  // Set saved selection
  const saved = getSavedCategory();
  dropdown.value = saved;
}

// Show a random quote (filtered)
function showRandomQuote() {
  const category = document.getElementById("categoryFilter").value;
  const filteredQuotes = category === "all" ? quotes : quotes.filter(q => q.category === category);

  if (filteredQuotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "No quotes found in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];

  document.getElementById("quoteDisplay").innerHTML = `"${quote.text}" <br><small>— ${quote.category}</small>`;
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
}

// Filter and display
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  saveSelectedCategory(selected);
  showRandomQuote();
}

// Add new quote and update categories
function addQuote() {
  const newText = document.getElementById("newQuoteText").value.trim();
  const newCat = document.getElementById("newQuoteCategory").value.trim();

  if (!newText || !newCat) {
    alert("Please fill in both fields.");
    return;
  }

  quotes.push({ text: newText, category: newCat });
  saveQuotes();
  populateCategories();
  alert("Quote added!");
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Dynamic quote form
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

  inputText.style.marginRight = "10px";
  inputCategory.style.marginRight = "10px";

  formContainer.appendChild(heading);
  formContainer.appendChild(inputText);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(button);

  document.body.appendChild(formContainer);
}

// Export to JSON
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
  URL.revokeObjectURL(url);
}

// Import from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        populateCategories();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid file format.");
      }
    } catch (err) {
      alert("Error reading JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Restore last viewed quote (optional)
function showLastViewedQuote() {
  const last = sessionStorage.getItem("lastViewedQuote");
  if (last) {
    const quote = JSON.parse(last);
    document.getElementById("quoteDisplay").innerHTML = `"${quote.text}" <br><small>— ${quote.category}</small>`;
  }
}

// Initialize App
loadQuotes();
createAddQuoteForm();
populateCategories();
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
filterQuotes(); // apply filter from saved preference

// Simulate a server response (fetched quotes)
function fetchServerQuotes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulated server data (JSONPlaceholder style)
      const serverQuotes = [
        { text: "Server-synced wisdom.", category: "Server" },
        { text: "Always fetch before you fail.", category: "Sync" }
      ];
      resolve(serverQuotes);
    }, 1000);
  });
}

// Simulate uploading quotes to server
async function uploadToServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST", // ✅ Required method
      headers: {
        "Content-Type": "application/json" // ✅ Required header
      },
      body: JSON.stringify(quotes) // ✅ Your quote data
    });

    const result = await response.json();
    console.log("Server response:", result);

    document.getElementById("syncStatus").textContent = "✅ Quotes uploaded to server (simulated).";
  } catch (error) {
    console.error("Upload failed:", error);
    document.getElementById("syncStatus").textContent = "❌ Upload failed.";
  }
}


// Sync with server and resolve conflicts
function syncWithServer() {
  fetchServerQuotes().then(serverQuotes => {
    const localJson = JSON.stringify(quotes);
    const serverJson = JSON.stringify(serverQuotes);

    if (localJson !== serverJson) {
      // Basic Conflict Strategy: Server wins
      quotes = serverQuotes;
      saveQuotes();
      populateCategories();
      filterQuotes();

      document.getElementById("syncStatus").innerHTML =
        "<strong>⚠ Server data loaded. Local quotes were overwritten.</strong>";
    } else {
      document.getElementById("syncStatus").textContent = "Quotes already in sync with server.";
    }
  });
}

//  Required: async function that fetches from JSONPlaceholder
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    // Transform the data to match your quote structure
    const serverQuotes = data.slice(0, 5).map(post => ({
      text: post.title,
      category: "Server"
    }));

    return serverQuotes;
  } catch (error) {
    console.error("Error fetching quotes from server:", error);
    return [];
  }
}


async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();

  const localJson = JSON.stringify(quotes);
  const serverJson = JSON.stringify(serverQuotes);

  if (localJson !== serverJson) {
    quotes = serverQuotes;
    saveQuotes();
    populateCategories();
    filterQuotes();

    document.getElementById("syncStatus").innerHTML =
      "<strong>⚠ Server data loaded. Local quotes were overwritten.</strong>";
  } else {
    document.getElementById("syncStatus").textContent = "Quotes already in sync with server.";
  }
}
