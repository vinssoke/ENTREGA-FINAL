function initMobileNav() {
  const nav_Toggle = document.getElementById('nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (!nav_Toggle || !navList) {
    return;
  }

  nav_Toggle.addEventListener('click', () => {
    const isExpanded = nav_Toggle.getAttribute('aria-expanded');

    if (isExpanded === 'true') {
      nav_Toggle.setAttribute('aria-expanded', 'false');
      navList.classList.remove('show');
    } else {
      nav_Toggle.setAttribute('aria-expanded', 'true');
      navList.classList.add('show');
    }
  });
}

function initAccordion() {
  const toggle = document.querySelector('.accordion-toggle');
  const panel = document.querySelector('.accordion-panel');

  if (!toggle || !panel) {
    return;
  }

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded');

    if (isExpanded === 'true') {
      toggle.setAttribute('aria-expanded', 'false');
      panel.style.maxHeight = '0';
    } else {
      toggle.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
}

function displayGames() {
  const gamesListContainer = document.getElementById('crud-list');
  if (!gamesListContainer) {
    return;
  }

  let games = JSON.parse(localStorage.getItem('games'));

  if (games === null) {
    games = [];
  }

  if (games.length === 0) {
    gamesListContainer.innerHTML = '<p>Aún no hay reseñas. ¡Sé el primero!</p>';
    return;
  }

  gamesListContainer.innerHTML = '';

  for (const game of games) {
    const gameElement = document.createElement('article');
    gameElement.className = 'game-item';

    const titleElement = document.createElement('h4');
    titleElement.textContent = game.title;

    const reviewElement = document.createElement('p');
    reviewElement.textContent = game.review;

    gameElement.appendChild(titleElement);
    gameElement.appendChild(reviewElement);

    gamesListContainer.appendChild(gameElement);
  }
}

function addGame(event) {
  event.preventDefault();

  const titleInput = document.getElementById('crud-title');
  const reviewInput = document.getElementById('crud-review');
  const errorTitle = document.getElementById('error-crud-title');
  const errorReview = document.getElementById('error-crud-review');

  let isValid = true;

  errorTitle.textContent = '';
  errorReview.textContent = '';

  if (titleInput.value.trim() === '') {
    errorTitle.textContent = 'El título del juego es obligatorio';
    isValid = false;
  }

  if (reviewInput.value.trim().length < 5) {
    errorReview.textContent = 'La reseña debe tener al menos 5 caracteres';
    isValid = false;
  }

  if (isValid) {
    let games = JSON.parse(localStorage.getItem('games'));
    if (games === null) {
      games = [];
    }

    const newGame = {
      title: titleInput.value.trim(),
      review: reviewInput.value.trim()
    };

    games.push(newGame);

    localStorage.setItem('games', JSON.stringify(games));

    titleInput.value = '';
    reviewInput.value = '';

    displayGames();
  }
}

function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) {
    return;
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const errorName = document.getElementById('error-name');
    const errorEmail = document.getElementById('error-email');
    const errorSubject = document.getElementById('error-subject');
    const errorMessage = document.getElementById('error-message');

    let isValid = true;

    errorName.textContent = '';
    errorEmail.textContent = '';
    errorSubject.textContent = '';
    errorMessage.textContent = '';

    if (nameInput.value.trim() === '') {
      errorName.textContent = 'El nombre es obligatorio';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      errorEmail.textContent = 'Email no válido';
      isValid = false;
    }

    if (subjectInput.value.trim() === '') {
      errorSubject.textContent = 'El asunto es obligatorio';
      isValid = false;
    }

    if (messageInput.value.trim().length < 10) {
      errorMessage.textContent = 'El mensaje debe tener al menos 10 caracteres';
      isValid = false;
    }

   if (isValid) {

    let formData = JSON.parse(localStorage.getItem("formData"));
    if (formData === null) formData = [];

    const newEntry = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim()
    };

    formData.push(newEntry);

    localStorage.setItem("formData", JSON.stringify(formData));

    window.location.href = "validation.html";
}

  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initAccordion();
  initContactForm();

  const crudForm = document.getElementById('crud-form');
  if (crudForm) {
    crudForm.addEventListener('submit', addGame);
  }

  displayGames();
});