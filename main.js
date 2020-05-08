const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');
const add = document.querySelector('.add');

if(window.localStorage.getItem("todos") == undefined){
     var todos = [];
     window.localStorage.setItem("todos", JSON.stringify(todos));
}

var todosEX = window.localStorage.getItem("todos");
var todos = JSON.parse(todosEX);


class item{
	constructor(name){
		this.createItem(name);
    }
    
    createItem(name){
    	var itemBox = document.createElement('div');
        itemBox.classList.add('item');

     //Adding A new Item to the list
    	var input = document.createElement('input');
    	input.type = "text";
    	input.disabled = true;
    	input.value = name;
    	input.classList.add('item_input');

        //Button Clicked to edit added Item
    	var edit = document.createElement('button');
    	edit.classList.add('edit');
    	edit.innerHTML = "edit";
    	edit.addEventListener('click', () => this.edit(input, name));

        //Button Clicked to remove added Item
    	var remove = document.createElement('button');
    	remove.classList.add('remove');
    	remove.innerHTML = "REMOVE";
    	remove.addEventListener('click', () => this.remove(itemBox, name));

        //Itembox will contain all added items that can either be edited/removed
    	container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(edit);
        itemBox.appendChild(remove);

    }
    //Function to Edit added item
    edit(input, name){
        if(input.disabled == true){
           input.disabled = !input.disabled;
        }
    	else{
            input.disabled = !input.disabled;
            let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
            window.localStorage.setItem("todos", JSON.stringify(todos));
        }
    }
    //Function to remove added item
    remove(itemBox, name){
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }
}

//Callback function for when edit or remove are clicked
add.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
	if(e.which == 13){
		check();
	}
})

//Checks if the input contains a value before adding it to the list
function check(){
	if(inputValue.value != ""){
		new item(inputValue.value);
        todos.push(inputValue.value);
        window.localStorage.setItem("todos", JSON.stringify(todos));
		inputValue.value = "";
	}
}

//Loop That continusly add each new added item to list
for (var v = 0 ; v < todos.length ; v++){
    new item(todos[v]);
}

//This Item is Placeholder to demonstrate what's added
new item("Laundry");