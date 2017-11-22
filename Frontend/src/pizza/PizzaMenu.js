/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy_big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy_small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру
        //pizza_shown.push(pizza);

        if (filter === "all")
            pizza_shown.push(pizza);

        if (filter === "meat")
            if (pizza.content.meat || pizza.content.chicken)
                pizza_shown.push(pizza);

        if (filter === "pineapple")
            if (pizza.content.pineapple)
                pizza_shown.push(pizza);

        if (filter === "mushroom")
            if (pizza.content.mushroom)
                pizza_shown.push(pizza);
        if (filter === "ocean")
            if (pizza.content.ocean)
                pizza_shown.push(pizza);

        if (filter === "vega")
            if ( !pizza.content.meat && !pizza.content.chicken && !pizza.content.ocean)
                pizza_shown.push(pizza);


    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List);

    $("#filter-button-all-types").click(function () {
        filterPizza("all");
        orange_button_activate($(this));
    });

    $("#filter-button-meat").click(function () {
        filterPizza("meat");
        orange_button_activate($(this));
    });

    $("#filter-button-pineapples").click(function () {
        filterPizza("pineapple");
        orange_button_activate($(this));
    });

    $("#filter-button-mushrooms").click(function () {
        filterPizza("mushroom");
        orange_button_activate($(this));
    });

    $("#filter-button-seafood").click(function () {
        filterPizza("ocean");
        orange_button_activate($(this));
    });

    $("#filter-button-veggies").click(function () {
        filterPizza("vega");
        orange_button_activate($(this));
    });
}

function orange_button_activate (button_activate){
    $(".btn-warning").removeClass("btn-warning");
    button_activate.addClass("btn-warning");
}



exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;