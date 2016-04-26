var map = L.map('map');
var popup = L.popup();

L.tileLayer('https://api.tiles.mapbox.com/v4/scarro.ppial27m/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2NhcnJvIiwiYSI6ImNpbmhtdWdnaTAwMmd2ZGx5eHhsaWs5YzEifQ.FONk5Fvpiz12ehN8ByO2GA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
}).addTo(map);

function onLocationFound(e){
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    alert(e.message);
}

function onMapClick(e){
	popup.setLatLng(e.latlng).setContent("Has hecho click en: " + e.latlng.toString())
	.openOn(map);
}

map.on('click', onMapClick);
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView:true, maxZoom:10});

//Definimos una clase icono
var LeafIcon = L.Icon.extend({
	options: {
		shadowUrl: 'images/leaf-shadow.png',
		iconSize: 		[38, 95],
		shadowSize:  	[50,64],
		iconAnchor:  	[22,94],
		shadowAnchor:  	[4,62],
		popupAnchor: 	[-3, -76]
	}
});

//Creamos los 3 iconos
var greenIcon = new LeafIcon({iconUrl: 'images/leaf-green.png'});
var redIcon = new LeafIcon({iconUrl: 'images/leaf-red.png'});
var orangeIcon = new LeafIcon({iconUrl: 'images/leaf-orange.png'});

L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
L.marker([51.19962, 6.43773], {icon: redIcon}).addTo(map);
L.marker([53.7954, -1.54667], {icon: orangeIcon}).addTo(map);