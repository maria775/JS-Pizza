var $name_and_surname = $("#inputName");
var $telephone_number = $("#inputPhone");
var $address = $("#inputAddress");

var  $users_name = $('.users-name');
var $users_phone_number = $('.users-phone-number');
var $users_address = $('.users-address');

var $name_help_block = $('.name-help-block');
var $phone_help_block = $('.phone-help-block');
var $address_help_block = $('.address-help-block');

var $next_step_button = $('#next');
var PizzaLocStorage = require('../../www/PizzaLocStorage');
var API = require('../API');
var LiqPay = require('../LiqPay');
//var $nextButton = $('next_button');

var OrderPizzaInfo = [];

OrderPizzaInfo = PizzaLocStorage.get('cart');



function initAll(){
    validate();
  //  validateName();
  //  validateTelephone();
  //  validateAddress();
    initNextBtn();

}

function initNextBtn() {
    $next_step_button.click(function(){
            serverValidation();
    });
}

function validate (){
    $name_and_surname.bind('input propertychange', validateName);
    $telephone_number.bind('input propertychange', validateTelephone);
    $address.bind('input propertychange', validateAddress);
}

function validateName (){
    if ($name_and_surname.val().trim()===""){
        $users_name.addClass('has-error');
        $users_name.removeClass('has-success');
        $name_help_block.show();
    } else{
        $users_name.addClass('has-success');
        $users_name.removeClass('has-error');
        $name_help_block.hide();
    }
}

function validateTelephone (){
    if ($telephone_number.val().trim()===""){
        $users_phone_number.addClass('has-error');
        $users_phone_number.removeClass('has-success');
        $phone_help_block.show();
    } else{
        $users_phone_number.addClass('has-success');
        $users_phone_number.removeClass('has-error');
        $phone_help_block.hide();
    }
}

function validateAddress (){
    if ($address.val().trim()===""){
        $users_address.addClass('has-error');
        $users_address.removeClass('has-success');
        $address_help_block.show();
    } else{
        $users_address.addClass('has-success');
        $users_address.removeClass('has-error');
        $address_help_block.hide();
    }
}





function serverValidation() {
    var Data = {
        users_name: $users_name.val(),
        users_phonenumb: $users_phone_number.val(),
        users_address: $users_address.val(),
        order_pizza_info:OrderPizzaInfo


    };

    API.createOrder(Data, function (err,res){
            if (err){
                alert('The website failed to register your order');
            }
            else {
                console.log(res.data);
                LiqPay.initializeLiqPay(res.data,res.signature);
            }
        }

    );


}



exports.iniAll = initAll;