function getNewItem(){
	var itemName = document.getElementById('newItemName').value;
	var itemQuantity = document.getElementById('newItemQuantity').value;
	var itemQuantityUnits = document.getElementById('newItemQuantityUnit').value;
	var itemPurchasedDate = document.getElementById('purchasedOn').value;
	var itemExpirationDate = document.getElementById('expiresOn').value;
	alert('You entered the following items:\nName: ' + itemName + '\nQuantity: ' + itemQuantity + ' ' + itemQuantityUnits + '\nPurchased: ' + itemPurchasedDate + '\nExpires: ' + itemExpirationDate);
}