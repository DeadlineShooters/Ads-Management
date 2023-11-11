let map;
let marker;
let latLng;

async function initMap() {
	let { Map } = await google.maps.importLibrary("maps");
	let { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
	map = new Map(document.getElementById("map"), {
		zoom: 17,
		center: { lat: 10.762860099114166, lng: 106.68247164106691 },
		mapId: "4da86483d3585bb",
		mapTypeControl: false,
	});
	const geocoder = new google.maps.Geocoder();
	const infoWindow = new google.maps.InfoWindow();

	// Khởi tạo điểm qc
	let adsPoint = document.createElement("div");
	adsPoint.className = "ads-point";
	adsPoint.textContent = "QC";

	// Thêm thông tin sơ bộ cho điểm qc
	let adsPointInfo = document.querySelector(".ads-point__info");
	adsPoint.appendChild(adsPointInfo);

	// Thêm điểm qc vào map
	let adsPointMarker = new AdvancedMarkerElement({
		map,
		position: { lat: 10.76122515287606, lng: 106.68615638913559 },
		content: adsPoint,
	});

	// Đảm bảo sự kiện hoạt động
	adsPointMarker.addListener("click", () => { });

	// Điểm qc có báo cáo
	let adsPointViolate = document.createElement("div");
	adsPointViolate.className = "ads-point violate";
	adsPointViolate.textContent = "QC";

	let adsPointViolateMarker = new AdvancedMarkerElement({
		map,
		position: { lat: 10.761652498419975, lng: 106.68135233505905 },
		content: adsPointViolate,
	});

	// Điểm bất kỳ có báo cáo
	let violatePoint = document.createElement("div");
	violatePoint.className = "violate-point";

	let violatePointMarker = new AdvancedMarkerElement({
		map,
		position: { lat: 10.763670459355707, lng: 106.68418228349817 },
		content: violatePoint,
		zIndex: -1,
	});
	let violateIcon = document.createElement("i");
	violateIcon.className = "fa-solid fa-exclamation violate-icon";
	violatePoint.appendChild(violateIcon);
}
  
initMap();