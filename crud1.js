// Initialize variables
const initialStock = 100; // Initial stock quantity for each item
let y = initialStock; // Current stock quantity

// DOM elements
const item = document.querySelector('#name');
const description = document.querySelector('#email');
const myForm = document.querySelector('#my-form');
const quantity = document.querySelector('#date');

// Fetch initial data and display items
document.addEventListener('DOMContentLoaded', () => {
  axios.get("https://crudcrud.com/api/09a39b6c5a2e4329a2f93fb4af5d8192/Inventory")
    .then(res => {
      res.data.forEach(itemData => {
        displayItem(itemData);
        y -= itemData.Quantity; // Update stock quantity
      });
    })
    .catch(err => console.error(err));
});

// Form submit handler
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  if (item.value === '' || description.value === '') {
    alert('Please enter item details');
  } else {
    const enteredQuantity = parseInt(quantity.value) || 0;
    
    if (enteredQuantity <= 0) {
      alert('Quantity must be greater than zero');
      return;
    }
    
    if (enteredQuantity > y) {
      alert('Cannot add more than available stock');
    } else {
      const details = {
        "Item": item.value,
        "Description": description.value,
        "Quantity": enteredQuantity,
      };
      
      axios.post("https://crudcrud.com/api/09a39b6c5a2e4329a2f93fb4af5d8192/Inventory", details)
        .then(res => {
          displayItem(res.data); // Display the new item
          y -= enteredQuantity; // Update stock quantity
          alert('Details saved to CrudCrud');
        })
        .catch(err => console.error(err));
    }
  }
}

// Display item on the screen
function displayItem(itemData) {
  const div = document.createElement('div');
  div.className = "new-div";
  
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute('id', itemData._id);
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener('click', onDelete);
  
  div.appendChild(document.createTextNode(itemData.Item));
  div.appendChild(document.createTextNode("🔶" + itemData.Description + "🔶"));
  
  const quantityLeft = y - itemData.Quantity;
  if (quantityLeft <= 0) {
    alert(`Out of stock - ${itemData.Item}`);
    return; // Don't display item details if out of stock
  }
  
  div.appendChild(document.createTextNode(` Quantity Left: ${quantityLeft}`));
  
  div.style.fontWeight = "bold";
  div.style.textAlign = "center";
  div.style.color = "brown";
  
  deleteButton.style.backgroundColor = "red";
  deleteButton.style.color = "white";
  deleteButton.style.borderColor = "red";
  
  div.appendChild(deleteButton);
  
  myForm.after(div);
}

// Delete item functionality
function onDelete(e) {
  e.preventDefault();
  const div = this.parentNode;
  const itemId = this.id;
  
  axios.delete(`https://crudcrud.com/api/09a39b6c5a2e4329a2f93fb4af5d8192/Inventory/${itemId}`)
    .then(() => {
      alert("Selected item details have been removed from CrudCrud!");
      div.remove();
    })
    .catch(err => console.error(err));
}
