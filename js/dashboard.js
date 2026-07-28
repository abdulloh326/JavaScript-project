const api = "https://6a19b0e5489e4715751a62c7.mockapi.io/api/v1/tranzayskiya"
const balansSum = document.querySelector("#balans__sum")
const daromadSum = document.querySelector("#daromad__sum")
const xarajatSum = document.querySelector("#xarajat__sum")
const currentDate = document.querySelector("#current__date")
const content = document.querySelector(".content");

let date = new Date()
let month = [
    "Yan",
    "Fev",
    "Mar",
    "Apr",
    "May",
    "Iyun",
    "Iyul",
    "Avg",
    "Sen",
    "Okt",
    "Noy",
    "Dek",
]
currentDate.textContent = `${month[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`


async function getFetchData(url) {
    let res = await fetch(url)
    res = await res.json()
    let sum = res.reduce((acc, cur) => acc + +cur.narx, 0)
    sum = sum.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "so'm"
    balansSum.textContent = sum
    let sum2 = res.reduce((acc, cur) => (cur.turi ? acc + +cur.narx : acc), 0)
    sum2 = sum2.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "so'm"
    daromadSum.textContent = sum2
    let sum3 = res.reduce((acc, cur) => (cur.turi ? acc : acc + +cur.narx), 0)
    sum3 = sum3.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "so'm"
    xarajatSum.textContent = sum3

    // SONGI TRANZAKSIYALAR
    let lastArr = res.slice(-5)
    content.innerHTML = ""
    lastArr.forEach((obj) => {
        let item = document.createElement("div")
        item.setAttribute("class", "item")
        let left = document.createElement("div")
        left.setAttribute("class", "left")
        let right = document.createElement("div")
        right.setAttribute("class", "right")
        let circle = document.createElement("div")
        circle.setAttribute("class", "circle")
        circle.style.cssText = `
            background-color: ${obj.turi ? "#dcfce7" : "#ffe2e2"};
        `
        let img = document.createElement("img")
        img.setAttribute("src", `../assets/icons/${obj.turi ? "down" : "up"}.svg`)
        circle.append(img)
        let titleBox = document.createElement("div")
        titleBox.setAttribute("class", "title__box")
        let p = document.createElement("p")
        p.textContent = obj.nomi
        let span = document.createElement("span")
        span.textContent = obj.kategoriya
        let p2 = document.createElement("p")
            let sum =  Number(obj.narx).toFixed(1)
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      p2.textContent = `${obj.turi ? "+ " : "- "}${sum}`;
         p2.style.cssText = `
            color: ${obj.turi ? "#00a63e" : "#e7000b"};
        `
        let span2 = document.createElement("span")
        span2.textContent = obj.sana
        titleBox.append(p)
        titleBox.append(span)
        left.append(circle)
        left.append(titleBox)
        right.append(p2)
        right.append(span2)
        item.append(left)
        item.append(right)
        content.append(item)
    });
}
getFetchData(api)
