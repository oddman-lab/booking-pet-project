"use strict";
(function() {
// SET ATTRIBUTE FOR SHOWING AD ON PINS CLICK

let allPinButton = document.querySelectorAll('.pin--similar');
let allPopups = document.querySelectorAll('.popup');

const associateWindowButtons = (buttonArray, popupArray) => {
    for (let i=0; i < popupArray.length; i++) {
        buttonArray[i].setAttribute('id', `buttonForPopup--${i}`);
        popupArray[i].setAttribute('id', `popupForButton--${i}`);
    }
}

associateWindowButtons(allPinButton, allPopups);

// ADD EVENT LISTENER FOR SHOWING AD

const showPopup = (popup) => popup.classList.remove('visuallyhidden');
const hidePopup = (popup) => popup.classList.add('visuallyhidden');
const isEscKeycode = (evt, currentPop) => evt.keyCode === 27 ? hidePopup(currentPop) : 1;


const searchTargetPin = (evt) => {
    let currentClick = evt.currentTarget.id;

    for (let i = 0; i < allPopups.length; i++) {
        let currentPopup = allPopups[i].id;
        let currentCloseButton = allPopups[i].querySelector('.popup__close');
        
        if (currentPopup[currentPopup.length - 1] === currentClick[[currentClick.length - 1]]) {
            showPopup(allPopups[i]);

            currentCloseButton.addEventListener('click', () => {
                hidePopup(allPopups[i]);
            })

            document.addEventListener('keydown', (keydownEvt) => {
                isEscKeycode(keydownEvt, allPopups[i]);
            })

        } else if (currentClick[[currentClick.length - 1]] !== currentPopup[currentPopup.length - 1]) {
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