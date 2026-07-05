document.addEventListener("DOMContentLoaded", function () {
  var searchInput = document.querySelector("[data-journal-search]");
  var clearBtn = document.querySelector("[data-journal-clear]");
  var chips = document.querySelectorAll("[data-journal-category]");
  var cards = document.querySelectorAll("[data-journal-card]");
  var emptyState = document.querySelector("[data-journal-empty]");
  var emptyQuery = document.querySelector("[data-journal-empty-query]");
  var emptyCategory = document.querySelector("[data-journal-empty-category]");

  if (!searchInput || !cards.length) return;

  var activeCategory = "All";

  function applyFilter() {
    var needle = searchInput.value.trim().toLowerCase();
    var visibleCount = 0;

    cards.forEach(function (card) {
      var category = card.getAttribute("data-journal-card");
      var haystack = card.getAttribute("data-journal-search") || "";
      var matchesCategory = activeCategory === "All" || category === activeCategory;
      var matchesQuery = !needle || haystack.indexOf(needle) !== -1;
      var visible = matchesCategory && matchesQuery;
      card.style.display = visible ? "" : "none";
      if (visible) visibleCount++;
    });

    clearBtn.style.display = needle ? "inline" : "none";

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? "" : "none";
      if (visibleCount === 0) {
        if (emptyQuery) emptyQuery.textContent = searchInput.value.trim();
        if (emptyCategory) {
          emptyCategory.textContent = activeCategory === "All" ? "" : " in " + activeCategory;
        }
      }
    }
  }

  searchInput.addEventListener("input", applyFilter);

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      searchInput.value = "";
      applyFilter();
      searchInput.focus();
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");
      activeCategory = chip.getAttribute("data-journal-category");
      applyFilter();
    });
  });

  applyFilter();
});
