const movies = [
  {
    id: "dune-part-two",
    title: "Dune: Part Two",
    year: 2024,
    duration: "166 min",
    director: "Denis Villeneuve",
    cast: ["Timothee Chalamet", "Zendaya", "Rebecca Ferguson"],
    genres: ["Sci-Fi", "Adventure"],
    featured: true,
    trailer: "https://www.youtube.com/watch?v=Way9Dexny3w",
    poster: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Dune_Part_Two_poster.jpeg/500px-Dune_Part_Two_poster.jpeg",
    color: "linear-gradient(145deg, #2d1a0f, #8d5b2a 58%, #f0c16f)",
    blurb: "Paul Atreides unites with the Fremen while navigating destiny, war, and the cost of prophecy on Arrakis.",
    description: "A visually grand continuation of Paul Atreides' rise, balancing intimate character stakes with massive world-building and political tension."
  },
  {
    id: "past-lives",
    title: "Past Lives",
    year: 2023,
    duration: "106 min",
    director: "Celine Song",
    cast: ["Greta Lee", "Teo Yoo", "John Magaro"],
    genres: ["Romance", "Drama"],
    featured: false,
    trailer: "https://www.youtube.com/watch?v=kA244xewjcI",
    poster: "https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Past_Lives_film_poster.png/500px-Past_Lives_film_poster.png",
    color: "linear-gradient(145deg, #10203d, #5c6f9d 60%, #f0dfd2)",
    blurb: "A deeply felt story about connection, timing, and the lives we imagine across continents and years.",
    description: "Two childhood friends reconnect decades later, exploring what love, distance, and identity mean when life moves in different directions."
  },
  {
    id: "spider-verse",
    title: "Across the Spider-Verse",
    year: 2023,
    duration: "140 min",
    director: "Joaquim Dos Santos",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
    genres: ["Animation", "Action"],
    featured: true,
    trailer: "https://www.youtube.com/watch?v=shW9i6k8cB0",
    poster: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg/500px-Spider-Man-_Across_the_Spider-Verse_poster.jpg",
    color: "linear-gradient(145deg, #2a0456, #7d33c3 46%, #ff5d8f)",
    blurb: "A hyper-stylized multiverse chase with kinetic action, comic-book textures, and emotional momentum.",
    description: "Miles Morales launches into a dazzling multiversal conflict where every choice reshapes his future and the definition of being Spider-Man."
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    year: 2023,
    duration: "180 min",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr."],
    genres: ["Biography", "Thriller"],
    featured: false,
    trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg",
    poster: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Oppenheimer_%28film%29.jpg/500px-Oppenheimer_%28film%29.jpg",
    color: "linear-gradient(145deg, #220d08, #8d4517 50%, #ffb12a)",
    blurb: "A tense and immersive portrait of ambition, consequence, and the creation of the atomic bomb.",
    description: "Christopher Nolan crafts a propulsive historical drama about genius, moral compromise, and the political machinery surrounding J. Robert Oppenheimer."
  },
  {
    id: "the-batman",
    title: "The Batman",
    year: 2022,
    duration: "176 min",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoe Kravitz", "Paul Dano"],
    genres: ["Action", "Crime"],
    featured: false,
    trailer: "https://www.youtube.com/watch?v=mqqft2x_Aa4",
    poster: "https://upload.wikimedia.org/wikipedia/en/f/ff/The_Batman_%28film%29_poster.jpg",
    color: "linear-gradient(145deg, #080808, #4d1515 58%, #c12424)",
    blurb: "A rain-soaked detective noir with bruising action and a brooding take on Gotham's vigilante.",
    description: "Batman follows a disturbing trail of corruption through Gotham, uncovering links between the city's elite and a terrifying serial killer."
  },
  {
    id: "everything-everywhere",
    title: "Everything Everywhere All at Once",
    year: 2022,
    duration: "139 min",
    director: "Daniel Kwan & Daniel Scheinert",
    cast: ["Michelle Yeoh", "Ke Huy Quan", "Stephanie Hsu"],
    genres: ["Sci-Fi", "Comedy"],
    featured: true,
    trailer: "https://www.youtube.com/watch?v=wxN1T1uxQ2g",
    poster: "https://upload.wikimedia.org/wikipedia/en/1/1e/Everything_Everywhere_All_at_Once.jpg",
    color: "linear-gradient(145deg, #27103f, #6225a5 45%, #ff6f91)",
    blurb: "An imaginative, emotional multiverse adventure powered by family drama and fearless absurdity.",
    description: "A laundromat owner is swept into a reality-bending mission where she confronts fractured identities, cosmic stakes, and generational pain."
  }
];

