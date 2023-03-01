const inputAdd = document.querySelector('#inputAdd');
const btnAddTask = document.querySelector('#addTask');
const ulTasks = document.querySelector('#tasks');
const boxPopup = document.querySelector('.box-popup');
const newTask = document.querySelector('#new-task');
const taskName = document.querySelector('.taskName');
const msgError = document.querySelector('.msgError');
const btnConfirm = document.querySelector('.btn-confirm');
const checkbox = document.querySelector('.checkbox');

// CREATE
//Criando um localStorage
const storage = JSON.parse(localStorage.getItem('tasks'));
//Definindo um ternario para o localStorage
let tasks = localStorage.getItem('tasks') !== null ? storage : [];
function addTaskHTML(task){
  //Cria o conteudo que será adicionado no DOM
  const createLi = document.createElement('li');
  createLi.classList.add('task');
  createLi.innerHTML += `
    <input type="checkbox"class='checkbox'>
    <span class='taskName'>${task.name}</span>
    <button onClick='removeTask(${task.id})'>x</button>
    <button onClick ='edition(${task.id})'>Editar</button>
  `; 
  ulTasks.append(createLi);
}
btnAddTask.addEventListener('click',() =>{
  if(inputAdd.value == ''){
    return
  }
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
//READ
function init(){
  //Para cada tarefa adicionada no localStorage
  //a função addTaskHTML e executada 
    ulTasks.innerHTML = '';
    tasks.forEach(addTaskHTML);
}
init();
//UPDATE 
let numberID = ''
function edition(ID){
 numberID = ID;
 boxPopup.style.display = 'block'
}
//Definindo um popup de edição
boxPopup.addEventListener('click', event => {
  //pegando as class clikadas e definindo as que serão usadas para fechar o popup
  const classNameOfClicked = event.target.classList[0];
  const classNames = ['box-popup','btn-close']
  const closePopup = classNames.some(className => className === classNameOfClicked)
  if(closePopup){
      boxPopup.style.display = 'none';
  }
})
btnConfirm.addEventListener('click',() => {
  if(newTask.value == ''){
    msgError.style.display = 'block';
    setTimeout(()=>{
      msgError.style.display = 'none'
    },2000)
    return
  }
  tasks.filter((task) => {
    if(task.id == numberID){
      task.name = newTask.value
      updateStorage()
      init()
      boxPopup.style.display = 'none';
    }
  })
  newTask.value = ''
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
