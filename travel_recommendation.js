// travel_recommendation.js

let travelData = null;

// Fetch the JSON data on page load
async function fetchData() {
  try {
    const response = await fetch("travel_recommendation_api.json");
    travelData = await response.json();
  } catch (error) {
    console.error("Error loading travel data:", error);
  }
}

fetchData();

// Handle search from input box
function handleSearch() {
  const query = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();

  if (!query) {
    alert(
      "Please enter a search term (e.g., beach, temple, or a country name).",
    );
    return;
  }

  if (!travelData) {
    alert("Data is still loading. Please try again.");
    return;
  }

  let results = [];
  let title = "";

  // Match category keywords
  if (query.includes("beach") || query.includes("beaches")) {
    results = travelData.beaches;
    title = "🏖 Beach Recommendations";
  } else if (query.includes("temple") || query.includes("temples")) {
    results = travelData.temples;
    title = "🛕 Temple Recommendations";
  } else if (query.includes("country") || query.includes("countries")) {
    results = travelData.countries;
    title = "🌏 Country Recommendations";
  } else {
    // Search by country name across all categories

    const countries = travelData.countries;
    const cities = [];
    const cityDetail = [];
    countries.forEach(country => {
      cities.push(country.cities);
    })
    cities.forEach(city => {
      city.forEach(twon => {
        cityDetail.push(twon);
      })
    })
    const allItems = [
      ...travelData.beaches,
      ...travelData.temples,
      ...cityDetail
    ];
    console.log(allItems);
    results = allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query),
    );
    title = `🔍 Results for "${query}"`;
  }

  displayResults(results, title);
}

// Render results to the page
function displayResults(results, title) {
  const section = document.getElementById("results-section");
  const grid = document.getElementById("results-grid");
  const titleEl = document.getElementById("results-title");

  titleEl.textContent = title;
  grid.innerHTML = "";

  if (!results || results.length === 0) {
    grid.innerHTML =
      '<p class="no-results">No results found. Try searching for "beach", "temple", or a country name.</p>';
  } else {
    results.forEach((item) => {
      const card = document.createElement("div");
      card.className = "result-card";
      card.innerHTML = `
        <div class="result-images">
          <img src="${item.imageUrl}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80'"/>
        </div>
        <div class="result-info">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <span class="result-country">📍 ${item.name}</span>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  section.classList.remove("hidden");
  section.scrollIntoView({ behavior: "smooth" });
}

// Clear results
function clearResults() {
  const section = document.getElementById("results-section");
  section.classList.add("hidden");
  document.getElementById("searchInput").value = "";
  document.getElementById("results-grid").innerHTML = "";
}

