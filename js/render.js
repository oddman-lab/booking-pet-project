"use strict";
(function() {
window.render = {
    markers: renderMarkers,
    adsCards: renderAdsСards,
};

function renderMarkers(pinData, indexOfPin) {
    let template = document.querySelector('template').content.querySelector('button.map__pin');
    let markerElement = template.cloneNode(true);

    markerElement.setAttribute('data-event', `${indexOfPin}`);
    markerElement.style.left = pinData.location.x + 'px';
    markerElement.style.top = pinData.location.y + 'px';
    markerElement.querySelector('img').src = pinData.author.avatar;
    markerElement.querySelector('img').alt = pinData.offer.title;
    

    return markerElement;
};

function renderAdsСards(adsData, indexOfAd) {
    let template = document.querySelector('template').content.querySelector('.map__card');
    let cardElement = template.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = adsData.author.avatar;
    cardElement.querySelector('.popup__title').textContent = adsData.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = adsData.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = adsData.offer.price + ' ₽/ночь';

    let offerTypeToString = {
        "flat": "Квартира",
        "palace": "Дворец",
        "bungalo": "Бунгало",
        "house": "Дом",
    };

    const getFeatures = (featuresArray) => {
        let featuresFragment = document.createDocumentFragment();

        if (featuresArray.length === 0) {
            return featuresFragment;
        } else {
            for (let i = 0; i < featuresArray.length; i++) {
                let featuresElement = document.createElement('li');
                featuresElement.classList.add('feature', `feature--${featuresArray[i]}`);
                featuresFragment.append(featuresElement);
            }
            return featuresFragment;
        }
    }

    const getImage = (imageList) => {
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < imageList.length; i++) {
            let listItem = document.createElement('li');
            listItem.classList.add('popup__pictures');
            let image = document.createElement('img');

            image.src = imageList[i];

            listItem.append(image);
            fragment.append(listItem);
        }
        return fragment;
    }
    
    cardElement.querySelector('.popup__type').textContent = offerTypeToString[adsData.offer.type]
    cardElement.querySelector('.popup__text--capacity').textContent = `${adsData.offer.rooms} комнат${adsData.offer.rooms > 1 ? 'ы':'а'} для ${adsData.offer.guests} гостей`;
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${adsData.offer.checkin}, выезд до ${adsData.offer.checkout}`;
    cardElement.querySelector('.popup__features').append(getFeatures(adsData.offer.features)); 
    cardElement.querySelector('.popup__description').textContent = adsData.offer.description;
    cardElement.querySelector('.popup__pictures').append(getImage(adsData.offer.photos));
    cardElement.setAttribute('data-event', `${indexOfAd}`)


    return cardElement;
};

})();