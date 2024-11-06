const data = [
    { make: "Gibson", model: "Les Paul", type: "Electric", price: "$3,000", image: "http://www.sweetwater.com/images/items/120/LPST5HTHDCH-medium.jpg?9782bd" },
    { make: "Gibson", model: "SG", type: "Electric", price: "$1,500", image: "http://www.sweetwater.com/images/items/120/SGSEBCH-medium.jpg?e69cfe" },
    { make: "Fender", model: "Telecaster", type: "Electric", price: "$2,000", image: "http://www.sweetwater.com/images/items/120/TelePLMPHB-medium.jpg?28e48b" },
    { make: "Fender", model: "Stratocaster", type: "Electric", price: "$2,000", image: "http://www.sweetwater.com/images/items/120/StratAMM3SB2-medium.jpg?dfd0a9" },
    { make: "Gretsch", model: "White Falcon", type: "Electric", price: "$5,000", image: "http://www.sweetwater.com/images/items/120/G613655GE-medium.jpg?9bfb0e" },
    { make: "Paul Reed Smith", model: "Custom 24", type: "Electric", price: "$5,000", image: "http://www.sweetwater.com/images/items/120/HBII10BGWB-medium.jpg?982763" },
    { make: "Gibson", model: "Hummingbird", type: "Acoustic", price: "$2,500", image: "http://www.sweetwater.com/images/items/120/SSHBHCNP-medium.jpg?11fbea" }
];

let filtersObject = {};
const productsContainer = document.getElementById("products");
const itemsPerPage = 20; // Number of items per page
let currentPage = 1; // Current page
let filteredData = data; // Data to render based on filters

function renderProducts() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = filteredData.slice(start, end);

    const productsHTML = paginatedProducts.map(item => `
        <div class="col-md-4 col-sm-6 product" data-make="${item.make}" data-model="${item.model}" data-type="${item.type}" data-price="${parseInt(item.price.replace(/[^0-9]/g, ''))}">
            <div class="product-inner">
                <img src="${item.image}" alt="${item.model}">
                <p><strong>Make:</strong> ${item.make}</p>
                <p><strong>Model:</strong> ${item.model}</p>
                <p><strong>Type:</strong> ${item.type}</p>
                <p class="product-price">Price: ${item.price}</p>
            </div>
        </div>`).join('');
    
    productsContainer.innerHTML = productsHTML;
    updatePagination();
}

function initializeFilters() {
    const uniqueOptions = field => [...new Set(data.map(item => item[field]))];
    renderFilterOptions(".filter-make", uniqueOptions('make'));
    renderFilterOptions(".filter-model", uniqueOptions('model'));
    renderFilterOptions(".filter-type", uniqueOptions('type'));
}

function renderFilterOptions(selector, options) {
    const select = document.querySelector(selector);
    options.forEach(option => select.insertAdjacentHTML("beforeend", `<option value="${option}">${option}</option>`));
}

document.querySelectorAll(".filter").forEach(select => {
    select.addEventListener("change", function () {
        const filterName = this.dataset.filter;
        const filterVal = this.value;
        filterVal ? filtersObject[filterName] = filterVal : delete filtersObject[filterName];
        applyFilters();
    });
});

document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const query = e.target.querySelector("input").value.toLowerCase();
    filteredData = data.filter(product => 
        ['make', 'model', 'type'].some(attr => product[attr].toLowerCase().includes(query))
    );
    currentPage = 1; // Reset to first page
    renderProducts();
});

function applyFilters() {
    filteredData = data.filter(product => {
        return Object.entries(filtersObject).every(([key, val]) => product[key] === val);
    });
    currentPage = 1; // Reset to first page
    renderProducts();
}

function changePage(direction) {
    currentPage += direction;
    renderProducts();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage >= totalPages;
}

// Sidebar Collapsible Toggle
document.querySelector('.collapse-button').addEventListener('click', () => {
    document.querySelector('.filters').classList.toggle('collapsed');
});

// Collapsible Functionality for Filter Sections
document.querySelectorAll('.filter-section h4').forEach(header => {
    header.addEventListener('click', () => {
        header.parentElement.classList.toggle('collapsed');
    });
});

// Clear All Filters Functionality
document.querySelector('.clear-filters').addEventListener('click', () => {
    document.querySelectorAll('.filter-section input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.parentNode.classList.remove('selected');
    });
    filtersObject = {}; // Reset filters
    applyFilters(); // Re-render with no filters
});

// Toggle selected styles on checkbox selection
document.querySelectorAll('.filter-section label').forEach(label => {
    label.addEventListener('change', function() {
        label.classList.toggle('selected', label.querySelector('input[type="checkbox"]').checked);
    });
});

// Initial render
renderProducts();
initializeFilters();
