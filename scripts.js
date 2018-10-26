/*
function getNewItem(){
	var itemName = document.getElementById('newItemName').value;
	var itemQuantity = document.getElementById('newItemQuantity').value;
	var itemQuantityUnits = document.getElementById('newItemQuantityUnit').value;
	var itemPurchasedDate = document.getElementById('purchasedOn').value;
	var itemExpirationDate = document.getElementById('expiresOn').value;
	alert('You entered the following items:\nName: ' + itemName + '\nQuantity: ' + itemQuantity + ' ' + itemQuantityUnits + '\nPurchased: ' + itemPurchasedDate + '\nExpires: ' + itemExpirationDate);
}
*/

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
   
    /*
    // local storage test
    localStorage.setItem('test', 'hello world');
    console.log(localStorage.getItem('test'));
    */


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
function deleteinventoryItem(name){
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

        foodInventoryResults.innerHTML += 
            '<div class="well">'+
            '<h3>'+name+
            ' <a onclick="deleteinventoryItem(\''+name+'\')" class="btn btn-danger" href="#">Remove All</a> '+            
            '</h3>'+
            '</div>';
    }
}

function validateForm(foodName, foodQuantity, newItemQuantityUnit, purchaseDate, expirationDate){
    if(!foodName || !foodQuantity || !newItemQuantityUnit || !purchaseDate || !expirationDate){
        alert('Please fill in the form')
        return false;
    }
    return true;
}