
    function resizeInput(input) {
        input.style.width = input.value.length + 'ch';
    }

    const globeIcon = document.querySelector('.globe-icon');
    globeIcon.style = 'cursor:pointer';
    // const map = undefined;
    globeIcon.onclick = () => {
        document.querySelector('#map-window').classList.remove('d-none');
        mapboxgl.accessToken = 'pk.eyJ1IjoibnRraWV0IiwiYSI6ImNsbndjM3pueDA2c3UybHBkbTRxeXl3em0ifQ.NGgwcE0h5N-KkQdlGFIVgA';

        const map = new mapboxgl.Map({
            container: 'map', // container ID
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [106.68247164106691, 10.762860099114166], // starting position [lng, lat]
            zoom: 17 // starting zoom
        });

        
        // Add the control to the map.
        map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                geocodingQueryParams: {
                    // Add your custom parameters here
                    country: 'vn',  // Restrict search to the vn
                    types: 'place', // Limit results to places
                },
            })
        );

        var address = undefined
        var district = undefined
        var ward = undefined
        var coord = undefined
        map.on('click', async (e) => {
            const coordinates = e.lngLat;
    
            // Use Mapbox Geocoding API to get the address
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${mapboxgl.accessToken}`;
    
    
            // const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/748300.json?country=VN&access_token=${mapboxgl.accessToken}`;
            try {
                const response = await fetch(url);
                const dataJson = await response.json();
                const data = dataJson.features[0];
                
    
                // Find the items with type 'district' and 'ward'
                address = data.place_name;
                district = data.context[2].text.replace('Quận ', '');
                ward = data.context[0].text.replace('Phường ', '');
                coord = data.geometry.coordinates.join(', ');
    
                // Display the address in a popup
                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML('<b>'+address+'</b>'+'<div>'+'Phường '+ward + ', Quận ' + district+'</div>'+'<div class="text-body-tertiary">'+coord+'</div>')
                    .addTo(map);
    
                
            } catch (error) {
                console.error('Error:', error);
            }
        });
        document.querySelector('#save').onclick = () => {
            if (address !== undefined && ward !== undefined && district != undefined) {
                document.querySelector('#address').value = address;
                document.querySelector('#district').value = district;
                document.querySelector('#ward').value = ward;
                document.querySelector('#coord').value = coord;
                
                // Ensure that the element is being selected

                document.querySelector('#map-window').classList.add('d-none');
            }
        }
        document.querySelector('#cancel').onclick = () => {
            document.querySelector('#map-window').classList.add('d-none');
        }
    }
