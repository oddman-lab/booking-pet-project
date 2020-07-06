(function() {
    let mapWindow = document.querySelector('.map');
    let mapPins = mapWindow.querySelector('.map__pins');

    let pinTemplate = document.querySelector('template').content.querySelector('button.map__pin');
    let fragment = document.createDocumentFragment();

    mapWindow.classList.remove('map--faded');

    const renderMapPins = (pinObject) => {
        let pinElement = pinTemplate.cloneNode(true);
        pinElement.style.left = pinObject.location.x + 'px';
        pinElement.style.top = pinObject.location.y + 'px';
        pinElement.querySelector('img').src = pinObject.author.avatar;
        pinElement.querySelector('img').alt = pinObject.offer.title;

        return pinElement;
    }

    for (let i=0; i < similarAd.length; i++) {
        fragment.append(renderMapPins(similarAd[i]));
    }

    mapPins.append(fragment);
})();