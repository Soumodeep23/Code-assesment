// Main JS for Product Page Demo

document.addEventListener('DOMContentLoaded', function() {
  // All JS will be modularized here
});

// --- DUMMY DATA ---
const PRODUCT = {
  title: "Classic Hoodie",
  price: 59.00,
  images: [
    "assets/hoodie_black.webp",
    "assets/hoodie_grey.jpg",
    "assets/hoodie_nevy.webp",
    "assets/hoodie_olive.webp",
    "assets/hoodie_red.jpg"
  ],
  colors: [
    { name: "Black", value: "#222", image: "assets/hoodie_black.webp" },
    { name: "Heather Grey", value: "#bbb", image: "assets/hoodie_grey.jpg" },
    { name: "Navy", value: "#223366", image: "assets/hoodie_nevy.webp" },
    { name: "Olive", value: "#6b8e23", image: "assets/hoodie_olive.webp" },
    { name: "Red", value: "#c0392b", image: "assets/hoodie_red.jpg" }
  ],
  sizes: ["S", "M", "L", "XL"]
};
const PAIR_WELL = [
  { title: "Classic Joggers", price: 39, image: "assets/ClassicJogger.webp" },
  { title: "Beanie Hat", price: 19, image: "assets/beanie_hat.jpg" },
  { title: "Crew Socks (3-pack)", price: 12, image: "assets/crew_shocks.jpg" },
  { title: "Canvas Tote", price: 22, image: "assets/canvas_tote.jpg" }
];
const BUNDLE = [
  { title: "Classic Hoodie", price: 59, image: "assets/hoodie_black.webp" },
  { title: "Classic Joggers", price: 39, image: "assets/ClassicJogger.webp" },
  { title: "Beanie Hat", price: 19, image: "assets/beanie_hat.jpg" }
];
const RELATED = [
  { title: "Zip Hoodie", price: 65, image: "assets/zip_hoodie.avif", badge: "New" },
  { title: "Oversized Tee", price: 29, image: "assets/oversized_tee.webp", badge: "Popular" },
  { title: "Fleece Shorts", price: 34, image: "assets/fleece_shorts.jpg" },
  { title: "Windbreaker", price: 79, image: "assets/windBreaker.jpg", badge: "New" }
];

// --- STATE ---
let selectedColorIdx = localStorage.getItem('selectedColorIdx') ? +localStorage.getItem('selectedColorIdx') : 0;
let selectedSizeIdx = localStorage.getItem('selectedSizeIdx') ? +localStorage.getItem('selectedSizeIdx') : 0;
let selectedCompare = [];

// --- GALLERY ---
function renderGallery() {
  const mainImage = document.getElementById('mainImageTag');
  const thumbnails = document.getElementById('thumbnails');
  mainImage.src = PRODUCT.colors[selectedColorIdx].image;
  mainImage.alt = PRODUCT.title + ' - ' + PRODUCT.colors[selectedColorIdx].name;
  thumbnails.innerHTML = '';
  PRODUCT.colors.forEach((color, idx) => {
    const thumb = document.createElement('div');
    thumb.className = 'thumbnail' + (idx === selectedColorIdx ? ' selected' : '');
    thumb.tabIndex = 0;
    thumb.innerHTML = `<img src="${color.image}" alt="${color.name} swatch">`;
    thumb.onclick = () => selectColor(idx);
    thumb.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') selectColor(idx); };
    thumbnails.appendChild(thumb);
  });
}
function selectColor(idx) {
  selectedColorIdx = idx;
  localStorage.setItem('selectedColorIdx', idx);
  renderGallery();
  renderSwatches();
  renderCompareSwatches();
}

// --- SWATCHES ---
function renderSwatches() {
  const swatches = document.getElementById('colorSwatches');
  swatches.innerHTML = '';
  PRODUCT.colors.forEach((color, idx) => {
    const swatch = document.createElement('button');
    swatch.className = 'swatch' + (idx === selectedColorIdx ? ' selected' : '');
    swatch.title = color.name;
    swatch.style.background = color.value;
    swatch.onclick = () => selectColor(idx);
    swatch.tabIndex = 0;
    swatches.appendChild(swatch);
  });
}

// --- SIZE OPTIONS ---
function renderSizes() {
  const sizeOptions = document.getElementById('sizeOptions');
  sizeOptions.innerHTML = '';
  PRODUCT.sizes.forEach((size, idx) => {
    const btn = document.createElement('button');
    btn.className = 'size-btn' + (idx === selectedSizeIdx ? ' selected' : '');
    btn.textContent = size;
    btn.onclick = () => selectSize(idx);
    btn.tabIndex = 0;
    sizeOptions.appendChild(btn);
  });
  // Add Size Chart button
  const chartBtn = document.createElement('button');
  chartBtn.className = 'size-chart-btn';
  chartBtn.id = 'sizeChartBtn';
  chartBtn.type = 'button';
  chartBtn.textContent = 'Size Chart';
  chartBtn.onclick = openSizeChart;
  sizeOptions.appendChild(chartBtn);
}
function selectSize(idx) {
  selectedSizeIdx = idx;
  localStorage.setItem('selectedSizeIdx', idx);
  renderSizes();
}

