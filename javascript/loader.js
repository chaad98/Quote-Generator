// Show Loading
function loading() {
  loader.style.display = "grid";
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.style.display = "none";
}
