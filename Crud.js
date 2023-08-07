// SO HERE I AM STORING ALL THE DETAILS OF THE USER IN CrudCrud
let item= document.querySelector('#name');
let description = document.querySelector('#email');
let myForm = document.querySelector('#my-form');
let price = document.querySelector('#phone');
let quantity = document.querySelector('#date');



// Listen for DOMContentLoaded 

document.addEventListener('DOMContentLoaded', ()=>{
axios.get("https://crudcrud.com/api/f2e6c2fe08754ecb85c0c1ac49b41b79/Inventory")
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
    
    let quant= res.data[i].Quantity;
    if(quant>y){
      alert(`Out of stock-${res.data[i].Name}`)
    }
else{
    y= y - quant;
    const update={
     "Number": y,
    }
     axios.patch(`https://crudcrud.com/api/f2e6c2fe08754ecb85c0c1ac49b41b79/Inventory/${res.data[i]._id}`, update)}
      y=res.data[i].Number;
  }
    div.appendChild(document.createTextNode(`Quantity Left-${res.data[i].Number} `));
    



    
    div.style.fontWeight= "bold";
    div.style.textAlign= "center";
    div.style.color= "brown";

    deleteButton.style.backgroundColor="red";
    deleteButton.style.color="white";
    deleteButton.style.borderColor="red"
    div.appendChild(deleteButton);

    myForm.after(div);

})}).catch(err=> console.error(err))


// Listen for form submit

myForm.addEventListener('submit', onSubmit);
function onSubmit(e)
 {
    e.preventDefault();
    if(item.value === '' || description.value === '' || price.value === '' || quantity.value === '' ) {
      alert('Please enter all fields');
    }
    else{
        alert('Details saved to CurdCrud');
        const details = {
            "Item": item.value,
            "Description": description.value,
            "Price": price.value,
            "Quantity": quantity.value,

        };

   
         axios.post("https://crudcrud.com/api/f2e6c2fe08754ecb85c0c1ac49b41b79/Inventory", details).
         then(res=> console.log(res.data))
          .catch((err)=>console.error(err));
          create();
      }

    }
function create()
{  // Lets Scale the app to more users
        let div = document.createElement('div');
        // Creating a Delete Button
        div.className="new-div";
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute('id', item.value);
        deleteButton.textContent="Delete";

        div.appendChild(document.createTextNode(item.value));
        div.appendChild(document.createTextNode("🔶" + description.value +"🔶"));
        div.appendChild(document.createTextNode(price.value + " "));
        
        div.style.fontWeight= "bold";
        div.style.textAlign= "center";
        div.style.color= "brown";

        deleteButton.style.backgroundColor="red";
        deleteButton.style.color="white";
        deleteButton.style.borderColor="red"
        div.appendChild(deleteButton);
        myForm.after(div);
}


// DELETE BUTTON FUNCTIONALITY
function onDelete(e) {
  e.preventDefault();
    const div = this.parentNode;
    // console.log(div)
    axios.delete(`https://crudcrud.com/api/f2e6c2fe08754ecb85c0c1ac49b41b79/Inventory/${this.id}`)
    .then(res=> {
      console.log(res);
      alert("Selected User Details has been removed from crudcrud!");})
      .catch(err=> console.error(err));
      
    div.remove();
  }

// EDIT BUTTON FUNCTIONALITY
    // function onEdit(e) {
    // e.preventDefault();
    // const div = this.parentNode;
    // const user= div.querySelector('button').id;
    // div.remove();
    // axios.get(`https://crudcrud.com/api/f2e6c2fe08754ecb85c0c1ac49b41b79/Inventory/${user}`)
    //  .then(res=> {
    //     nameInput.value = res.data.Name;
    //     description.value = res.data.Email;
    //    price.value = res.data.Phonenumber;
    //    quantity.value = res.data.Date;
    //    timing.value =res.data.quantityForCall;
    //    myForm.removeEventListener('submit', onSubmit);
    //    myForm.addEventListener('submit',(e)=>{
        
    //     e.preventDefault() 
    //     axios.put(`https://crudcrud.com/api/f2e6c2fe08754ecb85c0c1ac49b41b79/Inventory/${user}`,{
    //       "Name": nameInput.value,
    //       "Email": description.value,
    //       "Phonenumber": price.value,
    //       "Date": quantity.value,
    //       "quantityForCall":timing.value,
    //   }).then(()=> alert("Details has been edited to crudcrud! Refresh the page!! "))
    //     .catch(err=>console.error(err));
    //  })

    //  }
      
    //  )}