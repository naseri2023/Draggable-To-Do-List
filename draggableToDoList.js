let addElem = document.getElementById("add_btn")
let modalElem = document.getElementsByClassName("modal")[0]
let inputElem = document.getElementById("todo_input")
let submitElem = document.getElementById("todo_submit")
let noStatus = document.getElementById("no_status")
let closeBtn = document.getElementsByClassName("btn close-modal")[0]
let statusClass = document.querySelectorAll(".status")

//نمایش مودال برای اضافه کردن آیتم جدید
function addButton() {
    modalElem.classList.add("active")
    inputElem.focus()   // فوکوس به input
    inputElem.value = ""
}

// اضافه کردن آیتم جدید به لیست
function submitButton() {
    let divElem = document.createElement("div")
    const spanElem = document.createElement("span")

    divElem.className = "todo"
    divElem.draggable = true
    divElem.textContent = inputElem.value
    divElem.id = "todo-" + Date.now();

    // رویداد dragstart
    divElem.ondragstart = function (event) {
        event.dataTransfer.setData("elemId", event.target.id)}

    inputElem.value = ""

     // دکمه بستن
    spanElem.className = "close"
    spanElem.innerHTML = '&times;';

    // افزودن دکمه به div
    divElem.appendChild(spanElem)
    noStatus.appendChild(divElem)

    // بستن مودال
    modalElem.classList.remove("active")

    // حذف آیتم با کلیک روی ضربدر
    spanElem.addEventListener("click",function() {
    divElem.remove()
})

}

statusClass.forEach(function (items) {
    items.addEventListener("drop",function (event) {
        event.preventDefault()

        let targetId = event.dataTransfer.getData("elemId")
        let targetElem = document.getElementById(targetId)

        event.target.appendChild(targetElem)
})
    items.addEventListener("dragover",function (event) {
        event.preventDefault()
})
})

function closeEvent() {
    modalElem.classList.remove("active")
}

// بستن و تایید مودال
function keyClose(event) {
    if(event.key === "Escape")
        modalElem.classList.remove("active")
    if (event.key === "Enter")
        submitButton()
}

// افزودن رویدادها
addElem.addEventListener("click",addButton)
submitElem.addEventListener("click",submitButton)
closeBtn.addEventListener("click",closeEvent)
document.addEventListener("keydown",keyClose)

