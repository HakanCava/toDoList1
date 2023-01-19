const addInput = document.getElementById("input");

const btn = document.getElementById("btn");

const ul = document.querySelector(".ul-task");

//!===========Local Storage===================
let localList = JSON.parse(localStorage.getItem("localList")) || [];

window.addEventListener("load", () => getTodoListFromLocalStorage());

const getTodoListFromLocalStorage = () => {
  localList.forEach((e) => createList(e));
};
//!============================================

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (addInput.value.trim() === "") {
    alert("please enter something");
    return;
  }
  const newItem = {
    id: new Date().getTime(),
    completed: false,
    text: addInput.value,
  };

  createList(newItem);

  localList.push(newItem)

  localStorage.setItem("localList", JSON.stringify(localList));

  e.target.closest("form").reset();
});

const createList = (newItem) => {
  const { id, completed, text } = newItem;

  const li = document.createElement("li");
  li.setAttribute("id", id);

  completed ? li.classList.add("checked") : "";

  const iconSqr = document.createElement("i");
  iconSqr.setAttribute("class", "fa-regular fa-square");

  li.append(iconSqr);

  const p = document.createElement("p");
  p.innerText = text;

  li.append(p);

  const iconX = document.createElement("i");
  iconX.setAttribute("class", "fa-solid fa-xmark");
  li.append(iconX);

  ul.append(li);
};

ul.addEventListener("click", (e) => {
  const idAtrr = e.target.closest("li").getAttribute("id");

  if (e.target.classList.contains("fa-square")) {
    e.target.parentElement.classList.toggle("checked");
    localList.map((x) => {
      if (x.id == idAtrr) {
        x.completed = !x.completed;
      }
    });
  } else if (e.target.classList.contains("fa-xmark")) {
    e.target.parentElement.remove();

    localList=localList.filter((x) => x.id != idAtrr);
    localStorage.setItem("localList", JSON.stringify(localList));
  }
});
