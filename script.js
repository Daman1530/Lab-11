const itemInput = document.getElementById('item');
const addButton = document.getElementById('add');
const clearButton = document.getElementById('clear');
const itemList = document.getElementById('list');

addButton.addEventListener('click', addItem);
itemInput.addEventListener('keydown', handleInputKey);
clearButton.addEventListener('click', clearList);

function addItem() {
  const itemName = itemInput.value.trim();

  if (itemName !== '') {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${itemName}
      <button class="delete">Delete</button>
    `;

    itemList.appendChild(listItem);
    itemInput.value = '';

    const deleteButton = listItem.querySelector('.delete');
    deleteButton.addEventListener('click', deleteItem);
  }
}

function deleteItem(event) {
  const listItem = event.target.parentElement;
  itemList.removeChild(listItem);
}

function handleInputKey(event) {
  if (event.key === 'Enter') {
    addItem();
  }
}

function clearList() {
  itemList.innerHTML = ''; // Remove all list items
}

// BONUS: Load items from local storage on page load
window.addEventListener('load', () => {
  const storedItems = JSON.parse(localStorage.getItem('shoppingList')) || [];

  storedItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${item}
      <button class="delete">Delete</button>
    `;

    itemList.appendChild(listItem);
    const deleteButton = listItem.querySelector('.delete');
    deleteButton.addEventListener('click', deleteItem);
  });
});

// BONUS: Save items to local storage on list change
itemList.addEventListener('DOMNodeInserted', updateLocalStorage);
itemList.addEventListener('DOMNodeRemoved', updateLocalStorage);

function updateLocalStorage() {
  const items = Array.from(itemList.children).map(item => item.firstChild.textContent);
  localStorage.setItem('shoppingList', JSON.stringify(items));
}
