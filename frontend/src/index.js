import style from './assets/styles/main.scss';
import hr from './assets/img/hr.svg';
import favicon from './assets/img/favicon.svg';

window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth < 992) {
    stickyTitles.forEach((title) => title.classList.remove('sticky'))
  }
})

const URL = 'http://87.228.36.135/api/feedback';

const stickyTitles = document.querySelectorAll('.sticky');
const form = document.querySelector('.form');
const inputs = document.querySelectorAll('.contacts__input');

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (input.value.length <= 0) {
      input.classList.add('unfilled')
    } else {
      input.classList.remove('unfilled')
    }

    if (input.name === 'fullname') {
      input.value = input.value.replace(/[^а-яёА-ЯЁ-\s]/g, '')
    }

    if (input.name === 'phone') {
      input.value = input.value.replace(/[^+\d]+/g, '')
    }
  })
})

const postEmail = async (url, fullname, companyName, email, phone, description) => {
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fullname, companyName, email, phone, description }),
  });

  return response;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const feedback = new FormData(event.target);

  const fullname = feedback.get('fullname');
  const companyName = feedback.get('company');
  const email = feedback.get('email');
  const phone = feedback.get('phone');
  const description = feedback.get('description');

  postEmail(URL, fullname, companyName, email, phone, description);
})
