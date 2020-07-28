"use strict";
(function() {
// MAIN D'N'D

let mainPin = document.querySelector('.map__pin--main');
let map = document.querySelector('.map');
let mainForm = document.querySelector('.notice__form')
let addressInput = document.querySelector('input[id="address"]')

mainPin.addEventListener('mousedown', (evt) => {
    evt.preventDefault();

    map.classList.remove('map--faded');
    mainForm.classList.remove('notice__form--disabled');
    window.switchState.pins(false);
    window.switchState.fieldsets(false);
 

    let startCoords = {
        x: evt.clientX,
        y: evt.clientY,
    };

    let isMoved = false;

    const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();
        
        addressInput.value = `${moveEvt.clientX}, ${moveEvt.clientY}`;
        
        isMoved = true;

        let shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY,
        }

        startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          if (startCoords.y > 650) {
              return startCoords.y = 650;
          } 
          if (startCoords.y < 155) {
              return startCoords.y = 155;
          }
         
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';


    };

    const onMouseUp = (upEvt) => {
        upEvt.preventDefault()
        
        map.removeEventListener('mousemove', onMouseMove);
        map.removeEventListener('mouseup', onMouseUp);


        if (isMoved) {
            let onClickPreventDefault = (evt) => {
                evt.preventDefault();
                mainPin.removeEventListener('click', onClickPreventDefault);
            }

            mainPin.addEventListener('click', onClickPreventDefault);
        }
    };

    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
})

})();