import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('form');
formRef.addEventListener('submit', onBtnClick);

function onBtnClick(e) {
  e.preventDefault();
  const formEl = e.target.elements;
  let delay = Number(formEl.delay.value);
  let step = Number(formEl.step.value);
  const amountPromises = Number(formEl.amount.value);

  for (let i = 1; i <= amountPromises; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
