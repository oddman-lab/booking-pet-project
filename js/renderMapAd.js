"use strict";
( function() {

let cardTemplate = document.querySelector('template').content.querySelector('.map__card');
let mapWindow = document.querySelector('.map');

    const renderMapCard = (cardObject) => {
        let cardElement = cardTemplate.cloneNode(true);
        cardElement.querySelector('.popup__avatar').src = cardObject.author.avatar;
        cardElement.querySelector('.popup__title').textContent = cardObject.offer.title;
        cardElement.querySelector('.popup__text--address').textContent = cardObject.offer.address;
        cardElement.querySelector('.popup__text--price').textContent = cardObject.offer.price + ' ₽/ночь';

        const getOfferType = (offerType) => {
            if (offerType === 'house') {
                return 'Дом'
            } else if (offerType === 'flat') {
                return 'Квартира'
            } else if (offerType === 'bungalo') {
                return 'Бунагло'
            } else if (offerType === 'place') {
                return 'Дворец'
            } else {
                return 'Уточняется ...'
            }
        }
        
        cardElement.querySelector('.popup__type').textContent = getOfferType(cardObject.offer.type);
        cardElement.querySelector('.popup__text--capacity').textContent = `${cardObject.offer.rooms} комнат${cardObject.offer.rooms > 1 ? 'ы':'а'} для ${cardObject.offer.guests} гостей`;
        cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${cardObject.offer.checkin}, выезд до ${cardObject.offer.checkout}`;
        
        window.featuresFragment = document.createDocumentFragment();

        const getFeatures = (featuresArray) => {
            
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

        cardElement.querySelector('.popup__features').append(getFeatures(cardObject.offer.features)); 
        cardElement.querySelector('.popup__description').textContent = cardObject.offer.description;



        const renderImage = (imageList) => {
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

        cardElement.querySelector('.popup__pictures').append(renderImage(cardObject.offer.photos));

        return cardElement;
    };

    let cardFragment = document.createDocumentFragment();

    for (let i=0; i < similarAd.length; i++) {
        cardFragment.append(renderMapCard(similarAd[i]))
    };

mapWindow.insertBefore(cardFragment, mapWindow.querySelector('.map__filters-container'));
})();