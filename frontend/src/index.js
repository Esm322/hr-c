import style from './assets/styles/main.scss';
import hr from './assets/img/hr.svg';
import favicon from './assets/img/favicon.svg';
import checkmarkSVG from './assets/img/checkmark.svg';
import robot from './robots.txt';
import sitemap from './sitemap.xml';
import favi from './assets/img/favicon.ico'

const URL = 'https://api.hr-consultingkrd.ru/feedback';

const burgerBtn = document.querySelector('.menu__btn');
const burgerWrapper = document.querySelector('.hamburger-menu');
const burgerLinks = document.querySelectorAll('.menu__item');
const stickyTitles = document.querySelectorAll('.sticky');
const form = document.querySelector('.form');
const checkmark = document.querySelector('.contacts__checkmark-text');
const inputs = document.querySelectorAll('.contacts__input');
const textarea = document.querySelector('.contacts__textarea');

window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    stickyTitles.forEach((title) => title.classList.remove('sticky'));

    burgerBtn.addEventListener('click', () => {
      burgerWrapper.classList.toggle('burger--active')

      if (burgerWrapper.classList.contains('burger--active')) {
        document.body.classList.add('overflow--off');
      } else {
        document.body.classList.remove('overflow--off');
      }
    })

    burgerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        document.body.classList.remove('overflow--off');
        document.body.classList.add('overflow--off');
      })
    })
  }
})

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

const resetForm = () => {
  inputs.forEach((input) => input.value = '');

  textarea.value = '';
}

const resetChekmark = () => {
  setTimeout(() => checkmark.classList.remove('checkmark--active'), 3000);
}

const postEmail = async (url, fullname, companyName, email, phone, description) => {
  try {
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fullname, companyName, email, phone, description }),
    });

    if (response.status === 200) {
      checkmark.classList.add('checkmark--active');
      resetChekmark();
      resetForm();
    }

    return response;
  } catch (error) {
    return error;
  }
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
