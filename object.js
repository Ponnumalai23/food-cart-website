const cart = document.getElementById("cart-icon");
cart.addEventListener('click', cartlist);

const closeIcon = document.getElementById("close-icon");
closeIcon.addEventListener('click', closeSidebar);

function cartlist() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('open');
}

const Data = {
    items: [
        { id: 1, img: 'images/burger.jpg', Title: 'Burger', price: 150 },
        { id: 2, img: 'images/samosa.jpg', Title: 'Samosa', price: 20 },
        { id: 3, img: 'images/coffee.jpg', Title: 'Coffee', price: 20 },
        { id: 4, img: 'images/juice.jpg', Title: 'Juice', price: 50 },
        { id: 5, img: 'images/fish.jpg', Title: 'Fish', price: 80 },
        { id: 6, img: 'images/noodles.jpg', Title: 'Noodles', price: 120 },
        { id: 7, img: 'images/pasta.jpg', Title: 'Pasta', price: 160 },
        { id: 8, img: 'images/burger.jpg', Title: 'Burger', price: 150 },
        { id: 9, img: 'images/samosa.jpg', Title: 'Samosa', price: 20 },
        { id: 10, img: 'images/biriyani.jpg', Title: 'Biriyani', price: 240 },
        { id: 11, img: 'images/parota.jpg', Title: 'Parota', price: 20 },
        { id: 12, img: 'images/panipoori.jpg', Title: 'Pani-Poori', price: 50 },
        { id: 13, img: 'images/salad.jpg', Title: 'Salad', price: 40 },
        { id: 14, img: 'images/vegrice.jpg', Title: 'Vegrice', price: 120 }
    ]
}

const container = document.getElementById("main-content");

Data.items.forEach(item => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const imgElement = document.createElement('img');
    imgElement.src = item.img;
    productDiv.appendChild(imgElement);

    const titleElement = document.createElement('h3');
    titleElement.textContent = item.Title;
    productDiv.appendChild(titleElement);

    const priceElement = document.createElement('p');
    priceElement.textContent = `Rs: ${item.price}`;
    productDiv.appendChild(priceElement);

    const btnElement = document.createElement('button');
    btnElement.textContent = "Add to Cart";
    btnElement.onclick = function() {
        addToCart(item);
    }
    productDiv.appendChild(btnElement);

    container.appendChild(productDiv);
});

const cartItems = [];

function addToCart(item) {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        item.quantity = 1;
        cartItems.push(item);
    }
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';

    let totalAmount = 0;

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const img = document.createElement('img');
        img.src = item.img;
        img.width = 80;
        img.height = 80;
        cartItem.appendChild(img);

        const title = document.createElement('span');
        title.textContent = item.Title;
        title.style.marginLeft = "5px";
        cartItem.appendChild(title);

        const price = document.createElement('span');
        price.textContent = `  Rs: ${item.price}`;
        price.style.marginLeft = "5px";
        cartItem.appendChild(price);

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = 1;
        quantityInput.value = item.quantity;
        quantityInput.style.marginLeft = "10px";
        quantityInput.style.width = "30px";
        quantityInput.onchange = function() {
            updateQuantity(item.id, quantityInput.value);
        };
        cartItem.appendChild(quantityInput);

        const remove = document.createElement('img');
        remove.src = "images/remove.png";
        remove.width = 40;
        remove.height = 40;
        remove.style.marginLeft = "5px";
        remove.style.cursor = "pointer";
        remove.onclick = function() {
            removeFromCart(item.id);
        };
        cartItem.appendChild(remove);

        const itemTotal = item.price * item.quantity;
        const totalPrice = document.createElement('span');
        totalPrice.textContent = `Total:${itemTotal}`;

        cartItem.appendChild(totalPrice);
        cartList.appendChild(cartItem);

        totalAmount += itemTotal;

    });




    const totalDiv = document.createElement('div');
    totalDiv.textContent = `Total Amount:  ${totalAmount}`;
    totalDiv.style.float = "left";
    totalDiv.style.height = "25px";
    totalDiv.style.padding = "10px";
    totalDiv.style.color = "white";
    totalDiv.style.marginLeft = "100px";
    totalDiv.style.backgroundColor = "green"
    cartList.appendChild(totalDiv);



    const cartCount = document.querySelector('.cart-count');
    let count = cartItems.length;
    cartCount.innerHTML = count;

    if (count == 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'block';
    }
}



function removeFromCart(id) {
    const itemIndex = cartItems.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        updateCart();
    }
}