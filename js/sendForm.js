(function() {
let bookingForm = document.querySelector('.notice__form');
let formData = new FormData(bookingForm);

function onError(error) {
    console.log(error)
}

function onSuccess() {
    console.log('успех')
}
bookingForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    window.backend.send(formData, onSuccess, onError);
    
});
})();