"use strict";
(function() {
    const disableFieldsets = (isDisable) => {
        let fieldsets = document.querySelectorAll('fieldset');
        document.querySelector('.success-message').classList.add('visuallyhidden')

        for (let fieldset of fieldsets) {
            fieldset.disabled = isDisable;
        };
    };

    const hideAllPopups = (isHide) => {
        let popups = document.querySelectorAll('.map__card');

        for (let popup of popups) {
            if (isHide) {
                popup.classList.add('visuallyhidden');
            };
        };
    };

    const hideMapPins = (isHide) => {
        let pins = document.querySelectorAll('.pin--similar');

        for (let pin of pins) {
            if (isHide) {
                pin.classList.add('visuallyhidden');
            } else if (!isHide) {
                setTimeout( () => {
                    pin.classList.remove('visuallyhidden');
                }, 1000)
                
            }
        };
    };

    disableFieldsets(true);
    hideAllPopups(true);
    hideMapPins(true);

    window.switchState = {
        fieldsets: disableFieldsets,
        popups: hideAllPopups,
        pins: hideMapPins,
    }
})();
