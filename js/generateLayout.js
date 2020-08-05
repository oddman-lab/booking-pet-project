"use strict";
(function() {
    window.generateLayout = (data) => {
        let markerFragment = document.createDocumentFragment();
        let popupFragment = document.createDocumentFragment();

        let markerContainer = document.querySelector('.map__pins');
        let mapWindow = document.querySelector('.map');

        for (let i = 0; i < data.length; i++) {
            markerFragment.append(window.render.markers(data[i], i));
            popupFragment.append(window.render.adsCards(data[i], i));
        }

        markerContainer.append(markerFragment);
        mapWindow.insertBefore(popupFragment, mapWindow.querySelector('.map__filters-container'));
        switchState.pins(true)
        switchState.popups(true)
        startListening();
    };


    const onError = (errorMessage) => {
        let errorNode = document.createElement('div');
        errorNode.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        errorNode.style.position = 'absolute';
        errorNode.style.left = 0;
        errorNode.style.right = 0;
        errorNode.style.fontSize = '30px';
        
        errorNode.textContent = errorMessage; 
        document.body.insertAdjacentElement('afterbegin', errorNode);
    };

    
    window.backend.load(generateLayout, onError);

})();