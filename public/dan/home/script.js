let map;
let marker;
let latLng;
let markerCluster;
let user = document.getElementById('user');
let adsPoints = document.querySelectorAll('[class^="ads-point__info"]');
let violatedPoints = document.querySelectorAll('[class^="violated-point__latlng"]');
let validAdBoards = [];
let adsPointMarkers = [];
let adsBoardMarkers = [];
let violatedPointMarkers = [];
let markers = [];
const locationButton = document.querySelector('.location-btn');
const { PlacesService, SearchBox } = await google.maps.importLibrary('places');

async function initMap() {
	let { Map } = await google.maps.importLibrary('maps');
	let { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
	map = new Map(document.getElementById('map'), {
		zoom: 14,
		center: { lat: lat, lng: lng },
		mapId: mapId,
		mapTypeControl: false,
	});

	// if (fliedIn) {
	// 	document.querySelector('adpoint')
	// }

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

	// locate user position
	map.controls.push(locationButton);
	locationButton.addEventListener('click', () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
					addMarker(pos);
					map.setCenter(pos);
				},
				() => {
					handleLocationError(true, infoWindow, map.getCenter());
				}
			);
		} else {
			handleLocationError(false, infoWindow, map.getCenter());
		}
	});

	// ads point
	adsPoints.forEach((item, index) => {
		if (item.dataset.lat == lat && item.dataset.lng == lng) item.classList.add('d-block');
		let adsPoint = document.createElement('div');
		adsPoint.className = 'ads-point';
		adsPoint.style.fontSize = '12px';
		adsPoint.style.border = '2px solid #fff';
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
		markers.push(adsPointMarker);

		if (item.dataset.adboard == 'true') {
			adsPoint.textContent = 'QC';
			adsPoint.setAttribute('data-bs-toggle', 'offcanvas');
			adsPoint.setAttribute('data-bs-target', '#offcanvasAP' + index);
			adsPoint.setAttribute('aria-controls', 'offcanvasAP' + index);

			adsPoint.appendChild(item);
			adsBoardMarkers.push(adsPointMarker);
		}
		if (item.dataset.violate == 'true') {
			adsPoint.style.border = '2px solid #d32e2e';
			violatedPointMarkers.push(adsPointMarker);
		}
		if (item.dataset.status == 'Đã quy hoạch') {
			adsPoint.style.backgroundColor = '#4285f4';
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
						let validAdBoard = [];
						adBoards.forEach((item1) => {
							if (!item1.status.localeCompare('Đã duyệt') && new Date(item1.expireDate) >= new Date()) {
								validAdBoard.push(item1);
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
												</div>`;
								console.log(user);
								if (user) {
									offcanvas += `
												<a href="/so/quanly/diem-dat-quang-cao/${item1.adLocation._id}/bang-quang-cao/${item1._id}" class="manipulate__report">
													<span>CHI TIẾT BẢNG QUẢNG CÁO</span>
												</a>
											</div>
										</div>
									</div>`;
								} else {
									offcanvas += `
												<a href="/report?location=${item1.adLocation._id}&board=${item1._id}" class="manipulate__report">
													<i class="fa-solid fa-hexagon-exclamation report__icon"></i>
													<span>BÁO CÁO VI PHẠM</span>
												</a>
											</div>
										</div>
									</div>`;
								}
							}
						});
						validAdBoards[index] = validAdBoard;
						if (noAdBoard) {
							offcanvas += `
                                <div class="report-list__no-report-message">Hiện chưa có bảng quảng cáo nào được đặt tại địa điểm này.</div>`;
						}
						offcanvas += `
                                <div style="padding-top: 8px;"></div>
                            </div>
                            <div class="report-list d-none">`;
						let noReport = [true, true];
						adBoards.forEach((item1) => {
							if (item1.reports != undefined && item1.reports.length != 0) {
								noReport[0] = false;
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
									if (user || (!user && localStorage.phone == item2.phone)) {
										noReport[1] = false;
										offcanvas += `
                                            <div class="content__report-item ${item2.reportType.note}">
                                                <div class="report-item__type">${item2.reportType.name}</div>
                                                <div class="report-item__body">${item2.content}</div>
												<div class="report-item__img">`;
										item2.uploadedImages.forEach((item3) => {
											offcanvas += `
													<img class="img__item" src="${item3.url}">`;
										});
										offcanvas += `
												</div>
												<div class="report-item__status">Trạng thái: <span>${item2.status}</span></div>
                                            </div>`;
									}
								});
								if (noReport[1]) {
									if (!user) {
										offcanvas += `
											<span>Bạn chưa thực hiện báo cáo vi phạm nào về địa điểm này.</span>`;
									}
								}
								noReport[1] = true;
								offcanvas += `
                                        </div>
                                    </div>
                                </div>`;
							}
						});
						if (noReport[0]) {
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
							document.getElementById('home').append(helper.firstChild);
						}
						var offcanvasElement = document.getElementById('offcanvasAP' + index);
						var bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
						bsOffcanvas.show();

						document.querySelectorAll(`#offcanvasAP${index} .ads-item`).forEach((item1, index1) => {
							console.log(validAdBoards[index])
							item1.querySelector('.item__manipulate .more-info__icon').addEventListener('click', () => {
								let content = item1.firstElementChild;
								if (content.tagName != 'IMG') {
									content.style.borderTopLeftRadius = '0';
									content.style.borderTopRightRadius = '0';
									let img = document.createElement('img');
									img.className = 'item__img';
									img.src = `${validAdBoards[index][index1].image.url}`;
									img.alt = '';
									img.setAttribute('width', '100%');
									item1.insertBefore(img, item1.firstChild);
									img.style.border = '1px solid #ccc';
									img.style.borderBottom = 'none';
									img.style.borderTopLeftRadius = '4px';
									img.style.borderTopRightRadius = '4px';

									let expiry = document.createElement('div');
									expiry.className = 'item__expiry';
									expiry.innerHTML = `Ngày hết hạn hợp đồng: <span>${adBoards[index1].expireDate}</span>`;
									content.insertBefore(expiry, content.lastElementChild);

									let backward = document.createElement('i');
									backward.setAttribute('class', 'fa-solid fa-arrow-left backward-icon');
									item1.appendChild(backward);
									backward.style.cssText =
										'position: absolute; top: 0; left: 0; font-size: calc(1.8rem / 1.6); color: #444; padding: 8px; margin: 4px; background-color: rgba(255, 255, 255, 0.7); border-radius: 4px; cursor: pointer;';
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

		violatedPointMarkers.push(violatedPointMarker);
		markers.push(violatedPointMarker);

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
                    </div>`;
		if (!user) {
			hoverMarkerInfo += `
					<a href="/report?id=${item.dataset.id}" class="location__report-btn">
                        <i class="fa-solid fa-hexagon-exclamation item__icon"></i>
                        <span>BÁO CÁO VI PHẠM</span>
                    </a>`;
		}
		hoverMarkerInfo += `			
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
			wrap.children().first().css('overflow', 'hidden');

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
						let noReport = true;
						violatedPoint[0].reports.forEach((item1) => {
							if (user || (!user && localStorage.phone == item1.phone)) {
								noReport = false;
								offcanvas += `
                                    <div class="report-item ${item1.reportType.note}">
                                        <div class="report-item__type">${item1.reportType.name}</div>
                                        <div class="report-item__body">${item1.content}</div>
										<div class="report-item__img">`;
								item1.uploadedImages.forEach((item2) => {
									offcanvas += `
											<img class="img__item" src="${item2.url}">`;
								});
								offcanvas += `
										</div>
										<div class="report-item__status">Trạng thái: <span>${item1.status}</span></div>
									</div>`;
							}
						});
						if (noReport) {
							if (user) {
								offcanvas += `
									<div class="report-list__no-report-message">Hiện chưa có báo cáo vi phạm nào về địa điểm này hoặc các vấn đề
												liên quan đã được giải quyết.</div>`;
							} else {
								offcanvas += `
									<div class="report-list__no-report-message">Bạn chưa thực hiện báo cáo vi phạm nào về địa điểm này.</div>`;
							}
						}
						offcanvas += `
                                    <div style="padding-top: 8px"></div>
                                </div>
                            </div>
                        </div>`;

						var helper = document.createElement('div');
						helper.innerHTML = offcanvas;
						while (helper.firstChild) {
							document.getElementById('home').append(helper.firstChild);
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

		let violatedIcon = document.createElement('i');
		violatedIcon.className = 'fa-solid fa-exclamation violate-icon';
		violatedPoint.appendChild(violatedIcon);
	});

	markers.forEach((item) => {
		item.content.addEventListener('mouseenter', function () {
			this.parentNode.style.zIndex = '10000000';
		});

		item.content.addEventListener('mouseleave', function () {
			this.parentNode.style.zIndex = '-1';
		});
	});

	// reverse geocoding
	map.addListener('click', (event) => {
		const hover = document.querySelector('.troinoi.d-block');
		if (hover) {
			hover.classList.remove('d-block');
		}
		latLng = event.latLng;
		addMarker(latLng);
	});

	markerCluster = new markerClusterer.MarkerClusterer({ markers, map });
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
	let district = await getDistrict(position);
	let ward = await getWard(position);
	console.log(district, ward);

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
                </div>`;
	if (!user) {
		let outRange = true;
		await fetch('/ward')
			.then((response) => response.json())
			.then((wards) => {
				wards.forEach(async (item) => {
					if (item.name == ward.replace('Phường', '').trim() && item.district.name == district.replace('Quận', '').trim()) {
						clickMarkerInfo += `
				<a href="/report?lat=${position.lat()}&lng=${position.lng()}&district=${item.district._id}&ward=${item._id}&address=${addr}" class="location__report-btn">
					<i class="fa-solid fa-hexagon-exclamation item__icon"></i>
					<span>BÁO CÁO VI PHẠM</span>
				</a>`;
						outRange = false;
					}
				});
			});
		if (outRange) {
			clickMarkerInfo += `
				<div class="location__out-range">Địa điểm không nằm trong khu vực quản lí</div>`;
		}
	}
	clickMarkerInfo += `
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
		wrap.children().first().css('overflow', 'hidden');

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
		let tmpArr;
		if (ind == 0) {
			tmpArr = adsBoardMarkers;
		} else if (ind == 1) {
			tmpArr = adsPointMarkers.filter((item, ind) => {
				return !adsBoardMarkers.includes(item);
			});
		} else if (ind == 2) {
			tmpArr = violatedPointMarkers;
		} else if (ind == 3) {
			tmpArr = adsPointMarkers.filter((item, ind) => {
				return adsPoints[ind].dataset.status == 'Đã quy hoạch';
			});
		} else {
			tmpArr = adsPointMarkers.filter((item, ind) => {
				return adsPoints[ind].dataset.status != 'Đã quy hoạch';
			});
		}
		if (this.checked) {
			for (let x of tmpArr) {
				markers.push(x);
				x.setMap(map);
			}
		} else {
			for (let x of tmpArr) {
				let index = markers.indexOf(x);
				if (index > -1) {
					markers.splice(index, 1);
				}
				x.setMap(null);
			}
		}
		markerCluster.setMap(null);
		markerCluster = new markerClusterer.MarkerClusterer({ markers, map });
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

function getWard(position) {
	let geocoder = new google.maps.Geocoder();
	return new Promise((resolve, reject) => {
		geocoder.geocode({ latLng: position }, function (results, status) {
			if (status !== google.maps.GeocoderStatus.OK) {
				reject(status);
			}
			if (status == google.maps.GeocoderStatus.OK) {
				for (let result of results) {
					for (let item of result.address_components) {
						if (item.types.includes('administrative_area_level_3')) {
							resolve(item.long_name);
							return;
						}
					}
				}
				resolve(null);
			}
		});
	});
}

function getDistrict(position) {
	let geocoder = new google.maps.Geocoder();
	return new Promise((resolve, reject) => {
		geocoder.geocode({ latLng: position }, function (results, status) {
			if (status !== google.maps.GeocoderStatus.OK) {
				reject(status);
			}
			if (status == google.maps.GeocoderStatus.OK) {
				for (let result of results) {
					for (let item of result.address_components) {
						if (item.types.includes('administrative_area_level_2')) {
							resolve(item.long_name);
							return;
						}
					}
				}
				resolve(null);
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
				radius: '50',
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

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : "Error: Your browser doesn't support geolocation.");
	infoWindow.open(map);
}

initMap();
