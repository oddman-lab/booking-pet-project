"use strict";
(function() {
// SET ATTRIBUTE FOR SHOWING AD ON PINS CLICK

let allPinButton = document.querySelectorAll('.pin--similar');
let allPopups = document.querySelectorAll('.popup');

const associateWindowButtons = (buttonArray, popupArray) => {
    for (let i=0; i < popupArray.length; i++) {
        buttonArray[i].setAttribute('data-event', `${i}`);
        popupArray[i].setAttribute('data-event', `${i}`);
    }
}

associateWindowButtons(allPinButton, allPopups);

// ADD EVENT LISTENER FOR SHOWING AD

const showPopup = (popup) => popup.classList.remove('visuallyhidden');
const hidePopup = (popup) => popup.classList.add('visuallyhidden');
const isEscKeycode = (evt, currentPop) => evt.keyCode === 27 ? hidePopup(currentPop) : 1;


const searchTargetPin = (evt) => {
    let currentClick = evt.currentTarget.dataset.event;
    
    for (let i = 0; i < allPopups.length; i++) {
        let currentPopup = allPopups[i].dataset.event;
        let currentCloseButton = allPopups[i].querySelector('.popup__close');
        
        if (currentPopup === currentClick) {
            showPopup(allPopups[i]);

            currentCloseButton.addEventListener('click', () => {
                hidePopup(allPopups[i]);
            })

            document.addEventListener('keydown', (keydownEvt) => {
                isEscKeycode(keydownEvt, allPopups[i]);
            })

        } else if (currentPopup !== currentClick) {
            hidePopup(allPopups[i]);
        };
    };
};

for (let i = 0; i < allPinButton.length; i++) {
    allPinButton[i].addEventListener('click', (evt) => {
        searchTargetPin(evt);
    });
};
})();