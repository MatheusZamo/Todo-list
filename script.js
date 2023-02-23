const inputAdd = document.querySelector('#inputAdd');
const btnAddTask = document.querySelector('#addTask');
const ulTasks = document.querySelector('#tasks');

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
    <button>Editar</button>
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
//Criar o popup de edição de tarefas **********
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