// --- SIZE CHART MODAL ---
function openSizeChart() {
  document.getElementById('sizeChartModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeSizeChart() {
  document.getElementById('sizeChartModal').style.display = 'none';
  document.body.style.overflow = '';
}
document.getElementById('sizeChartBtn').onclick = openSizeChart;
document.getElementById('closeSizeChart').onclick = closeSizeChart;
document.getElementById('sizeChartModal').onclick = function(e) {
  if (e.target === this) closeSizeChart();
};
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeSizeChart();
});

// --- COMPARE COLOURS MODAL ---
document.getElementById('compareColoursBtn').onclick = function() {
  document.getElementById('compareColoursModal').style.display = 'flex';
  renderCompareSwatches();
  document.body.style.overflow = 'hidden';
};
document.getElementById('closeCompareColours').onclick = closeCompareColours;
document.getElementById('compareColoursModal').onclick = function(e) {
  if (e.target === this) closeCompareColours();
};
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeCompareColours();
});
function closeCompareColours() {
  document.getElementById('compareColoursModal').style.display = 'none';
  document.body.style.overflow = '';
}
function renderCompareSwatches() {
  const container = document.getElementById('compareSwatches');
  container.innerHTML = '';
  PRODUCT.colors.forEach((color, idx) => {
    const swatch = document.createElement('button');
    swatch.className = 'swatch' + (selectedCompare.includes(idx) ? ' selected' : '');
    swatch.title = color.name;
    swatch.style.background = color.value;
    swatch.onclick = () => toggleCompare(idx);
    container.appendChild(swatch);
  });
}
function toggleCompare(idx) {
  if (selectedCompare.includes(idx)) {
    selectedCompare = selectedCompare.filter(i => i !== idx);
  } else if (selectedCompare.length < 3) {
    selectedCompare.push(idx);
  }
  renderCompareSwatches();
}

// --- PAIR WELL WITH CAROUSEL ---
function renderPairWell() {
  const carousel = document.getElementById('pairWellCarousel');
  carousel.innerHTML = '';
  PAIR_WELL.forEach(item => {
    const card = document.createElement('div');
    card.className = 'pair-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="pair-card-title">${item.title}</div>
      <div class="pair-card-price">$${item.price.toFixed(2)}</div>
      <button class="add-btn">Add to Cart</button>
    `;
    carousel.appendChild(card);
  });
}

// --- BUNDLE SUGGESTION ---
function renderBundle() {
  const container = document.getElementById('bundleProducts');
  container.innerHTML = '';
  let total = 0;
  BUNDLE.forEach((item, idx) => {
    total += item.price;
    const prod = document.createElement('div');
    prod.className = 'bundle-product';
    prod.innerHTML = `<img src="${item.image}" alt="${item.title}"><div>${item.title}</div><div style='color:var(--accent);font-weight:500;'>$${item.price.toFixed(2)}</div>`;
    container.appendChild(prod);
    if (idx < BUNDLE.length - 1) {
      const plus = document.createElement('div');
      plus.className = 'bundle-plus';
      plus.textContent = '+';
      container.appendChild(plus);
    }
  });
  document.getElementById('bundleTotal').textContent = `Total: $${total.toFixed(2)}`;
}

// --- TABS ---
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
  btn.onclick = function() {
    tabBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.getElementById('tab-' + this.dataset.tab).classList.add('active');
  };
});

// --- RELATED PRODUCTS ---
function renderRelated() {
  const grid = document.getElementById('relatedGrid');
  grid.innerHTML = '';
  RELATED.forEach(item => {
    const card = document.createElement('div');
    card.className = 'related-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="related-card-title">${item.title}</div>
      <div class="related-card-price">$${item.price.toFixed(2)}</div>
      ${item.badge ? `<div class="related-badge">${item.badge}</div>` : ''}
    `;
    grid.appendChild(card);
  });
}

// --- IMAGE ZOOM ---
const mainImageDiv = document.getElementById('mainImage');
mainImageDiv.addEventListener('click', function() {
  this.classList.toggle('zoomed');
});
mainImageDiv.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') this.classList.toggle('zoomed');
});

// --- INIT ---
function init() {
  renderGallery();
  renderSwatches();
  renderSizes();
  renderPairWell();
  renderBundle();
  renderRelated();
}
init();
