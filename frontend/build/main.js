/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/assets/img/hr.svg
const hr_namespaceObject = __webpack_require__.p + "./assets/img/hr.svg";
;// CONCATENATED MODULE: ./src/assets/img/favicon.svg
const favicon_namespaceObject = __webpack_require__.p + "./assets/img/favicon.svg";
;// CONCATENATED MODULE: ./src/assets/img/checkmark.svg
const checkmark_namespaceObject = __webpack_require__.p + "./assets/img/checkmark.svg";
;// CONCATENATED MODULE: ./src/robots.txt
const robots_namespaceObject = __webpack_require__.p + "robots.txt";
;// CONCATENATED MODULE: ./src/sitemap.xml
const sitemap_namespaceObject = __webpack_require__.p + "sitemap.xml";
;// CONCATENATED MODULE: ./src/index.js







const URL = 'https://api.hr-consultingkrd.ru/feedback';

const burgerBtn = document.querySelector('.menu__btn');
const burgerWrapper = document.querySelector('.hamburger-menu');
const burgerLinks = document.querySelectorAll('.menu__item');
const stickyTitles = document.querySelectorAll('.sticky');
const src_form = document.querySelector('.form');
const checkmark = document.querySelector('.contacts__checkmark-text');
const inputs = document.querySelectorAll('.contacts__input');
const src_textarea = document.querySelector('.contacts__textarea');

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

  src_textarea.value = '';
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

src_form.addEventListener('submit', (event) => {
  event.preventDefault();

  const feedback = new FormData(event.target);

  const fullname = feedback.get('fullname');
  const companyName = feedback.get('company');
  const email = feedback.get('email');
  const phone = feedback.get('phone');
  const description = feedback.get('description');

  postEmail(URL, fullname, companyName, email, phone, description);
})

/******/ })()
;