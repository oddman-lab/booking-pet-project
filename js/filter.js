"use strict";
(function() {
    let mapFilters = document.querySelector('.map__filters');
    let housingType = mapFilters.querySelector('#housing-type');
    let housingPrice = mapFilters.querySelector('#housing-price');
    let housingRooms = mapFilters.querySelector('#housing-rooms');
    let housingGuests = mapFilters.querySelector('#housing-guests');

    const DEFAULT_FILTER_VALUE = 'any';
    const PRICE_LOW = 10000;
    const PRICE_HIGH = 50000;

    let filterAdverts = function (data) {
    let filteredAdverts = [];

    let checkedFeatures = Array.from(mapFilters.querySelectorAll('#housing-features input:checked'));
    
    for (let item of data) {


        if (!(housingType.value === DEFAULT_FILTER_VALUE || item.offer.type === housingType.value)) {
            continue;
        }

        let checkPrice = false;
        switch (housingPrice.value) {
        case 'any':
            checkPrice = true;
            break;
        case 'low':
            checkPrice = item.offer.price <= PRICE_LOW;
            break;
        case 'high':
            checkPrice = item.offer.price >= PRICE_HIGH;
            break;
        case 'middle':
            checkPrice = PRICE_LOW < item.offer.price && item.offer.price < PRICE_HIGH;
            break;
        }

        if (!checkPrice) {
            continue;
        } else if (!(housingRooms.value === DEFAULT_FILTER_VALUE || item.offer.rooms === Number(housingRooms.value))) {
            continue;
        } else if (!(housingGuests.value === DEFAULT_FILTER_VALUE || item.offer.guests >= Number(housingGuests.value) )) {
            continue;
        }

        let checkFeatures = checkedFeatures.every((element) => {
            return item.offer.features.includes(element.value);
        });
        if (!checkFeatures) {
            continue;
        }

        filteredAdverts.push(item);
    }

    return filteredAdverts;
    };


    function clearDOM() {
        let allMarkers = document.querySelectorAll('.pin--similar');
        let allPopups = document.querySelectorAll('.popup');
        let pinsContainer = document.querySelector('.map__pins');
        let articleContainer = document.querySelector('.map');

        for (let i = 0; i < allMarkers.length; i++ ) {
            pinsContainer.removeChild(allMarkers[i]);
            articleContainer.removeChild(allPopups[i])
        }
    }

    mapFilters.addEventListener('change', window.debounce(function (evt) {
        console.log(evt.target.id, evt.target.value)
        clearDOM();
        generateLayout(filterAdverts(dataObj));
        switchState.pins(false);
    }));
})()