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

	// Đánh dấu khi click vị trí bất kỳ
	map.addListener("click", (event) => {
		latLng = event.latLng;
		addMarker(latLng);
		// geocoder.geocode({
		// 	'latLng': event.latLng
		// }, function (results, status) {
		// 	if (status == google.maps.GeocoderStatus.OK) {
		// 		if (results[0]) {
		// 			alert(results[0].formatted_address);
		// 		}
		// 	}
		// });
	});
}

function addMarker(position) {
	if (marker) {
		marker.setMap(null);
	}

	marker = new google.maps.Marker({
		position,
		map,
	});

	let clickMarkerInfo =
		`<div id="hook" class="click-marker__info">
        <div class="info__ads info__item">
            <i class="fa-light fa-circle-info item__icon"></i>
            <div class="item__body">
                <div class="item__title">Thông tin bảng quảng cáo</div>
                <div class="item__content">
                    <div style="font-weight: 600; margin-bottom: 8px;">Chưa có dữ liệu!</div>
                    Vui lòng chọn điểm quảng cáo để xem.
                </div>
            </div>
        </div>
        <div class="info__location info__item">
            <i class="fa-light fa-circle-check item__icon"></i>
            <div class="item__body">
                <div class="item__title">Thông tin địa điểm</div>
                <div class="item__content">
                    <div class="location__name">Quân Chủng Hải Quân - Trung Tâm Văn Phòng Thương Mại Hải Quân</div>
                    <div class="location__addr">15, Đường Lê Thánh Tôn, Phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh</div>
                </div>
                <div class="location__report-btn">
                    <i class="fa-solid fa-hexagon-exclamation item__icon"></i>
                    <span>BÁO CÁO VI PHẠM</span>
                </div>
            </div>
        </div>
    </div>`
	const infoWindow = new google.maps.InfoWindow({
		content: clickMarkerInfo,
	});

	infoWindow.open({
		anchor: marker,
		map,
	});

	google.maps.event.addListener(infoWindow, 'domready', function () {
		let wrap = $('#hook').parent().parent().parent();
		wrap.css('padding', '0');
		wrap.css('border', 'none');
		wrap.css('background-color', 'transparent');
		wrap.css('-webkit-box-shadow', 'none');
		wrap.css('border-radius', '0');

		let l = $('#hook').parent().parent().parent().siblings();
		for (let i = 0; i < l.length; i++) {
			if ($(l[i]).css('z-index') == 'auto') {
				$(l[i]).css('display', 'none');
			}
		}
	});
}

initMap();