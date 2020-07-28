"use strict";
(function() {
    // SET ATTRIBUTE FOR SHOWING AD ON PINS CLICK

    let allPinButton = document.querySelectorAll('.pin--similar');
    let allPopups = document.querySelectorAll('.popup');

    const linkingElements = (buttonArray, popupArray) => {
        for (let i = 0; i < popupArray.length; i++) {
            buttonArray[i].setAttribute('data-event', `${i}`);
            popupArray[i].setAttribute('data-event', `${i}`);
        }
    }

    linkingElements(allPinButton, allPopups);
})();