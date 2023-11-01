function initMap() {
	const myLatLng = { lat: 10.762860099114166, lng: 106.68247164106691 };
	const map = new google.maps.Map(document.getElementById("map"), {
	 	zoom: 17,
	  	center: myLatLng,
		mapTypeControl: false,
	});
  
	new google.maps.Marker({
	  	position: myLatLng,
	  	map,
	  	title: "Hello World!",
	});
}
  
window.initMap = initMap;