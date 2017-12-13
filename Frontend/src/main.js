/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');
    var PizzaOrder = require('./pizza/PizzaOrder');
    var RightPanelOrder =  require('./pizza/RightPanelOrder');
    var LiqPay = require('./LiqPay');
    var GoogleMap = require('./GoogleMaps');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();
    RightPanelOrder.initialiseOrderCart();
    PizzaOrder.iniAll();
    GoogleMap.initialize();


});