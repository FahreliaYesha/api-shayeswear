const API_URL = "https://api-shayeswear.vercel.app/api/products"; 

const portfolioContainer = document.getElementById("portfolio-container");
const loadingText = document.getElementById("loading");

async function loadPortfolio() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Gagal memuat data portfolio");
    const data = await response.json();

    loadingText.remove();

    if (!data || data.length === 0) {
      portfolioContainer.innerHTML =
        '<p class="col-span-full text-center text-gray-500">Belum ada data portfolio.</p>';
      return;
    }

    data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "group";

      card.innerHTML = `
        <img
          src="${item.image || './assets/default.jpg'}"
          alt="${item.title || 'Project'}"
          class="w-full h-[400px] object-cover rounded-lg shadow-md transform transition duration-300 group-hover:scale-105"
        />
        <div class="mt-3 text-center">
          <h4 class="text-lg font-semibold text-[#3b2f2f] group-hover:text-[#8b5e3c] transition">
            ${item.title || 'Tanpa Judul'}
          </h4>
          <p class="text-sm text-gray-500">${item.category || 'Uncategorized'}</p>
        </div>
      `;
      portfolioContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    loadingText.textContent = "Terjadi kesalahan saat memuat portfolio.";
  }
}

document.addEventListener("DOMContentLoaded", loadPortfolio);
