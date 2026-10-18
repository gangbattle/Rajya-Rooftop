document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuCards = document.querySelectorAll(".menu-card");
    const searchInput = document.getElementById("menu-search");
    const noResultsMsg = document.getElementById("no-results");

    let activeCategory = "all";

    function updateMenuDisplay() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        menuCards.forEach((card) => {
            const cardCategory = card.getAttribute("data-category");
            const cardText = card.innerText.toLowerCase();

            const matchesCategory = (activeCategory === "all" || cardCategory === activeCategory);
            const matchesSearch = cardText.includes(searchTerm);

            if (matchesCategory && matchesSearch) {
                card.style.display = "flex";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (visibleCount === 0) {
            noResultsMsg.style.display = "block";
        } else {
            noResultsMsg.style.display = "none";
        }
    }

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.is('active') && b.classList.remove("active"));
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            activeCategory = btn.getAttribute("data-filter");
            updateMenuDisplay();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", updateMenuDisplay);
    }
});
