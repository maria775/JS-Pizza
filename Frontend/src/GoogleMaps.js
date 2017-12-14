function initialize() {
//Тут починаємо працювати з картою
    var mapProp =	{
        center:	new	google.maps.LatLng(50.464379,30.519131),
        zoom:	13
    };
    var html_element =	document.getElementById("googleMap");
    var map	=	new	google.maps.Map(html_element, mapProp);

    var oldMarker = null;

    google.maps.event.addListener(map, 'click',function(me){
            var coordinates	= me.latLng;
//coordinates	- такий самий об’єкт як створений new

            if(oldMarker){
                oldMarker.setMap(null);
                oldMarker = null;
            }

        // var point	=	new	google.maps.LatLng(50.464379,30.519131);
        oldMarker	=	new	google.maps.Marker({
            position:	coordinates,
//map	- це змінна карти створена за допомогою new

            map: map,
            icon:"assets/images/map-icon.png"
    });

    });
//Карта створена і показана
}
//Коли сторінка завантажилась
google.maps.event.addDomListener(window,'load',	initialize);
exports.initialize = initialize;