"use strict";
(function() {
    let bookingForm = document.querySelector('.notice__form');

    function onError(error) {
        console.log(error);
    }

    function onSuccess() {
        bookingForm.reset();
        switchState.fieldsets(true);
        bookingForm.classList.add('notice__form--disabled');
        document.querySelector('.success-message').classList.remove('visuallyhidden')
    }

    let dependingOfType = {
        "flat": {
            placeholder: "от 1000 Р/ночь", 
            minValue: "1000",
        },
        "palace": {
            placeholder: "от 10000 Р/ночь", 
            minValue: "10000",
        },
        "bungalo": {
            placeholder: "от 0 Р/ночь", 
            minValue: "0",
        },
        "house": {
            placeholder: "от 5000 Р/ночь", 
            minValue: "5000",
        },
    };

    let dependingOfFormInput = {
        "type": linkingTypeField,
        "timein": syncFiledDependencies,
        "timeout": syncFiledDependencies,
        "room_number": filterGuestCapacity,
    }

        

    function linkingTypeField(offerType) {
        let priceInput = bookingForm.querySelector('#price');

        priceInput.placeholder = dependingOfType[offerType.value]['placeholder'];
        priceInput.setAttribute('min', dependingOfType[offerType.value].minValue);
    }

    function syncFiledDependencies(timeSelect) {
        let timeIn = bookingForm.querySelector('#timein');
        let timeOut = bookingForm.querySelector('#timeout');
        
        timeSelect.id === timeIn.id ? timeOut.value = timeSelect.value : timeIn.value = timeSelect.value;
    }

    function filterGuestCapacity(roomQuantity) {
        let capacity = bookingForm.querySelector('#capacity');
        for (value of capacity) {
            if (roomQuantity.value !== value.value) {
                value.setAttribute('disabled', '')
            } else if (roomQuantity.value === value.value) {
                value.removeAttribute('disabled', '')
            }
        }
    }



    bookingForm.addEventListener('change', (evt) => {
        dependingOfFormInput[evt.target.id](evt.target);
    });

    bookingForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        window.backend.send(new FormData(bookingForm), onSuccess, onError);
        
    });
})();