const ratingStorageKey = "cineScopeRatings";

const state = {
  search: "",
  genre: "all",
  year: "all",
  sortBy: "featured",
  ratings: loadRatings(),
  watchlist: new Set()
};

const elements = {
  grid: document.querySelector("#movie-grid"),
  search: document.querySelector("#search-input"),
  genre: document.querySelector("#genre-filter"),
  year: document.querySelector("#year-filter"),
  sort: document.querySelector("#sort-filter"),
  resultCopy: document.querySelector("#result-copy"),
  supportCopy: document.querySelector("#support-copy"),
  spotlight: document.querySelector("#spotlight-card"),
  quickGenres: document.querySelector("#quick-genre-row"),
  activeFilters: document.querySelector("#active-filters"),
  surpriseMe: document.querySelector("#surprise-me-btn"),
  resetFilters: document.querySelector("#reset-filters-btn"),
  modal: document.querySelector("#movie-modal"),
  modalBody: document.querySelector("#modal-body"),
  modalClose: document.querySelector("#modal-close"),
  template: document.querySelector("#movie-card-template"),
  movieCount: document.querySelector("#movie-count"),
  genreCount: document.querySelector("#genre-count"),
  ratingCount: document.querySelector("#rating-count")
};

function loadRatings() {
  try {
    return JSON.parse(localStorage.getItem(ratingStorageKey)) || {};
  } catch {
    return {};
  }
}

function saveRatings() {
  localStorage.setItem(ratingStorageKey, JSON.stringify(state.ratings));
}

function getAverageRating(movieId) {
  const userRating = state.ratings[movieId];
  const base = 5.6 + (movieId.length % 7) * 0.37;
  const blended = userRating ? (base * 4 + userRating * 2) / 5 : base;
  return blended.toFixed(1);
}

function createGenres() {
  return [...new Set(movies.flatMap((movie) => movie.genres))].sort();
}

function createYears() {
  return [...new Set(movies.map((movie) => movie.year))].sort((a, b) => b - a);
}

function populateFilters() {
  createGenres().forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    elements.genre.append(option);
  });

  createYears().forEach((year) => {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = year;
    elements.year.append(option);
  });
}

function filteredMovies() {
  const query = state.search.trim().toLowerCase();

  return movies
    .filter((movie) => {
      const matchesSearch =
        !query ||
        movie.title.toLowerCase().includes(query) ||
        movie.director.toLowerCase().includes(query) ||
        movie.genres.join(" ").toLowerCase().includes(query);
      const matchesGenre = state.genre === "all" || movie.genres.includes(state.genre);
      const matchesYear = state.year === "all" || movie.year === Number(state.year);
      return matchesSearch && matchesGenre && matchesYear;
    })
    .sort((a, b) => {
      switch (state.sortBy) {
        case "rating":
          return Number(getAverageRating(b.id)) - Number(getAverageRating(a.id));
        case "latest":
          return b.year - a.year;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return Number(b.featured) - Number(a.featured) || b.year - a.year;
      }
    });
}

function updateStats() {
  elements.movieCount.textContent = String(movies.length);
  elements.genreCount.textContent = String(createGenres().length);
  elements.ratingCount.textContent = String(Object.keys(state.ratings).length);
}

function createStars(movieId, selectedRating) {
  const starRow = document.createElement("div");
  starRow.className = "star-row";

  for (let star = 1; star <= 5; star += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "star-btn";
    button.setAttribute("aria-label", `Rate ${star} star${star > 1 ? "s" : ""}`);
    button.textContent = "★";

    if (star <= selectedRating) {
      button.classList.add("is-active");
    }

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.ratings[movieId] = star;
      saveRatings();
      renderAll();
    });

    starRow.append(button);
  }

  return starRow;
}

