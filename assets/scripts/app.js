const startAddMovieBtn = document.getElementById("start-add-movie");
const addMovieModal = document.getElementById("add-modal");
const searchMovieBtn = document.getElementById("search-btn");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieBtn = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieBtn = addMovieModal.querySelector(".btn--success");
const userInputs = addMovieModal.querySelectorAll("input");
const movies = [];
const filteredMovies = [];
const entryText = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");
const cancelDeleteMovieBtn = deleteMovieModal.querySelector(".btn--passive");
let confirmDeleteMovieBtn = deleteMovieModal.querySelector(".btn--danger");
const movieListRoot = document.getElementById("movie-list");

const updateUi = () => {
  if (movies.length > 0) {
    entryText.style.display = "none";
  } else {
    entryText.style.display = "block";
  }
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const movieListRoot = document.getElementById("movie-list");
  movieListRoot.children[movieIndex].remove();
  closeMovieDeletionModal();
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
  updateUi();
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();

  cancelDeleteMovieBtn.removeEventListener("click", closeMovieDeletionModal);
  cancelDeleteMovieBtn.addEventListener("click", closeMovieDeletionModal);

  confirmDeleteMovieBtn.replaceWith(confirmDeleteMovieBtn.cloneNode(true));
  confirmDeleteMovieBtn = deleteMovieModal.querySelector(".btn--danger");
  confirmDeleteMovieBtn.addEventListener(
    "click",
    deleteMovie.bind(null, movieId)
  );
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.id = id;
  newMovieElement.innerHTML = `
    <div class = "movie-element__image">
    <img src = "${imageUrl}" alt ${title}>
    </div>
    <div class = "movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/ 5 stars</p>
    </div>
    `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  movieListRoot.append(newMovieElement);
};

const renderFilteredMovies = () => {
  const filterInputValue = document
    .getElementById("filter-title")
    .value.toLowerCase();
  const filteredMovie = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filterInputValue)
  );
  if (filterInputValue.trim() === "" || filteredMovie.length < 1) {
    movieListRoot.innerHTML = "";
    movies.forEach((movie) =>
      renderNewMovieElement(movie.id, movie.title, movie.image, movie.rating)
    );
  } else {
    movieListRoot.innerHTML = "";
    filteredMovie.forEach((movie) => {
      renderNewMovieElement(movie.id, movie.title, movie.image, movie.rating);
    });
  }
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
  addMovieModal.classList.toggle("visible");
  toggleBackdrop();
};

const clearMovieInput = () => {
  for (usrInput of userInputs) {
    usrInput.value = "";
  } // For of loop used to loop trough array or we can use FOR loop like below

  /*  for(let i = 0; i < userInputs.length; i++){
        userInputs[i].value = '';
    } */
};

const cancelAddMoviHandler = () => {
  closeMovieModal();
  clearMovieInput();
  toggleBackdrop();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  const filterInput = document.getElementById("filter-title").value.toString();

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert(
      "Please enter valid values (Movie title, image url and rating between 1 and 5)."
    );
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
  updateUi();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
};
const backdropClickHandler = () => {
  closeMovieModal();
  clearMovieInput();
  closeMovieDeletionModal();
};

startAddMovieBtn.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieBtn.addEventListener("click", cancelAddMoviHandler);
confirmAddMovieBtn.addEventListener("click", addMovieHandler);
searchMovieBtn.addEventListener("click", renderFilteredMovies);
