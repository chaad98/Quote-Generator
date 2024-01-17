const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Get Quotes From API
async function getQuote() {
  // Set Loader, Hide Quote
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    /* this constant value 'response' will not be populate until
     it fetch the API data first */
    /* if you don't set async and await, it will set the response value
    before it has the chance to set the apiUrl, then this can cause error */
    const response = await fetch(apiUrl);

    /* get the json from the API 'apiUrl' as a variable response
    and then stored JSON Object into variable 'apiQuotes' */
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    // Catch Error Here
    console.log(err);
  }
}

// Show New Quote
function newQuote() {
  // Set Loader, Hide Quote
  loading();
  // Pick a random quote from apiQuote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if Author field is blank and replace it with 'Unknown'
  // You can read this condition like this -> If there is no quote's author...
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check Quote length to determine styline
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;

  // Set Quote, Hide Loader
  complete();
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  /* The '_blank' is meant to be whenever you click twitter button, it will
  open the new tab */
  window.open(twitterUrl, "_blank");
}

// Event Listeners means to make this component or etc alive and working in browser
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
