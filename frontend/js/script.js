let urlBase = 'http://localhost:3333/tasks';
//let url = 'http://localhost:3333/tasks';
const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-task');
const inputTask = document.querySelector('.input-task')

//Fetching data from BD
const fetchTasks = async () => {
  const response = await fetch(urlBase);
  const tasks = await response.json()
  return tasks;
} 

//Creating new task
const addTask = async (event) => {
  event.preventDefault();

  const task = { title: inputTask.value };

  await fetch(urlBase, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),

  });
  loadTasks();
  inputTask.value = '';
}

// const deleteTask = async (id) => {
//   await fetch(`urlBase/${id}`, {
//     method: 'delete',
//   });
  //loadTasks();

//}

const deleteTask = async (id) => {
  //alert('Delete task: ' + id)
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'delete',
  })
  loadTasks();
}

const updateTask = async ({id, title, status}) => {
  
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, status  }),

  });
  loadTasks();
}


const formatDate = (dateUTC) => {
  const options = { dateStyle: 'short', timeStyle: 'short' }
  const date = new Date(dateUTC).toLocaleString('pt-br', options)
  return date;

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
  const tdCreatedAt = createElement('td', formatDate(created_at));
  const tdStatus = createElement('td');
  const tdActions = createElement('td');

  const select = createSelect(status);

  select.addEventListener('change', ({target}) => updateTask({ ...task,  status: target.value }));



  const editButton = createElement('button', '', '<span class="material-symbols-outlined">Edit</span>');

  const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">Remove</span>');

  const editForm = createElement('form');
  const editInput = createElement('input');

  editInput.value = title;
  editForm.appendChild(editInput);

  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    //alert('Testing form...');
    updateTask({ id, title: editInput.value, status });



  })

  editButton.addEventListener('click', () => {
    tdTitle.innerText = '';
    tdTitle.appendChild(editForm);
  })

  
  editButton.classList.add('btn-action');
  deleteButton.classList.add('btn-action');
  deleteButton.addEventListener('click', () => deleteTask(id))

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

//Loading Tasks from api
const loadTasks = async () => {
  const tasks = await fetchTasks();
  tbody.innerHTML = '';
  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
    
  });

}

addForm.addEventListener('submit', addTask)
loadTasks();