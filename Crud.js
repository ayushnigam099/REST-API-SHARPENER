axios.get("https://crudcrud.com/api/6f745b69f3f3477082adb77e1317c1c9/Product")
  .then((res) => {
    if (res.data.length < 1) {
      const initialInventory = {
        "Milk": 100,
        "ColdDrink": 100,
        "Soap": 100,
        "Bread": 100,
      };
      axios.post("https://crudcrud.com/api/6f745b69f3f3477082adb77e1317c1c9/Product", initialInventory)
        .then((res) => {
          create(res.data._id);
        })
        .catch(err => console.error(err));
    }
    else
    {
      axios.get("https://crudcrud.com/api/6f745b69f3f3477082adb77e1317c1c9/Product").then((respo)=> {
        create(respo.data[0]._id)
      })
      .catch(err=> console.error(err));

    } 
  });
  const item = document.querySelector('#name');
  const description = document.querySelector('#email');
  const myForm = document.querySelector('#my-form');
  const price = document.querySelector('#phone');
  const quantity = document.querySelector('#date');

// Listen for DOMContentLoaded 
document.addEventListener("DOMContentLoaded", (e)=>{
  e.preventDefault();
  axios.get("https://crudcrud.com/api/6f745b69f3f3477082adb77e1317c1c9/Inventory")
  .then(res=> {
    for(let i=0;i<res.data.length;i++)
    {
      let div = document.createElement('div');
      // Creating a Delete Button
      div.className= "new-div";
      let deleteButton = document.createElement("button");
      deleteButton.setAttribute('id', res.data[i]._id);
      deleteButton.textContent="Delete";
      deleteButton.addEventListener('click', onDelete);
      div.appendChild(document.createTextNode(res.data[i].Item));
      div.appendChild(document.createTextNode("🔶" + res.data[i].Description+"🔶"));
      axios.get("https://crudcrud.com/api/6f745b69f3f3477082adb77e1317c1c9/Product")
      .then((product)=>
      {
        div.appendChild(document.createTextNode(`Quantity Left-${product.data[0][res.data[i].Description]}`));
        div.style.fontWeight= "bold";
        div.style.textAlign= "center";
        div.style.color= "brown";
    
        deleteButton.style.backgroundColor="red";
        deleteButton.style.color="white";
        deleteButton.style.borderColor="red"
        div.appendChild(deleteButton);
    
        myForm.after(div);


      })


    }
  }).catch(err=> console.error(err))
  })
  





function create(userid) {
myForm.addEventListener('submit', onSubmit);

  function onSubmit(e) {
    e.preventDefault();
    if (item.value === '' || description.value === '' || price.value === '' || quantity.value === '') {
      alert('Please enter all fields');
    } else {
      alert("Details has been saved to CrudCrud");
      const details = {
        "Item": item.value,
        "Description": description.value,
        "Price": price.value,
      }

      axios.post("https://crudcrud.com/api/6f745b69f3f3477082adb77e1317c1c9/Inventory", details)
        .then(res => {
          axios.get(`https://crudcrud.com/api/6f745b69f3f3477082adb77e1317c1c9/Product/${userid}`)
            .then(resp => {
              if (description.value == "Milk") {
                resp.data.Milk = resp.data.Milk - quantity.value;
               }
              else if (description.value == "ColdDrink") {
                resp.data.ColdDrink = resp.data.ColdDrink - quantity.value;
               }
               else if (description.value == "Soap") {
                resp.data.Soap = resp.data.Soap - quantity.value;

              } else if (description.value == "Bread") {
                resp.data.Bread = resp.data.Bread - quantity.value;
               
              }

              axios.put(`https://crudcrud.com/api/6f745b69f3f3477082adb77e1317c1c9/Product/${userid}`, {
                "Milk":resp.data.Milk,
                "ColdDrink":resp.data.ColdDrink,
                "Soap":resp.data.Soap,
                "Bread":resp.data.Bread,
              })
                .then(() => {
                  const div = document.createElement('div');
                  div.className = "new-div";
                  const deleteButton = document.createElement("button");
                  deleteButton.setAttribute('id', res.data._id);
                  deleteButton.textContent = "Delete";
                  deleteButton.addEventListener('click', onDelete);
                  div.appendChild(document.createTextNode(res.data.Item));
                  div.appendChild(document.createTextNode("🔶" + res.data.Description + "🔶"));
                  div.appendChild(document.createTextNode(`Quantity Left-${resp.data[description.value]}`));
                  div.style.fontWeight = "bold";
                  div.style.textAlign = "center";
                  div.style.color = "brown";
                  deleteButton.style.backgroundColor = "red";
                  deleteButton.style.color = "white";
                  deleteButton.style.borderColor = "red";
                  div.appendChild(deleteButton);
                  myForm.after(div);
                })
                .catch(err => console.error(err));

            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }
  }
}

  function onDelete(e) {
    e.preventDefault();
    const div = this.parentNode;
    axios.delete(`https://crudcrud.com/api/6f745b69f3f3477082adb77e1317c1c9/Inventory/${this.id}`)
      .then(res => {
        console.log(res);
        alert("Selected Item Details has been removed from crudcrud!");
      })
      .catch(err => console.error(err));
    div.remove();
  }

