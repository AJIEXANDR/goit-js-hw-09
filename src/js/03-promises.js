import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', createPromiseBtn);

function createPromiseBtn(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  createPromise(amount.value, delay.value)
    .then(resolve => {
      Notiflix.Notify.success(resolve);
    })
    .catch(error => {
      Notiflix.Notify.failure(error);
    });
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
