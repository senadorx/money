const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-task');
const inputTask = document.querySelector('.input-task')

//Fetching data from BD
const fetchTasks = async () => {
  const response = await fetch('http://localhost:3333/tasks')
  const tasks = await response.json()
  return tasks;
} 

//Creating new task
const addTask = async (event) => {
  event.preventDefault();

  const task = { title: inputTask.value };

  await fetch('https://localhost:3333/tasks', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),

  });
}





//Criando funcao que criam tags:
const createElement = (tag, innerText = '', innerHTML = '') => {
const element = document.createElement(tag);

if(innerText){
  element.innerText = innerText;
}
if (innerHTML){
  element.innerHTML = innerHTML;
}
return element;

}

const createSelect = (value) => {
const options = `
<option value="pending">Pending</option>
<option value="working">Working</option>
<option value="done">Done</option>
`;

const select = createElement('select', '', options);
select.value = value;
return select;
}


//Creating task manually
// const task = {
//   id: 1,
//   title:'Inscreva-se no canal 3',
//   created_at:'23/04/23',
//   status: 'pending'
// }

//Criando uma linha com JS:
  const createRow = (task) => {
  const { id, title, created_at, status  } = task;

  const tr = createElement('tr');
  const tdTitle = createElement('td', title);
  const tdCreatedAt = createElement('td', created_at);
  const tdStatus = createElement('td');
  const tdActions = createElement('td');

  const select = createSelect(status);



  const editButton = createElement('button', '', '<span class="material-symbols-outlined">Edit</span>');

  const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">Remove</span>');

  
  editButton.classList.add('btn-action');
  deleteButton.classList.add('btn-action');

  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);
  
  return tr;

  //tbody.appendChild(tr);
}
//createRow(task); 

//Loading Tasks from api
const loadTasks = async () => {
  const tasks = await fetchTasks();
  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
    
  });

}

addForm.addEventListener('submit', addTask)
loadTasks();