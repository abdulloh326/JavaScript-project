const api = "https://6a19b0e5489e4715751a62c7.mockapi.io/api/v1/tranzayskiya";
const add = document.querySelector("#add");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const blur = document.querySelector(".blur");
const cencel = document.querySelector("#cencel");
const xarajat = document.querySelector(".xarajat");
const daromad = document.querySelector(".daromad");
const qoshish = document.querySelector("#qoshish");
const content = document.querySelector(".content");
const saerch = document.querySelector(".saerch");
const btns = document.querySelector(".btns").children;
const nomi = document.getElementsByName("nomi")[0];
const narx = document.getElementsByName("narx")[0];
const kategoriya = document.getElementsByName("kategoriya")[0];
const sana = document.getElementsByName("sana")[0];

// Bu data shu yerda turishi kerak
let obj = {
  nomi: "",
  narx: "",
  kategoriya: "",
  sana: "",
  turi: false,
};
// Bu data shu yerda turishi kerak

async function createTranzaction(id) {
  if (id) {
    try {
      let res = await fetch(`${api}/${id}`);
      res = await res.json();
      delete res.id;
      obj = res;
      modal.style.cssText = `
      visibility: visible;
  `;
      blur.style.cssText = `
      visibility: visible;  `;
      qoshish.textContent = "Taxrirlash";
      qoshish.setAttribute("id", id);

      nomi.value = res.nomi;
      narx.value = res.narx;
      kategoriya.value = res.kategoriya;
      sana.value = res.sana;
      if (res.turi) {
        daromad.style.cssText = `
          border: 1px solid #00A63E;
      `;
        xarajat.style.cssText = `
          border: 1px solid #0000001A;
      `;
      } else {
        xarajat.style.cssText = `border: 1px solid #E7000B;
  `;
        daromad.style.cssText = `border: 1px solid #0000001A;
  `;
      }
    } catch (error) {
      alert(error.message);
    }
  } else {
    modal.style.cssText = `
      visibility: visible;
  `;
    blur.style.cssText = `
      visibility: visible;
  `;
  }
}

add.addEventListener("click", function () {
  qoshish.textContent = "Qoshish";
  qoshish.removeAttribute("id");
  nomi.value = "";
  narx.value = "";
  kategoriya.value = "";
  sana.value = "";

  xarajat.style.cssText = `border: 1px solid #0000001A`;
  daromad.style.cssText = `border: 1px solid #0000001A`;

  createTranzaction();
});

function closeModal() {
  modal.style.cssText = `
    visibility: hidden;
  `;
  blur.style.cssText = `
    visibility: hidden;
  `;
}

close.addEventListener("click", function () {
  closeModal();
});
cencel.addEventListener("click", function () {
  closeModal();
});

xarajat.addEventListener("click", function () {
  xarajat.style.cssText = `
    border: 1px solid #E7000B;
  `;
  daromad.style.cssText = `
    border: 1px solid #0000001A;
  `;
  obj.turi = false;
});
daromad.addEventListener("click", function () {
  xarajat.style.cssText = `
    border: 1px solid #0000001A;
  `;
  daromad.style.cssText = `
    border: 1px solid #00A63E;
  `;
  obj.turi = true;
});

function getInputValue(e) {
  let key = e.getAttribute("name");
  let value = e.value;
  obj[key] = value;
}

qoshish.addEventListener("click", function () {
  let attr = qoshish.getAttribute("id");
  let arr = Object.values(obj);
  let isChecked = arr.every((v) => `${v}`);
  if (attr) {
    if (isChecked) {
      fetch(`${api}/${attr}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            alert("Ma'lumot ozgartirildi.");
            closeModal();
            createUI();
          } else alert("Ma'lumot ozgartirilmadi.");
        })
        .catch((error) => alert(error.message));
    }
  } else {
    if (isChecked) {
      fetch(api, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            alert("Ma'lumot qo'shildi.");
            closeModal();
            createUI();
          } else alert("Ma'lumot qo'shilmadi.");
        })
        .catch((error) => alert(error.message));
    }
  }
});

// CREATE_Ui -action
async function createUI(value) {
  let res = await fetch(api);
  res = await res.json();
  if (typeof value === "string") {
    res = res.filter((obj) =>
      obj.nomi.toLowerCase().includes(value.toLowerCase()),
    );
  } else if (typeof value === "boolean") {
    saerch.value = "";
    if (value) {
      res = res.filter((obj) => obj.turi);
    } else {
      res = res.filter((obj) => !obj.turi);
    }
  } else saerch.value = "";
  content.innerHTML = "";
  res.forEach((obj) => {
    let item = document.createElement("div");
    item.setAttribute("class", "item");
    let left = document.createElement("div");
    left.setAttribute("class", "left");
    let right = document.createElement("div");
    right.setAttribute("class", "right");
    item.append(left);
    item.append(right);

    let circle = document.createElement("div");
    circle.setAttribute("class", "circle");
    circle.style.cssText = `background-color: ${obj.turi ? "#dcfce7" : "#ffe2e2"}`;
    let up = document.createElement("img");
    up.setAttribute("src", "../assets/icons/up.svg");
    let down = document.createElement("img");
    down.setAttribute("src", "../assets/icons/down.svg");
    obj.turi ? circle.append(down) : circle.append(up);
    let titleBox = document.createElement("div");
    titleBox.setAttribute("class", "title__box");
    let p = document.createElement("p");
    p.textContent = obj.nomi;
    let span = document.createElement("span");
    let date = document.createElement("img");
    date.setAttribute("src", "../assets/icons/date.svg");
    span.append(obj.kategoriya);
    span.append(" • ");
    span.append(date);
    span.append(obj.sana);
    titleBox.append(p);
    titleBox.append(span);
    left.append(circle);
    left.append(titleBox);

    let p2 = document.createElement("p");
    let sum = Number(obj.narx)
      .toFixed(1)
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    p2.textContent = `${obj.turi ? "+ " : "- "}${sum}`;
    p2.style.cssText = `color: ${obj.turi ? "#00a63e" : "#e7000b"}`;
    let action = document.createElement("div");
    action.setAttribute("class", "action");
    let edit = document.createElement("img");
    edit.addEventListener("click", () => editAction(obj.id));
    edit.setAttribute("src", "../assets/icons/edit.svg");
    let del = document.createElement("img");
    del.setAttribute("src", "../assets/icons/del.svg");
    del.addEventListener("click", () => delAction(obj.id));
    action.append(edit);
    action.append(del);
    right.append(p2);
    right.append(action);

    content.append(item);
  });
}
createUI();

async function editAction(id) {
  createTranzaction(id);
}

// DELETE - action
async function delAction(id) {
  if (id) {
    let ok = confirm("Rostdanham ham ochirilsinmi?");
    if (ok) {
      try {
        let res = await fetch(`${api}/${id}`, { method: "DELETE" });
        if (res.status >= 200 && res.status < 300) {
          alert("ochirildi");
          createUI();
        }
      } catch (error) {
        alert(error.message);
      }
    }
  }
}

saerch.addEventListener("input", function (e) {
  let value = e.target.value;
  createUI(value);
});

btns[0].addEventListener("click", function () {
  createUI();
});

btns[1].addEventListener("click", function () {
  createUI(true);
});
btns[2].addEventListener("click", function () {
  createUI(false);
});
