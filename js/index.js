const email = document.querySelector("#email");
const parol = document.querySelector("#parol");
const button = document.querySelector("button");
const eye = document.querySelector(".eye");
const eyeSlash = document.querySelector(".eye__slash");
const api = "https://6a19b0e5489e4715751a62c7.mockapi.io/api/v1/REGISTAR";

eye.addEventListener("click", function () {
  eye.style.cssText = `
    display: none;
  `;
  eyeSlash.style.cssText = `
    display: block;
  `;
  parol.type = "password";
});

eyeSlash.addEventListener("click", function () {
  eye.style.cssText = `
    display: block;
  `;
  eyeSlash.style.cssText = `
    display: none;
  `;
  parol.type = "text";
});

email.addEventListener("blur", function (e) {
  let value = e.target.value;
  if (value) {
    email.style.cssText = `
      border: 1px solid rgba(0, 0, 0, 0.1);
    `;
  } else {
    email.style.cssText = `
      border: 1px solid #da3633;
    `;
  }

  checkEmail(e);
});

parol.addEventListener("blur", function (e) {
  let value = e.target.value;
  if (value) {
    parol.style.cssText = `
      border: 1px solid rgba(0, 0, 0, 0.1);
    `;
  } else {
    parol.style.cssText = `
      border: 1px solid #da3633;
    `;
  }

  checkParol(e);
});

function checkEmail(e) {
  let value = e.target.value;
  let isCheckGmail =
    value.endsWith("@gmail.com") || value.endsWith("@yandex.ru");
  let startValue = value.split("@")[0];
  let isCheckLength = startValue.length >= 5;
  let isCheckLowerCase = startValue
    .split("")
    .every((v) => v === v.toLowerCase());

  if (isCheckGmail && isCheckLength && isCheckLowerCase) {
    email.style.cssText = `
      border: 1px solid #238636;
    `;
  } else {
    email.style.cssText = `
      border: 1px solid #da3633;
    `;
  }
}

function checkParol(e) {
  let value = e.target.value;
  let isCheckLength = value.length >= 8;
  let isCheckUpperCase = value
    .split("")
    .some((v) => v === v.toUpperCase() && v !== v.toLowerCase());
  let isCheckLowerCase = value
    .split("")
    .some((v) => v === v.toLowerCase() && v !== v.toUpperCase());
  let isCheckNumber = value.split("").some((v) => Number.isInteger(+v));

  if (isCheckLength && isCheckUpperCase && isCheckLowerCase && isCheckNumber) {
    parol.style.cssText = `
      border: 1px solid #238636;
    `;
  } else {
    parol.style.cssText = `
      border: 1px solid #da3633;
    `;
  }
}

email.addEventListener("input", function (e) {
  checkEmail(e);
});

parol.addEventListener("input", function (e) {
  checkParol(e);
});

button.addEventListener("click", function (e) {
  e.preventDefault();
  let emailCheck = email.getAttribute("style").endsWith("rgb(35, 134, 54);");
  let parolCheck = parol.getAttribute("style").endsWith("rgb(35, 134, 54);");
  if (emailCheck && parolCheck) {
    fetch(api)
      .then((res) => res.json())
      .then((res) => {
        let obj = res.find(
          (obj) => obj.email === email.value && obj.parol === parol.value,
        );
        if (obj) {
          window.location.href = "./dashboard.html";
        } else alert("❗️Foydalanuvchi topilmadi.");
      });
  } else alert("❗️Ma'lumotni noto'g'ri to'ldirmoqdasiz.");
});
