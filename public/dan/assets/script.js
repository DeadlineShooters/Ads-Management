const adsPoint = document.createElement("div");

adsPoint.className = "ads-point";
adsPoint.textContent = "QC";

const adsPointInfo = document.querySelector(".ads-point__info");
adsPoint.appendChild(adsPointInfo);

async function initMap() {
	const { Map } = await google.maps.importLibrary("maps");
  	const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
	const myLatLng = { lat: 10.762860099114166, lng: 106.68247164106691 };
	const map = new Map(document.getElementById("map"), {
	 	zoom: 17,
	  	center: myLatLng,
		mapId: "d0bfe1c8a852a975",
		mapTypeControl: false,
	});
  
	new google.maps.Marker({
	  	position: myLatLng,
	  	map,
	  	title: "Hello World!",
	});

	const marker = new AdvancedMarkerElement({
		map,
		position: { lat: 10.76122515287606, lng: 106.68615638913559 },
		content: adsPoint,
	});
	
	marker.addListener('click', () => {});
}
  
initMap();