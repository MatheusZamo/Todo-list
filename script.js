const inputAdd = document.querySelector('#inputAdd');
const btnAddTask = document.querySelector('#addTask');
const ulTasks = document.querySelector('#tasks');
const boxPopup = document.querySelector('.box-popup');
const newTask = document.querySelector('#new-task')

// CREATE
//Criando um localStorage
const storage = JSON.parse(localStorage.getItem('tasks'));
//Definindo um ternario para o localStorage
let tasks = localStorage.getItem('tasks') !== null ? storage : [];
function addTaskHTML(task){
  //Cria o conteudo que será adicionado no DOM
  let createLi = document.createElement('li');
  createLi.classList.add('task');
  createLi.innerHTML += `
    <input type="checkbox"class='checkbox'>
    <span class='taskName'>${task.name}</span>
    <button onClick='removeTask(${task.id})'>x</button>
    <button onClick ='edition(${task.id})'>Editar</button>
  `;
  ulTasks.append(createLi);
}
//READ
function init(){
  //Para cada tarefa adicionada no localStorage
  //a função addTaskHTML e executada 
    ulTasks.innerHTML = '';
    tasks.forEach(addTaskHTML);
}
init();

//UPDATE
function edition(ID){
  tasks.filter(task => task.id == ID)
 boxPopup.style.display = 'block'
}
boxPopup.addEventListener('click', event => {
  const classNameOfClicked = event.target.classList[0];
  const classNames = ['box-popup','btn-close','btn-confirm']
  const closePopup = classNames.some(className => className === classNameOfClicked)
  if(closePopup){
    if(classNameOfClicked === 'btn-confirm'){
      if(newTask.value === ''){
        console.log('E preciso editar')
        return
      }
      console.log(newTask.value)
    }
    boxPopup.style.display = 'none';
  }
})


function updateStorage(){     
  //Adiciona um novo valor no localStorage    
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//DELETE
function removeTask(ID){
  //filtra as task que não foram clikadas
  tasks = tasks.filter(task => task.id !== ID);
  updateStorage();
  init();
}
function generateId(){
  //Gera um id aleatorio 
  return Math.floor(Math.random()*1000);
 };

 
btnAddTask.addEventListener('click',() =>{
 //criando um objeto task
  const task = {
    id: generateId(),
    name : inputAdd.value
  }
  //Adiciona um objeto na chave tasks do localStorage
  tasks.push(task);
  init();
  updateStorage();
  inputAdd.value = '';
});
