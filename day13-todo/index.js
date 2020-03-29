const todosForm = document.querySelector('.todoForm');
const todosList = document.querySelector('.todosList');
const todos = JSON.parse(localStorage.getItem('todos')) || [];

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector('.todoInput').value;

  todos.push({
    text,
    isChecked: false
  });
  localStorage.setItem('todos', JSON.stringify(todos));
  populateList(todos, todosList);
  this.reset();
}

function populateList(items = [], itemsTarget) {
  itemsTarget.innerHTML = items.map((item, i) => {
    return `
      <li>
        <span class="deleteTodo">X</span>
        <input type="checkbox" data-index=${i} id="${i}" class="css-checkbox" ${item.isChecked ? 'checked' : ''}/>
        <label for="${i}" class="css-label dark-check-green">${item.text}</label>
      </li>
    `;
  }).join('');
}

function handleCheck(e) {
  if (e.target.matches('span')) handleDelete(e);
  if (!e.target.matches('input')) return;

  let index = e.target.dataset.index;
  todos[index].isChecked = !todos[index].isChecked;
  localStorage.setItem('todos', JSON.stringify(todos));
  populateList(todos, todosList);
}

function handleDelete(e) {
  todos.splice(todos.find(i => i == e.target.dataset.index), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  populateList(todos, todosList);
}

todosForm.addEventListener('submit', addItem);
todosList.addEventListener('click', handleCheck);
populateList(todos, todosList);