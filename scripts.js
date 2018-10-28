// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveFood);

function saveFood(e){
    // get form values
    var foodName = document.getElementById('foodName').value;
    var foodQuantity = document.getElementById('foodQuantity').value;
    var newItemQuantityUnit = document.getElementById('newItemQuantityUnit').value;
    var purchaseDate = document.getElementById('purchaseDate').value;
    var expirationDate = document.getElementById('expirationDate').value;
	
    // if user does not enter anything, prevent form from saving
    if(!validateForm(foodName, foodQuantity, newItemQuantityUnit, purchaseDate, expirationDate)){
        return false;
	}
	
    var inventoryItem = {
        name: foodName,
		quantity: foodQuantity,
		unit: newItemQuantityUnit,
		purchased: purchaseDate,
		expires: expirationDate
    }

    // test if foodInventory is null
    if(localStorage.getItem('foodInventory') === null){
        // init array
        var foodInventory = [];
        // add to array
        foodInventory.push(inventoryItem);
        // set to localstorage
        localStorage.setItem('foodInventory', JSON.stringify(foodInventory));
    } else {
        // get foodInventory from localstorage
        var foodInventory = JSON.parse(localStorage.getItem('foodInventory'));
        // add inventoryItem to array
        foodInventory.push(inventoryItem);
        // re-set back to localstorage
        localStorage.setItem('foodInventory', JSON.stringify(foodInventory));
    }

    // clear form
    document.getElementById('myForm').reset();

    fetchFoodInventory();

    // prevent form from submitting/refreshing
    e.preventDefault();
}

// delete foodInventory
function deleteInventoryItem(name){
    // get foodInventory from localstorage
    var foodInventory = JSON.parse(localStorage.getItem('foodInventory'));
    // loop through foodInventory
    for(i = 0; i < foodInventory.length; i++){
        if(foodInventory[i].name == name){
            // remove from array
            foodInventory.splice(i, 1);
        }
    }
    // reset back to localstorage
    localStorage.setItem('foodInventory', JSON.stringify(foodInventory));

    // re-fetch book marks
    fetchFoodInventory();
}

// edit foodInventory
function editInventoryItem(name){

}

// fetch foodInventory
function fetchFoodInventory(){
    // get foodInventory from localstorage
    var foodInventory = JSON.parse(localStorage.getItem('foodInventory')); 
   
    // get output id
    var foodInventoryResults = document.getElementById('foodInventoryResults');

    // build output
    foodInventoryResults.innerHTML = '';
    for(var i = 0; i < foodInventory.length; i++){
        var name = foodInventory[i].name;
        var quantity = foodInventory[i].quantity;
		var unit = foodInventory[i].unit;
		var purchased = foodInventory[i].purchased;
		var expires = foodInventory[i].expires;
			
		/*
        foodInventoryResults.innerHTML += 
            '<div class="table">'+
            '<h3>'+name+
            ' <a onclick="deleteInventoryItem(\''+name+'\')" class="btn btn-danger" href="#">Remove All</a> '+            
            '</h3>'+
			'</div>';
            */
           foodInventoryResults.innerHTML += 
           '<tr>'+
               '<th scope="row">'+name+'</th>'+
               '<td>'+quantity+'</td>'+
               '<td>'+unit+'</td>'+
               '<td>'+purchased+'</td>'+
               '<td>'+expires+'</td>'+
               '<td><a onclick="editInventoryItem(\''+name+'\')" class="btn btn-warning btn-sm" href="#">Edit</a></td>'+
               '<td><a onclick="deleteInventoryItem(\''+name+'\')" class="btn btn-danger btn-sm" href="#">Remove All</a></td>'+
           '</tr>'
	}

}

function validateForm(foodName, foodQuantity, newItemQuantityUnit, purchaseDate, expirationDate){
    if(!foodName || !foodQuantity || !newItemQuantityUnit || !purchaseDate || !expirationDate){
        alert('Please fill in the form')
        return false;
    }
    return true;
}