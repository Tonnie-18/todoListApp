let task = document.getElementById('task');
const items = document.getElementById('toDoItems');
//fuuefg

//theme and transitions
document.querySelector(".icons").addEventListener("click", ()=>{
    document.querySelector(".light-logo").classList.toggle("animate-light");
    document.querySelector(".dark-logo").classList.toggle("animate-dark");
    document.querySelector(".container").classList.toggle("lightBackground");
    document.querySelector(".name").classList.toggle("nameColor");
    document.getElementById("task").classList.toggle("inputBackground");
    document.querySelector(".nav").classList.toggle("navColor");
    document.querySelector(".list").classList.toggle(".itemColor");
  });

//classes
const CHECK = 'bi-check-circle-fill';
const UNCHECK = 'bi bi-circle';
const LINE_THROUGH = 'lineThrough';


let id;
let LIST = [];

//Get item from local storage

let data = localStorage.getItem('TODO');
//check if there is no data in our local storage
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}

//load list to the user interface
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;

    const LINE = done ? LINE_THROUGH : '';

    const text = `<li class= "item">
                    <i class="bi${DONE}" job="complete" id="${id}"></i>
                    <p class="text ${LINE}" >${toDo}</p>
                    <i class="bi bi-trash3" job="delete" id ="${id}"></i>
                </li>`;

    const position = 'beforeend';

    items.insertAdjacentHTML(position, text);
}

//adding item to the list when user clicks the plus icon
function appendToDo(){
    const toDo=task.value;
    if(toDo){
      addToDo(toDo , id,false, false);
      LIST.push({
        name:toDo,
        id:id,
        done:false,
        trash:false
      });
      //add Item to local storage
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    task.value="";
};
//adding item to the list when user clicks enter

document.addEventListener('keyup', function (event) {
    if (event.keyCode == 13) {
        const toDo = task.value;
        //if the input isnt empty
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            });
            //add Item to local storage and update list
            localStorage.setItem('TODO', JSON.stringify(LIST));

            id++;
        }
        task.value = '';
    }
});

//complete  to do

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classlist.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove from the todo

function removerToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//complete or incomplete

items.addEventListener('click', function (event) {
    const element = event.target;
    const elementTask = element.attributes.job.value;

    if (elementTask == 'complete') {
        completeToDo(element);
    } else if (elementTask == 'delete') {
        removerToDo(element);
    }
    //add Item to local storage and update list
    localStorage.setItem('TODO', JSON.stringify(LIST));
});
