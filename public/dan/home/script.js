import { MarkerClusterer } from "https://cdn.skypack.dev/@googlemaps/markerclusterer@2.0.3";
let map;
let marker;
let latLng;
let adsPoints = document.querySelectorAll('[class^="ads-point__info"]');
let violatedPoints = document.querySelectorAll('[class^="violated-point__latlng"]');
let adsPointMarkers = [];
let violatedPointMarkers = [];
const { PlacesService, SearchBox } = await google.maps.importLibrary('places');

async function initMap() {
	let { Map } = await google.maps.importLibrary('maps');
	let { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
	map = new Map(document.getElementById('map'), {
		zoom: 17,
		center: { lat: 10.762860099114166, lng: 106.68247164106691 },
		mapId: '20c0578c16bcc075',
		mapTypeControl: false,
	});

	// searchbar
	const searchInput = document.querySelector('.search-bar__input');
	const searchBox = new google.maps.places.SearchBox(searchInput);

	map.addListener('bounds_changed', () => {
		searchBox.setBounds(map.getBounds());
	});

	let searchMarkers = [];

	searchBox.addListener('places_changed', () => {
		const places = searchBox.getPlaces();

		if (places.length == 0) {
			return;
		}

		searchMarkers.forEach((marker) => {
			marker.setMap(null);
		});
		searchMarkers = [];

		const bounds = new google.maps.LatLngBounds();

		places.forEach((place) => {
			if (!place.geometry || !place.geometry.location) {
				console.log('Returned place contains no geometry');
				return;
			}

			const icon = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25),
			};

			searchMarkers.push(
				new google.maps.Marker({
					map,
					icon,
					title: place.name,
					position: place.geometry.location,
				})
			);
			if (place.geometry.viewport) {
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
		map.fitBounds(bounds);
	});

	// searchbar clear
	document.querySelector('.search-bar__close-icon').addEventListener('click', function () {
		document.querySelector('.search-bar__input').value = '';
	});

	// ads point
	adsPoints.forEach((item, index) => {
		let adsPoint = document.createElement('div');
		adsPoint.className = 'ads-point';
		adsPoint.textContent = 'QC';
		adsPoint.setAttribute('data-bs-toggle', 'offcanvas');
		adsPoint.setAttribute('data-bs-target', '#offcanvasAP' + index);
		adsPoint.setAttribute('aria-controls', 'offcanvasAP' + index);

		adsPoint.appendChild(item);
		let adsPointMarker = new AdvancedMarkerElement({
			map,
			position: { lat: parseFloat(item.dataset.lat), lng: parseFloat(item.dataset.lng) },
			content: adsPoint,
		});

		adsPointMarkers.push(adsPointMarker);
		if (item.dataset.violate == 'true') {
			adsPoint.classList.add('violate');
			violatedPointMarkers.push(adsPointMarker);
		}

		adsPointMarker.addListener('click', () => {
			// create offcanvas
			if (!document.getElementById(`offcanvasAP${index}`)) {
				fetch('/adboards/' + item.dataset.id)
					.then((response) => response.json())
					.then((adBoards) => {
						let offcanvas = `
                    <div class="list-panel offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasAP${index}" aria-labelledby="offcanvasLabelAP${index}">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasLabelAP${index}">Danh sách bảng quảng cáo</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <div class="panel__menu">
                                <i class="fa-regular fa-bars-staggered menu__icon ads-list-active"></i>
                                <i class="fa-solid fa-hexagon-exclamation menu__icon"></i>
                            </div>
                            <div class="ads-list">`;
						let noAdBoard = true;
						adBoards.forEach((item1) => {
							noAdBoard = false;
							offcanvas += `
                                <div class="ads-item">
                                    <div class="item__content">
                                        <div class="item__title">${item1.boardType.name}</div>
                                        <div class="item__addr">${item1.adLocation.address}</div>
                                        <div class="item__size">Kích thước: <span>${item1.size.h}m x ${item1.size.w}m</span></div>
                                        <div class="item__quantity">Số lượng: <span>${item1.quantity} trụ / bảng</span></div>
                                        <div class="item__type">Hình thức: <span>${item1.adLocation.adType.name}</span></div>
                                        <div class="item__category">Phân loại: <span>${item1.adLocation.type.name}</span></div>
                                        <div class="item__manipulate">
                                            <div class="manipulate__more-info"><i
                                                    class="fa-light fa-circle-info more-info__icon"></i>
                                            </div>
                                            <a href="/report?location=${item1.adLocation._id}&board=${item1._id}" class="manipulate__report">
                                                <i class="fa-solid fa-hexagon-exclamation report__icon"></i>
                                                <span>BÁO CÁO VI PHẠM</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>`;
						});
						if (noAdBoard) {
							offcanvas += `
                                <div class="report-list__no-report-message">Hiện chưa có bảng quảng cáo nào được đặt tại địa điểm này.</div>`;
						}
						offcanvas += `
                                <div style="padding-top: 8px;"></div>
                            </div>
                            <div class="report-list d-none">`;
						let noReport = true;
						adBoards.forEach((item1) => {
							if (item1.reports != undefined && item1.reports.length != 0) {
								noReport = false;
								offcanvas += `
                                <div class="report-item">
                                    <div class="report-item__info">
                                        <div class="info__title">${item1.boardType.name}</div>
                                        <div class="info__size">Kích thước: <span>${item1.size.h}m x ${item1.size.w}m</span></div>
                                        <div class="info__quantity">Số lượng: <span>${item1.quantity} trụ / bảng</span></div>
                                        <div class="info__type">Hình thức: <span>${item1.adLocation.adType.name}</span></div>
                                        <div class="info__category">Phân loại: <span>${item1.adLocation.type.name}</span></div>
                                    </div>
                                    <hr />
                                    <div class="report-item__content">
                                        <div class="content__title">
                                            <i class="fa-solid fa-hexagon-exclamation title__icon"></i>
                                            <span>Báo cáo vi phạm</span>
                                        </div>
                                        <div class="content__report-list">`;
								item1.reports.forEach((item2) => {
									offcanvas += `
                                            <div class="content__report-item ${item2.reportType.note}">
                                                <div class="report-item__type">${item2.reportType.name}</div>
                                                <div class="report-item__body">${item2.content}</div>
                                            </div>`;
								});
								offcanvas += `
                                        </div>
                                    </div>
                                </div>`;
							}
						});
						if (noReport) {
							offcanvas += `
                                <div class="report-list__no-report-message">Hiện chưa có báo cáo vi phạm nào về địa điểm này hoặc các vấn đề
                                            liên quan đã được giải quyết.</div>`;
						}
						offcanvas += `
                                <div style="padding-top: 8px;"></div>
                            </div>
                        </div>
                    </div>`;

						var helper = document.createElement('div');
						helper.innerHTML = offcanvas;
						while (helper.firstChild) {
							document.body.insertBefore(helper.firstChild, document.querySelector('body script'));
						}
						var offcanvasElement = document.getElementById('offcanvasAP' + index);
						var bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
						bsOffcanvas.show();

						document.querySelectorAll(`#offcanvasAP${index} .ads-item`).forEach((item1, index1) => {
							item1.querySelector('.item__manipulate .more-info__icon').addEventListener('click', () => {
								let content = item1.firstElementChild;
								if (content.tagName != 'IMG') {
									content.style.borderTopLeftRadius = '0';
									content.style.borderTopRightRadius = '0';
									let img = document.createElement('img');
									img.className = 'item__img';
									img.src = `${adBoards[index1].image.url}`;
									img.alt = '';
									img.setAttribute('width', '100%');
									item1.insertBefore(img, item1.firstChild);
									img.style.border = '1px solid #ccc';
									img.style.borderBottom = 'none';
									img.style.borderTopLeftRadius = '4px';
									img.style.borderTopRightRadius = '4px';

									let expiry = document.createElement('div');
									expiry.className = 'item__expiry';
									expiry.innerHTML = `Ngày hết hạn hợp đồng: <span>${adBoards[index1].expireDate.d}/${adBoards[index1].expireDate.m}/${adBoards[index1].expireDate.y}</span>`;
									content.insertBefore(expiry, content.lastElementChild);

									let backward = document.createElement('i');
									backward.setAttribute('class', 'fa-solid fa-arrow-left backward-icon');
									item1.appendChild(backward);
									backward.style.cssText = 'position: absolute; top: 0; left: 0; font-size: 1.8rem; color: #444; padding: 12px;';
									backward.addEventListener('click', () => {
										img.remove();
										expiry.remove();
										backward.remove();
										content.style.borderTopLeftRadius = '4px';
										content.style.borderTopRightRadius = '4px';
									});
								}
							});
						});

						document.querySelectorAll(`#offcanvasAP${index} .panel__menu :nth-child(2)`).forEach((item) => {
							item.addEventListener('click', function () {
								item.parentElement.parentElement.querySelector('.report-list').classList.remove('d-none');
								item.parentElement.parentElement.querySelector('.ads-list').classList.add('d-none');
								item.classList.add('report-list-active');
								item.parentElement.querySelector(':nth-child(1)').classList.remove('ads-list-active');
							});
						});

						document.querySelectorAll(`#offcanvasAP${index} .panel__menu :nth-child(1)`).forEach((item) => {
							item.addEventListener('click', function () {
								item.parentElement.parentElement.querySelector('.ads-list').classList.remove('d-none');
								item.parentElement.parentElement.querySelector('.report-list').classList.add('d-none');
								item.classList.add('ads-list-active');
								item.parentElement.querySelector(':nth-child(2)').classList.remove('report-list-active');
							});
						});
					})
					.catch((error) => console.error('Error:', error));
			}
		});
	});

	// violated point
	violatedPoints.forEach(async (item, index) => {
		let violatedPoint = document.createElement('div');
		let position = { lat: parseFloat(item.dataset.lat), lng: parseFloat(item.dataset.lng) };
		violatedPoint.className = 'violated-point';
		violatedPoint.setAttribute('data-bs-toggle', 'offcanvas');
		violatedPoint.setAttribute('data-bs-target', '#offcanvasVP' + index);
		violatedPoint.setAttribute('aria-controls', 'offcanvasVP' + index);

		let violatedPointMarker = new AdvancedMarkerElement({
			map,
			position: position,
			content: violatedPoint,
			zIndex: -1,
		});
		let addr;
		await getAddress(position).then((res) => (addr = res));
		let placeName = await getPlaceName(position);

		let hoverMarkerInfo = `<div id="hook${index}" class="click-marker__info">
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
                        <div class="location__name">${placeName}</div>
                        <div class="location__addr">${addr}</div>
                    </div>
                    <a href="/report?id=${item.dataset.id}" class="location__report-btn">
                        <i class="fa-solid fa-hexagon-exclamation item__icon"></i>
                        <span>BÁO CÁO VI PHẠM</span>
                    </a>
                </div>
            </div>
        </div>`;

		const infoWindow = new google.maps.InfoWindow({
			content: hoverMarkerInfo,
		});

		google.maps.event.addListener(infoWindow, 'domready', function () {
			let wrap = $(`#hook${index}`).parent().parent().parent();
			wrap.css('padding', '0');
			wrap.css('border', 'none');
			wrap.css('background-color', 'transparent');
			wrap.css('-webkit-box-shadow', 'none');
			wrap.css('border-radius', '0');

			let l = $(`#hook${index}`).parent().parent().parent().siblings();
			for (let i = 0; i < l.length; i++) {
				if ($(l[i]).css('z-index') == 'auto') {
					$(l[i]).css('display', 'none');
				}
			}
		});

		violatedPointMarker.addListener('click', () => {
			// create offcanvas
			if (!document.getElementById(`offcanvasVP${index}`)) {
				fetch('/violatedpoint/' + item.dataset.id)
					.then((response) => response.json())
					.then((violatedPoint) => {
						let offcanvas = `<div
                            class="list-panel report offcanvas offcanvas-start"
                            data-bs-scroll="true"
                            data-bs-backdrop="false"
                            tabindex="-1"
                            id="offcanvasVP${index}"
                            aria-labelledby="offcanvasLabelVP${index}"
                        >
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="offcanvasLabelVP${index}">
                                    <i class="fa-solid fa-hexagon-exclamation offcanvas-title__icon"></i>
                                    <span>Báo cáo vi phạm</span>
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">
                                <div class="report-list">`;
						violatedPoint[0].reports.forEach((item1) => {
							offcanvas += `
                                    <div class="report-item ${item1.reportType.note}">
                                        <div class="report-item__type">${item1.reportType.name}</div>
                                        <div class="report-item__body">${item1.content}</div>
                                    </div>`;
						});
						offcanvas += `
                                    <div style="padding-top: 8px"></div>
                                </div>
                            </div>
                        </div>`;

						var helper = document.createElement('div');
						helper.innerHTML = offcanvas;
						while (helper.firstChild) {
							document.body.insertBefore(helper.firstChild, document.querySelector('body script'));
						}
						var offcanvasElement = document.getElementById('offcanvasVP' + index);
						var bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
						bsOffcanvas.show();
					})
					.catch((error) => console.error('Error:', error));
			}
		});

		let isClick = false;
		violatedPointMarker.content.addEventListener('click', () => {
			infoWindow.open(map, violatedPointMarker);
			isClick = true;
		});

		violatedPointMarker.content.addEventListener('mouseover', () => {
			if (isClick && (infoWindow.getMap() == null || typeof infoWindow.getMap() == 'undefined')) {
				isClick = false;
			}
			infoWindow.open(map, violatedPointMarker);
		});

		violatedPointMarker.content.addEventListener('mouseout', () => {
			if (!isClick) {
				infoWindow.close();
			}
		});

		violatedPointMarkers.push(violatedPointMarker);

		let violatedIcon = document.createElement('i');
		violatedIcon.className = 'fa-solid fa-exclamation violate-icon';
		violatedPoint.appendChild(violatedIcon);
	});

	new MarkerClusterer({ adsPointMarkers, map });
	// reverse geocoding
	map.addListener('click', (event) => {
		latLng = event.latLng;
		addMarker(latLng);
	});

	// new MarkerClusterer(map, adsPointMarkers);
}
// reverse geocoding
async function addMarker(position) {
	if (marker) {
		marker.setMap(null);
	}

	marker = new google.maps.Marker({
		position,
		map,
	});

	let addr;
	await getAddress(position).then((res) => (addr = res));
	let placeName = await getPlaceName(position);

	let clickMarkerInfo = `<div id="hook" class="click-marker__info">
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
                    <div class="location__name">${placeName}</div>
                    <div class="location__addr">${addr}</div>
                </div>
                <a href="/report?lat=${position.lat()}&lng=${position.lng()}" class="location__report-btn">
					<i class="fa-solid fa-hexagon-exclamation item__icon"></i>
                    <span>BÁO CÁO VI PHẠM</span>
                </a>
            </div>
        </div>
    </div>`;

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

let tmpArr;
document.querySelectorAll('.toggle-list input').forEach((item, ind) => {
	item.addEventListener('click', function () {
		if (ind == 0) {
			tmpArr = adsPointMarkers;
		} else {
			tmpArr = violatedPointMarkers;
		}
		if (this.checked) {
			for (let x of tmpArr) {
				x.setMap(map);
			}
		} else {
			for (let x of tmpArr) {
				x.setMap(null);
			}
		}
	});
});

function getAddress(position) {
	let geocoder = new google.maps.Geocoder();
	return new Promise((resolve, reject) => {
		geocoder.geocode({ latLng: position }, function (results, status) {
			if (status !== google.maps.GeocoderStatus.OK) {
				reject(status);
			}
			if (status == google.maps.GeocoderStatus.OK) {
				resolve(results[0].formatted_address);
			}
		});
	});
}

function getPlaceName(position) {
	let service = new google.maps.places.PlacesService(map);
	return new Promise((resolve, reject) => {
		service.nearbySearch(
			{
				location: position,
				radius: '10',
				fields: ['name', 'geometry'],
			},
			function (results, status) {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					resolve(results[1].name);
				} else {
					reject(status);
				}
			}
		);
	});
}

initMap();