function renderActiveFilters() {
  elements.activeFilters.replaceChildren();

  const filters = [];
  if (state.search.trim()) {
    filters.push({ label: `Search: ${state.search.trim()}`, key: "search" });
  }
  if (state.genre !== "all") {
    filters.push({ label: `Genre: ${state.genre}`, key: "genre" });
  }
  if (state.year !== "all") {
    filters.push({ label: `Year: ${state.year}`, key: "year" });
  }
  if (state.sortBy !== "featured") {
    const labels = {
      rating: "Highest rated",
      latest: "Newest",
      title: "Title A-Z"
    };
    filters.push({ label: `Sort: ${labels[state.sortBy]}`, key: "sortBy" });
  }

  filters.forEach((item) => {
    const pill = document.createElement("span");
    pill.className = "active-pill";
    pill.innerHTML = `<span>${item.label}</span>`;

    const clearButton = document.createElement("button");
    clearButton.type = "button";
    clearButton.textContent = "×";
    clearButton.setAttribute("aria-label", `Clear ${item.label}`);
    clearButton.addEventListener("click", () => {
      if (item.key === "search") {
        state.search = "";
        elements.search.value = "";
      }
      if (item.key === "genre") {
        state.genre = "all";
        elements.genre.value = "all";
      }
      if (item.key === "year") {
        state.year = "all";
        elements.year.value = "all";
      }
      if (item.key === "sortBy") {
        state.sortBy = "featured";
        elements.sort.value = "featured";
      }
      renderAll();
    });

    pill.append(clearButton);
    elements.activeFilters.append(pill);
  });
}

function renderQuickGenres() {
  elements.quickGenres.replaceChildren();

  createGenres().forEach((genre) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quick-genre-btn";
    button.textContent = genre;

    if (state.genre === genre) {
      button.classList.add("is-active");
    }

    button.addEventListener("click", () => {
      state.genre = state.genre === genre ? "all" : genre;
      elements.genre.value = state.genre;
      renderAll();
    });

    elements.quickGenres.append(button);
  });
}

