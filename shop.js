if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

// Ready Function
function ready() {
    var addToStashButtons = document.getElementsByClassName("shop-item-button")
    for (var i = 0; i < addToStashButtons.length; i++) {
        var button = addToStashButtons[i]
        button.addEventListener("click", addToStashClicked)
    }
    var sellStashItemButtons = document.getElementsByClassName("btn-sell")
    for (var i = 0; i < sellStashItemButtons.length; i++) {
        var button = sellStashItemButtons[i]
        button.addEventListener("click", sellStashItem)
    }

    var quantityInputs = document.getElementsByClassName("stash-quantity-input")
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }

    document.getElementsByClassName("btn-purchase")[0].addEventListener("click", grabAllClicked)
}

// Add to Stash Button
function addToStashClicked(e) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src
    addItemToStash(title, price, imageSrc)
    console.log(title, price)
    updateGoldTotal()
}

// Sell Stash Item/s Button
function sellStashItem(e) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateGoldTotal()
}

// Quantity Changed to 1 instead of Negative Values (Decreasing of Quantity Value)
function quantityChanged(e) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateGoldTotal()
}

// Grab All Item/s Button
function grabAllClicked() {
    alert("THE COURIER WILL NOW DELIVER THE ITEM/S")
    var stashItems = document.getElementsByClassName("stash-items")[0]
    while (stashItems.hasChildNodes()) {
        stashItems.removeChild(stashItems.firstChild)
    }
    updateGoldTotal()
}

// Add Item/s to Stash
function addItemToStash(title, price, imageSrc) {
    var stashRow = document.createElement("div")
    stashRow.classList.add("stash-row")
    var stashItems = document.getElementsByClassName("stash-items")[0]
    var stashItemNames = stashItems.getElementsByClassName("stash-item-title")
    for (var i = 0; i < stashItemNames.length; i++) {
        if (stashItemNames[i].innerText == title) {
            alert("ITEM ALREADY ADDED TO STASH")
            return
        }
    }
    var stashRowContents = `
        <div class="stash-item stash-column">
            <img class="stash-item-image" src="${imageSrc}" width="100" height="100">
            <span class="stash-item-title">${title}</span>
        </div>
        <span class="stash-price stash-column"><i class="fa-solid fa-coins"></i>${price}</span>
        <div class="stash-quantity stash-column">
            <input class="stash-quantity-input" type="number" value="1">
            <button class="btn btn-sell" type="button">SELL</button>
        </div>`
    stashRow.innerHTML = stashRowContents
    stashItems.append(stashRow)
    stashRow.getElementsByClassName("btn-sell")[0].addEventListener("click", sellStashItem)
    stashRow.getElementsByClassName("stash-quantity-input")[0].addEventListener("change", quantityChanged)
}

// Update Gold Total
function updateGoldTotal() {
    var stashItemContainer = document.getElementsByClassName("stash-items")[0]
    var stashRows = stashItemContainer.getElementsByClassName("stash-row")
    var total = 5000
    for (var i = 0; i < stashRows.length; i++) {
        var stashRow = stashRows[i]
        var priceElement = stashRow.getElementsByClassName("stash-price")[0]
        var quantityElement = stashRow.getElementsByClassName("stash-quantity-input")[0]
        var price = parseFloat(priceElement.innerText.replace())
        var quantity = quantityElement.value
        total = total - (price * quantity)
        console.log(price, quantity, total)
        if (total < 0) {
            alert("NOT ENOUGH GOLD")
            return
        }
    }
    document.getElementsByClassName("stash-total-price")[0].innerText = total
}

