/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaLocStorage = require('../../www/PizzaLocStorage');



//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function refresh(){
    Cart = [];
    updateCart();
}

// $node.find(".appetizer").click(function () {
//     $node.find(".appetizer").hide();
// });

function checkIfPizzaNotDublified(pizza, size){
    for (var i = 0; i<Cart.length; i++){
        if(JSON.stringify(Cart[i].pizza) == JSON.stringify(pizza) && size == Cart[i].size)
            return i;
    }
    return -1;
}

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом
    var index = checkIfPizzaNotDublified(pizza, size);

    if (index >-1){
        Cart[index].quantity +=1;
    }
    else {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });

    }

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика

    var index = checkIfPizzaNotDublified(cart_item.pizza, cart_item.size);

    if (index !==-1){
        Cart.splice(index, 1);
    }

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    var loaded = PizzaLocStorage.get('cart');
    if(loaded){
        Cart = loaded;
    }

    $(".clear-orders").click(function () {
        refresh();
    });

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html($("#appetizer-text"));

    var orderQuantity = 0;
    var orderSum = 0;



    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        //if (document.href == "/"){
        var html_code = Templates.PizzaCart_OneItem(cart_item);
        // }
        // else if (document.href == "/order.html"){
        //    var html_code = Templates.PizzaCart_OneItemOrder(cart_item);
        // }

        orderQuantity += 1;

        orderSum += cart_item.quantity*cart_item.pizza[cart_item.size].price;

        var $node = $(html_code);

        var appetizer = $node.find(".appetizer");

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            //$node.find(".minus").prop("disabled", false);

            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".minus").click(function(){
            //Зменшуємо кількість замовлених піц
            if (cart_item.quantity > 1) {
                cart_item.quantity -= 1;
                //Оновлюємо відображення
            }

            else{
                removeFromCart(cart_item);
                // appetizer.show();
                // orderQuantity.hide();
                // orderSum.hide();
            }
            updateCart();
        });

        $node.find(".remove").click(function(){
            //$node.hide();
            removeFromCart(cart_item);

        });


        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);

    if (Cart.length==0){
        $("#appetizer-text").show();
    }
    else{
        $("#appetizer-text").hide();
    }

    PizzaLocStorage.set('cart', Cart);

    $(".orders-count").text(orderQuantity);
    $(".sum").text(orderSum);

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;