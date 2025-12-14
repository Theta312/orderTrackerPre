const addMealBtn = document.querySelectorAll('.mealBtn');
const mealTotal = document.querySelector('.totalMeal');
const foodOrdered = document.querySelector('.order');
const addOrderBtn = document.querySelector('.addOrder');
const mealList = document.querySelectorAll('.food-item');
const deleteFood = document.querySelectorAll('.removeFood');
const orderHistoryList = document.querySelector('#food-group');
const orderMealBtn = document.querySelectorAll('.order-meal-btn');
const listOrderList = document.querySelector('#list-order-list');





for (let i = 0; i < addMealBtn.length; i++) {
    addMealBtn[i].addEventListener('click', makeOrder)
};

const placeOrder = async(e) => {
        let parent = e.target.previousSibling
        
        parent.classList.add('checkMark')
        
        try {
        await orderPrepared(parent)
        await orderHandedOver(parent)
        await orderOnTheWay(parent)
        await orderReachedDestintaion(parent)
        await orderDelivered(parent)
        } catch(e) {
            console.log(e)
        }
};

function removeOrder(e) {
    let parent = e.target.parentNode;
    parent.remove()
}


const currentOrder = {
    items: [],
    total: 0
};

let orderHistory = [];


function createOrderList() {
    orderHistory.forEach(obj => {
        let orders = obj.items;
        console.log(orders);
        let foodOrderDiv = document.createElement('div');
        let foodBody = document.createElement('div');
        foodOrderDiv.classList.add('card', 'mb-3');
        foodBody.classList.add('card-body', 'row');
        let ulFood = document.createElement('ul');
        ulFood.classList.add('meal-order', 'col-7');
        let orderBtn = document.createElement('button');
        let cancelBtn = document.createElement('button');
        
        orderBtn.classList.add('order-meal-btn', 'col');
        orderBtn.addEventListener('click', makeOrder)
        cancelBtn.classList.add('cancel-meal-btn', 'col');
        
        orderBtn.innerText = 'Order';
        cancelBtn.innerText = 'Cancel';
        cancelBtn.addEventListener('click', removeOrder)
        orderBtn.addEventListener('click' , placeOrder)
        orders.forEach(food => {
            //console.log(food);
            let li = document.createElement('li');
            let span = document.createElement('span');
            li.innerText = `${food.name}`;
            span.innerText = `- $${food.price}`;
            li.appendChild(span);
            ulFood.appendChild(li);
        });
        
        foodBody.appendChild(ulFood);
        foodBody.appendChild(orderBtn);
        foodBody.appendChild(cancelBtn);
        foodOrderDiv.appendChild(foodBody);
        orderHistoryList.appendChild(foodOrderDiv);
    });
};




let balanceValue = 0;

function makeOrder(e) {
    let item = e.target.parentNode;
    let foodName = item.getAttribute('data-name');
    let foodPrice = item.getAttribute('data-price');
    const newItem = {'name': foodName, 'price': foodPrice}
    currentOrder.items.push(newItem);
    currentOrder.total += Number(foodPrice);
    mealTotal.innerText = `$${currentOrder.total}.00`;

    let orderLi = document.createElement('li');    
    currentOrder.items.forEach(element => {
        orderLi.classList.add('orderItem');
        orderLi.innerHTML = `
             <p>${element.name}</p>
        `;
    });
    orderLi.addEventListener('click', deleteOrder);
    foodOrdered.appendChild(orderLi);
    
};

function deleteOrder(e) {
    if (e.target.parentNode.tagName === 'LI') {
        e.target.parentNode.remove()
        let index = currentOrder.items.find(element => element.name === e.target.innerText);
        let indexToFind = currentOrder.items.indexOf(index);
        console.log(currentOrder.items[indexToFind].price)
        currentOrder.total -= Number(currentOrder.items[indexToFind].price);
        mealTotal.innerText = `$${currentOrder.total}.00`;
        currentOrder.items.splice(indexToFind, 1);
    }
}

function addOrderButton() {
    if (currentOrder.items.length > 0) {
        orderHistory.push({...currentOrder});
    } else {
        alert('Please choose your order first.');
        return;
    };
    mealTotal.innerText = '';
    let completeTotal = orderHistory.map(element => element.total).reduce((a,b) => a + b, 0);
    balanceValue += Number(completeTotal);
    currentOrder.total = 0;
    currentOrder.items = [];
    foodOrdered.textContent = '';
    
};

if (addOrderBtn) {
    addOrderBtn.addEventListener('click', addOrderButton);
}; 


// secondpage
const orderBeingPrepared = async(parent) => new Promise((resolve, reject) =>{
    
      setTimeout(() => {
        parent.classList.remove('checkMark')
        parent.classList.add('cooking')
        resolve()
      }, 2000)
     })

const orderPrepared = (parent) => new Promise((resolve, reject) => {
      setTimeout(() => {
        parent.classList.remove('cooking')
        parent.classList.add('prepared')
        resolve();
      }, 10000)
    })

const orderHandedOver = (parent) => new Promise((resolve, reject) => {
      setTimeout(() => {
        parent.classList.remove('prepared');
        parent.classList.add('handedOver')
        resolve()
      }, 5000)
    })

const orderOnTheWay = (parent) => new Promise((resolve, reject) => {
      setTimeout(() => {
        parent.classList.remove('handedOver');
        parent.classList.add('onTheWay')
        resolve()
      }, 3000)
    })

const orderReachedDestintaion = (parent) => new Promise((resolve, reject) => {
      setTimeout(() => {
        parent.classList.remove('onTheWay');
        parent.classList.add('destination');
        resolve()
      }, 8000)
    })

const orderDelivered = (parent) => new Promise((resolve, reject) => {
      setTimeout(() => {
        parent.classList.remove('destination');
        parent.classList.add('delivered');
        resolve()
      }, 4000)
})

    

listOrderList.addEventListener('click', createOrderList)

//placeOrder()