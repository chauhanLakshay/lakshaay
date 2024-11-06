
// Get the elements
var slideIndex = 1;
var myTimer;
var slideshowContainer;

// Initialize the slideshow
window.addEventListener("load", function() {
  slideshowContainer = document.getElementById("slideshow-container");
  showSlides(slideIndex);
  myTimer = setInterval(function() {
    plusSlides(1);
  }, 1500); // Change image every 4 seconds
});

// Navigation arrows
function plusSlides(n) {
  clearInterval(myTimer);
  if (n < 0) {
    showSlides((slideIndex -= 1));
  } else {
    showSlides((slideIndex += 1));
  }
  // Reset timer
  myTimer = setInterval(function() {
    plusSlides(1);
  }, 2000);
}

// Dots
function currentSlide(n) {
  clearInterval(myTimer);
  showSlides((slideIndex = n));
  // Reset timer
  myTimer = setInterval(function() {
    plusSlides(1);
  }, 1500);
}

// Show slides
function showSlides(n) {
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (var i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}










function toggleMenu() {
  const navigation = document.getElementById("navigation");
  navigation.classList.toggle("responsive");
}

// Close the menu when a menu item is clicked
const menuItems = document.querySelectorAll("#navigation ul li a");
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    const navigation = document.getElementById("navigation");
    navigation.classList.remove("responsive");
  });
});





// Toggle search modal visibility
function toggleSearch() {
  const modal = document.getElementById("search-modal");
  modal.style.display = modal.style.display === "block" ? "none" : "block";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById("search-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Define suggestions array
const suggestions = [
  "Shot glass",
  "Tote bag",
  "Coffee mug",
  "Cushion covers",
  "Mouse pad",
  "Sipper",
  "Travel tag",
  "Gift hamper",
  "Umbrella",
  "Perfume",
  "Flower bouquet with hampers",
  "Candle",
  "Laptop bag",
  "Brand stickers",
  "Business card holder",
  "Eco Friendly Stationary",
  "Company Keychains",
  "Badges",
  "Pens"
];


// Debounce function to optimize input event listener
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// Show suggestions function
function showSuggestions(suggestions) {
  const suggestionsContainer = document.getElementById("suggestions");
  suggestionsContainer.innerHTML = "";
  if (suggestions.length === 0) {
    suggestionsContainer.style.display = "none";
    return;
  }
  suggestions.forEach((suggestion) => {
    const div = document.createElement("div");
    div.textContent = suggestion;
    div.classList.add("suggestion-item");
    div.addEventListener("click", () => {
      document.getElementById("input").value = suggestion;
      suggestionsContainer.innerHTML = "";
      suggestionsContainer.style.display = "none";
    });
    suggestionsContainer.appendChild(div);
  });
  suggestionsContainer.style.display = "block";
}

// Show results function
function showResults(query) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";
  if (!query) {
    resultsContainer.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  // Simulate fetching results (replace with actual API call)
  const mockResults = [
    {
      title: "How to play guitar - Complete guide",
      description: "Learn how to play guitar with our comprehensive guide.",
      videoUrl: "#",
    },
    {
      title: "Top 10 Guitar Brands",
      description: "Discover the best guitar brands on the market.",
      videoUrl: "#",
    },
    {
      title: "Guitar Tutorials for Beginners",
      description: "Check out these tutorials to get started.",
      videoUrl: "#",
    },
  ];

  mockResults.forEach((result) => {
    const resultCard = document.createElement("div");
    resultCard.classList.add("result-card");
    resultCard.innerHTML = `
      <h4>${result.title}</h4>
      <p>${result.description}</p>
      <a href="${result.videoUrl}">Watch Now</a>
    `;
    resultsContainer.appendChild(resultCard);
  });
}

// Input event listener for showing suggestions
document.getElementById("input").addEventListener(
  "input",
  debounce(function () {
    const input = this.value.toLowerCase();
    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(input)
    );
    showSuggestions(filteredSuggestions);
  }, 300)
);

// Form submission event for redirecting to search-panel.html
document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get the search input value
  const query = document.getElementById("input").value.trim();

  // If there's a query, redirect to search-panel.html with the query as a URL parameter
  if (query) {
    window.location.href = `search-panel.html?query=${encodeURIComponent(query)}`;
  } else {
    alert("Please enter a search term.");
  }
});


// Search button event listener
document.getElementById("search-button").addEventListener("click", function () {
  const query = document.getElementById("input").value;
  showResults(query);
});




async function loadProducts() {
  try {
    const response = await fetch('products.json'); // Adjust the path as needed
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function displayProducts(products) {
  const productsContainer = document.getElementById('products-container');

  // Generate HTML for each product and append it to the container
  productsContainer.innerHTML = products.map(product => `
      <div class="product-card" onclick="redirectToProduct(${product.id})">
          <div class="product-image">
              <img src="${product.image_url}" alt="${product.title}">
          </div>
          <div class="product-info">
              <h5>${product.title}</h5>
              
          </div>
      </div>
  `).join('');
}

function redirectToProduct(productId) {
  // Redirects to the product details page with the product's id in the query string
  window.location.href = `product-details.html?id=${productId}`;
}

// Load products when the page loads
loadProducts();


