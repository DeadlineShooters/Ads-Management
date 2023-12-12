const { PlacesService } = await google.maps.importLibrary('places');
let map;
let marker;
let latLng;
let violatePoints = [];
let adsPoints = document.querySelectorAll('[class^="ads-point__info"]');
let adsPointMarkers = [];

async function initMap() {
    let { Map } = await google.maps.importLibrary('maps');
    let { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
    map = new Map(document.getElementById('map'), {
        zoom: 17,
        center: { lat: 10.762860099114166, lng: 106.68247164106691 },
        mapId: 'b5843dc40c0a251c',
        mapTypeControl: false,
    });

    adsPoints.forEach((item) => {
        let adsPoint = document.createElement('div');
        adsPoint.className = 'ads-point';
        if (item.dataset.violate == 'true') {
            adsPoint.classList.add('violate');
        }
        adsPoint.textContent = 'QC';
        adsPoint.setAttribute('data-bs-toggle', 'offcanvas');
        adsPoint.setAttribute('data-bs-target', '#offcanvas');
        adsPoint.setAttribute('aria-controls', 'offcanvas');

        adsPoint.appendChild(item);
        let adsPointMarker = new AdvancedMarkerElement({
            map,
            position: { lat: parseFloat(item.dataset.lat), lng: parseFloat(item.dataset.lng) },
            content: adsPoint,
        });

        adsPointMarkers.push(adsPointMarker);

        adsPointMarker.addListener('click', () => {});
    });

    // Điểm qc có báo cáo
    let adsPointViolate = document.createElement('div');
    adsPointViolate.className = 'ads-point violate';
    adsPointViolate.textContent = 'QC';
    adsPointViolate.setAttribute('data-bs-toggle', 'offcanvas');
    adsPointViolate.setAttribute('data-bs-target', '#offcanvas1');
    adsPointViolate.setAttribute('aria-controls', 'offcanvas1');

    let adsPointInfo1 = document.querySelector('.ads-point__info1');
    adsPointViolate.appendChild(adsPointInfo1);

    let adsPointViolateMarker = new AdvancedMarkerElement({
        map,
        position: { lat: 10.761652498419975, lng: 106.68135233505905 },
        content: adsPointViolate,
    });

    adsPointMarkers.push(adsPointViolateMarker);
    violatePoints.push(adsPointViolateMarker);

    adsPointViolateMarker.addListener('click', () => {});

    // Điểm bất kỳ có báo cáo
    let violatePoint = document.createElement('div');
    violatePoint.className = 'violate-point';
    violatePoint.setAttribute('data-bs-toggle', 'offcanvas');
    violatePoint.setAttribute('data-bs-target', '#offcanvas2');
    violatePoint.setAttribute('aria-controls', 'offcanvas2');

    let violatePointMarker = new AdvancedMarkerElement({
        map,
        position: { lat: 10.763670459355707, lng: 106.68418228349817 },
        content: violatePoint,
        zIndex: -1,
    });

    let hoverMarkerInfo = `<div id="hook1" class="click-marker__info">
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
                <a href="/report" class="location__report-btn">
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
        let wrap = $('#hook1').parent().parent().parent();
        wrap.css('padding', '0');
        wrap.css('border', 'none');
        wrap.css('background-color', 'transparent');
        wrap.css('-webkit-box-shadow', 'none');
        wrap.css('border-radius', '0');

        let l = $('#hook1').parent().parent().parent().siblings();
        for (let i = 0; i < l.length; i++) {
            if ($(l[i]).css('z-index') == 'auto') {
                $(l[i]).css('display', 'none');
            }
        }
    });

    violatePointMarker.addListener('click', () => {});

    let isClick = false;
    violatePointMarker.content.addEventListener('click', () => {
        infoWindow.open(map, violatePointMarker);
        isClick = true;
    });

    violatePointMarker.content.addEventListener('mouseover', () => {
        if (isClick && (infoWindow.getMap() == null || typeof infoWindow.getMap() == 'undefined')) {
            isClick = false;
        }
        infoWindow.open(map, violatePointMarker);
    });

    violatePointMarker.content.addEventListener('mouseout', () => {
        if (!isClick) {
            infoWindow.close();
        }
    });

    violatePoints.push(violatePointMarker);

    let violateIcon = document.createElement('i');
    violateIcon.className = 'fa-solid fa-exclamation violate-icon';
    violatePoint.appendChild(violateIcon);

    // Đánh dấu khi click vị trí bất kỳ
    map.addListener('click', (event) => {
        latLng = event.latLng;
        addMarker(latLng);
    });
}

async function addMarker(position) {
    if (marker) {
        marker.setMap(null);
    }

    marker = new google.maps.Marker({
        position,
        map,
    });

    let geocoder = new google.maps.Geocoder();
    let service = new google.maps.places.PlacesService(map);
    let placeName;
    let addr;
    await geocoder.geocode({ latLng: position }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        if (status == google.maps.GeocoderStatus.OK) {
            addr = results[0].formatted_address;
        }
    });

    function getPlaceName() {
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

    placeName = await getPlaceName();

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
                <a href="/report" class="location__report-btn">
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

document.querySelectorAll('.list-panel .ads-item').forEach((item) => {
    item.querySelector('.item__manipulate .more-info__icon').addEventListener('click', () => {
        let content = item.firstElementChild;
        if (content.tagName != 'IMG') {
            content.style.borderTopLeftRadius = '0';
            content.style.borderTopRightRadius = '0';
            let img = document.createElement('img');
            img.className = 'item__img';
            img.src = 'https://img.freepik.com/premium-psd/mockup-rectangular-billboard_196070-273.jpg?w=740';
            img.alt = '';
            img.setAttribute('width', '100%');
            item.insertBefore(img, item.firstChild);
            img.style.border = '1px solid #ccc';
            img.style.borderBottom = 'none';
            img.style.borderTopLeftRadius = '4px';
            img.style.borderTopRightRadius = '4px';

            let expiry = document.createElement('div');
            expiry.className = 'item__expiry';
            expiry.innerHTML = 'Ngày hết hạn hợp đồng: <span>21/12/2023</span>';
            content.insertBefore(expiry, content.lastElementChild);

            let backward = document.createElement('i');
            backward.setAttribute('class', 'fa-solid fa-arrow-left backward-icon');
            item.appendChild(backward);
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

document.querySelectorAll('.list-panel .panel__menu :nth-child(2)').forEach((item) => {
    item.addEventListener('click', function () {
        item.parentElement.parentElement.querySelector('.report-list').classList.remove('d-none');
        item.parentElement.parentElement.querySelector('.ads-list').classList.add('d-none');
        item.classList.add('report-list-active');
        item.parentElement.querySelector(':nth-child(1)').classList.remove('ads-list-active');
    });
});

document.querySelectorAll('.list-panel .panel__menu :nth-child(1)').forEach((item) => {
    item.addEventListener('click', function () {
        item.parentElement.parentElement.querySelector('.ads-list').classList.remove('d-none');
        item.parentElement.parentElement.querySelector('.report-list').classList.add('d-none');
        item.classList.add('ads-list-active');
        item.parentElement.querySelector(':nth-child(2)').classList.remove('report-list-active');
    });
});

let tmpArr;
document.querySelectorAll('.toggle-list input').forEach((item, ind) => {
    item.addEventListener('click', function () {
        if (ind == 0) {
            tmpArr = adsPointMarkers;
        } else {
            tmpArr = violatePoints;
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

initMap();
