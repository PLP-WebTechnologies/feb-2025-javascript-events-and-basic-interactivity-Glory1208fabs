// Event Handling
const clickBtn = document.getElementById('click-btn');
clickBtn.addEventListener('click', () => {
  alert('Button clicked! 🎉');
});

const hoverBox = document.getElementById('hover-box');
hoverBox.addEventListener('mouseenter', () => {
  hoverBox.classList.add('hovered');
});
hoverBox.addEventListener('mouseleave', () => {
  hoverBox.classList.remove('hovered');
});

const keyOutput = document.getElementById('key-press-output');
window.addEventListener('keydown', (e) => {
  keyOutput.textContent = `You pressed: "${e.key}" (KeyCode: ${e.keyCode || e.which})`;
});

const secretBtn = document.getElementById('secret-btn');
const secretMessage = document.getElementById('secret-message');
let longPressTimer;

secretBtn.addEventListener('dblclick', () => {
  secretMessage.classList.add('visible');
  setTimeout(() => secretMessage.classList.remove('visible'), 3000);
});

secretBtn.addEventListener('mousedown', () => {
  longPressTimer = setTimeout(() => {
    secretMessage.classList.add('visible');
    setTimeout(() => secretMessage.classList.remove('visible'), 3000);
  }, 1200);
});

secretBtn.addEventListener('mouseup', () => {
  clearTimeout(longPressTimer);
});

secretBtn.addEventListener('mouseleave', () => {
  clearTimeout(longPressTimer);
});

// Interactive Elements
const colorTextBtn = document.getElementById('color-text-btn');
let toggle = true;
colorTextBtn.addEventListener('click', () => {
  if (toggle) {
    colorTextBtn.textContent = "I've Changed!";
    colorTextBtn.style.backgroundColor = '#e91e63';
  } else {
    colorTextBtn.textContent = 'Change my Text or Color';
    colorTextBtn.style.backgroundColor = '#0077cc';
  }
  toggle = !toggle;
});

const images = [
  'https://via.placeholder.com/350x200?text=Image+1',
  'https://via.placeholder.com/350x200?text=Image+2',
  'https://via.placeholder.com/350x200?text=Image+3',
  'https://via.placeholder.com/350x200?text=Image+4'
];
let imgIndex = 0;
const galleryImg = document.getElementById('gallery-image');
const prevBtn = document.getElementById('prev-image');
const nextBtn = document.getElementById('next-image');

function updateGalleryImage() {
  galleryImg.src = images[imgIndex];
  galleryImg.alt = `Gallery Image ${imgIndex + 1}`;
}
prevBtn.addEventListener('click', () => {
  imgIndex = (imgIndex - 1 + images.length) % images.length;
  updateGalleryImage();
});
nextBtn.addEventListener('click', () => {
  imgIndex = (imgIndex + 1) % images.length;
  updateGalleryImage();
});

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = btn.getAttribute('data-tab');

    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    tabContents.forEach(content => {
      if (content.id === 'tab-content-' + targetTab) {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    });
  });
});

// Form Validation
const form = document.getElementById('registration-form');

function showError(input, message) {
  const error = document.getElementById(`${input.id}-error`);
  error.textContent = message;
  error.classList.add('visible');
  input.classList.add('invalid');
}

function clearError(input) {
  const error = document.getElementById(`${input.id}-error`);
  error.classList.remove('visible');
  input.classList.remove('invalid');
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

form.name.addEventListener('input', () => {
  if (form.name.value.trim() === '') {
    showError(form.name, 'Name is required');
  } else {
    clearError(form.name);
  }
});

form.email.addEventListener('input', () => {
  if (form.email.value.trim() === '') {
    showError(form.email, 'Email is required');
  } else if (!validateEmail(form.email.value.trim())) {
    showError(form.email, 'Please enter a valid email');
  } else {
    clearError(form.email);
  }
});

form.password.addEventListener('input', () => {
  if (form.password.value.length < 8) {
    showError(form.password, 'Password must be at least 8 characters');
  } else {
    clearError(form.password);
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  if (form.name.value.trim() === '') {
    showError(form.name, 'Name is required');
    valid = false;
  }
  if (form.email.value.trim() === '') {
    showError(form.email, 'Email is required');
    valid = false;
  } else if (!validateEmail(form.email.value.trim())) {
    showError(form.email, 'Please enter a valid email');
    valid = false;
  }
  if (form.password.value.length < 8) {
    showError(form.password, 'Password must be at least 8 characters');
    valid = false;
  }

  if (valid) {
    alert('Registration successful! 🎉');
    form.reset();
    [form.name, form.email, form.password].forEach(input => clearError(input));
  }
});