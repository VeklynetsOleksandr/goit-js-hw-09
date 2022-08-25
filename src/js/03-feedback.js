import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

initialForm();

formRef.addEventListener('input', throttle(onInput, 500));
formRef.addEventListener('submit', onSubmit);

function onInput() {
  const formData = new FormData(formRef);
  let userForm = {};
  formData.forEach((value, name) => (userForm[name] = value));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userForm));
}

function initialForm() {
  let persistedForm = localStorage.getItem(STORAGE_KEY);
  if (persistedForm) {
    persistedForm = JSON.parse(persistedForm);
    console.log(persistedForm);
    Object.entries(persistedForm).forEach(([name, value]) => {
      formRef.elements[name].value = value;
    });
  }
}

function onSubmit(evt) {
  evt.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  let userForm = {};
  const formData = new FormData(formRef);
  formData.forEach((value, name) => (userForm[name] = value));
  console.log(userForm);
  formRef.reset();
}