function renderMovies() {
  const visibleMovies = filteredMovies();
  elements.grid.replaceChildren();

  if (!visibleMovies.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = "<h3>No matches found</h3><p>Try another search term or switch the filters to reveal more titles.</p>";
    elements.grid.append(empty);
    elements.resultCopy.textContent = "0 movies visible";
    elements.supportCopy.textContent = "No titles match the current filters.";
    return;
  }

  visibleMovies.forEach((movie) => {
    const fragment = elements.template.content.cloneNode(true);
    const hitarea = fragment.querySelector(".card-hitarea");
    const posterFrame = fragment.querySelector(".poster-frame");
    const posterArt = fragment.querySelector(".poster-art");
    const title = fragment.querySelector(".movie-title");
    const meta = fragment.querySelector(".movie-meta");
    const score = fragment.querySelector(".movie-score");
    const year = fragment.querySelector(".movie-year");
    const description = fragment.querySelector(".movie-description");
    const cast = fragment.querySelector(".movie-cast");
    const chipRow = fragment.querySelector(".chip-row");
    const ratingBox = fragment.querySelector(".star-row");
    const trailerButton = fragment.querySelector(".trailer-btn");
    const watchlistButton = fragment.querySelector(".watchlist-btn");
    const detailsButton = fragment.querySelector(".details-btn");

    posterArt.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(0, 0, 0, 0.16)), url(${movie.poster})`;
    posterFrame.dataset.badge = movie.featured ? "Trending" : movie.genres[0];
    title.textContent = movie.title;
    meta.textContent = `${movie.director} • ${movie.duration}`;
    score.textContent = `★ ${getAverageRating(movie.id)}`;
    year.textContent = String(movie.year);
    description.textContent = movie.blurb;
    cast.textContent = `Cast: ${movie.cast.join(", ")}`;
    trailerButton.href = movie.trailer;

    watchlistButton.textContent = state.watchlist.has(movie.id) ? "Saved" : "Watchlist";
    watchlistButton.addEventListener("click", () => {
      if (state.watchlist.has(movie.id)) {
        state.watchlist.delete(movie.id);
      } else {
        state.watchlist.add(movie.id);
      }
      renderAll();
    });

    detailsButton.addEventListener("click", () => openModal(movie.id));
    hitarea.addEventListener("click", () => openModal(movie.id));

    movie.genres.forEach((genre) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = genre;
      chipRow.append(chip);
    });

    ratingBox.replaceWith(createStars(movie.id, state.ratings[movie.id] || 0));
    elements.grid.append(fragment);
  });

  const featuredVisible = visibleMovies.filter((movie) => movie.featured).length;
  elements.resultCopy.textContent = `${visibleMovies.length} movie${visibleMovies.length > 1 ? "s" : ""} visible`;
  elements.supportCopy.textContent = `${featuredVisible} trending pick${featuredVisible === 1 ? "" : "s"} in this view`;
}

function renderSpotlight() {
  const spotlightMovie = [...movies].sort(
    (a, b) => Number(getAverageRating(b.id)) - Number(getAverageRating(a.id))
  )[0];

  elements.spotlight.innerHTML = `
    <div class="spotlight-inner" style="background-image: linear-gradient(180deg, transparent, rgba(13, 18, 48, 0.88)), url(${spotlightMovie.poster});">
      <div class="spotlight-meta">
        <span>${spotlightMovie.genres.join(" • ")}</span>
        <strong>★ ${getAverageRating(spotlightMovie.id)}</strong>
      </div>
      <h3 class="spotlight-title">${spotlightMovie.title}</h3>
      <p class="spotlight-text">${spotlightMovie.description}</p>
    </div>
  `;
}

function openModal(movieId) {
  const movie = movies.find((entry) => entry.id === movieId);
  if (!movie) {
    return;
  }

  elements.modalBody.innerHTML = `
    <div class="modal-poster" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(0, 0, 0, 0.16)), url(${movie.poster});"></div>
    <div>
      <p class="section-tag">Movie details</p>
      <h3 class="modal-title">${movie.title}</h3>
      <p class="modal-description">${movie.description}</p>
      <div class="modal-facts">
        <span><strong>Release:</strong> ${movie.year}</span>
        <span><strong>Runtime:</strong> ${movie.duration}</span>
        <span><strong>Genres:</strong> ${movie.genres.join(", ")}</span>
        <span><strong>Director:</strong> ${movie.director}</span>
      </div>
      <div class="modal-rating"><strong>Cast:</strong> ${movie.cast.join(", ")}</div>
      <div class="modal-rating"><strong>Average rating:</strong> ★ ${getAverageRating(movie.id)}</div>
      <div class="modal-actions">
        <a class="modal-link" href="${movie.trailer}" target="_blank" rel="noreferrer">Watch trailer</a>
        <a class="modal-link secondary" href="#movie-grid">Back to catalog</a>
      </div>
    </div>
  `;

  elements.modal.showModal();
}

function resetFilters() {
  state.search = "";
  state.genre = "all";
  state.year = "all";
  state.sortBy = "featured";
  elements.search.value = "";
  elements.genre.value = "all";
  elements.year.value = "all";
  elements.sort.value = "featured";
}

function renderAll() {
  updateStats();
  renderActiveFilters();
  renderQuickGenres();
  renderMovies();
  renderSpotlight();
}

function bindEvents() {
  elements.search.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderAll();
  });

  elements.genre.addEventListener("change", (event) => {
    state.genre = event.target.value;
    renderAll();
  });

  elements.year.addEventListener("change", (event) => {
    state.year = event.target.value;
    renderAll();
  });

  elements.sort.addEventListener("change", (event) => {
    state.sortBy = event.target.value;
    renderAll();
  });

  elements.resetFilters.addEventListener("click", () => {
    resetFilters();
    renderAll();
  });

  elements.surpriseMe.addEventListener("click", () => {
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    openModal(randomMovie.id);
  });

  elements.modalClose.addEventListener("click", () => elements.modal.close());
  elements.modal.addEventListener("click", (event) => {
    const bounds = elements.modal.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) {
      elements.modal.close();
    }
  });
}

function init() {
  populateFilters();
  bindEvents();
  renderAll();
}

init();

