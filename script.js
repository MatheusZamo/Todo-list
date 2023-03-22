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
    <input type="checkbox"class='checkbox' onClick='scratch(${task.id})'>
    <span class='taskName'>${task.name}</span>
    <button class='btnDeletar' onClick='removeTask(${task.id})'>
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1l1.4 1.4ZM7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Z"/></svg>
    </button>

    <button id='btnEdition' onClick ='edition(${task.id})'>
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M6 22q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h7.175q.4 0 .763.15t.637.425l4.85 4.85q.275.275.425.638t.15.762V11.1l-8 7.975V22H6Zm8.5 0q-.2 0-.35-.15T14 21.5v-1.2q0-.2.088-.4t.212-.325l4.85-4.875l2.15 2.1l-4.875 4.9q-.125.15-.325.225t-.4.075h-1.2Zm7.525-5.9L19.9 13.975l.7-.7q.3-.3.725-.3t.7.3l.7.725q.275.3.275.713t-.275.687l-.7.7ZM14 9h4l-5-5v4q0 .425.288.713T14 9Z"/></svg>
    </button>
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
    name : inputAdd.value,
    check: false
  }
  //Adiciona um objeto na chave tasks do localStorage
  tasks.push(task);
  init();
  scratch();
  checkInput();
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
function checkInput(){
  //Função que verifica se o checkbox esta marcado ou não
  const li = ulTasks.children
  for(let i = 0;i<li.length;i++){
    const input = li[i].querySelector('input') 
    const valueTrue = tasks.filter(task => task.check === true)
      if(valueTrue[i] !== undefined){
      input.checked = true
      const span = li[i].querySelector('span')
      span.classList.add('riscar')
      }
    }
  }
checkInput();
//UPDATE 
let numberID = ''
//Função que risca a task marcada
function scratch(ID){
  numberID = ID
const li = ulTasks.children
  for(let i = 0;i<li.length;i++){
   const input = li[i].querySelector('input') 
   input.addEventListener('click',(() => {
    if(input.checked == true){ 
        tasks.filter((task) => {
          if(task.id === numberID){
            task.check = true
            updateStorage()
          }  
        })
      const span = li[i].querySelector('span')
      span.classList.add('riscar')
 
    }else{
      tasks.filter((task) => {
        if(task.id === numberID){
          task.check = false
          updateStorage()
        }  
      })
      const span = li[i].querySelector('span')
      span.classList.remove('riscar')
    }
  }))
  }
}
scratch()
  //Definindo um popup de edição
function edition(ID){
 numberID = ID;
 boxPopup.style.display = 'block'
}
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
      scratch()
      boxPopup.style.display = 'none';
    }
  })
  newTask.value = ''
  checkInput()
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
  scratch();
  checkInput();
}
function generateId(){
  //Gera um id aleatorio 
  return Math.floor(Math.random()*1000);
 };
