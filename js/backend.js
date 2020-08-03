"use strict";
(function() {
    const URL = {
        download: 'https://raw.githubusercontent.com/oddman-lab/javascript-basic/master/databooking.json',
        upload: 'https://javascript.pages.academy/keksobooking',
    };

    const ServerCode = {
        SUCCESS: 200,
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        ENTERNAL_ERROR: 500
    };

    const getXHR = function (onSuccess, onError) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function() {
            let error;
            switch (xhr.status) {
                case ServerCode.SUCCESS:
                    onSuccess(xhr.response);
                    window.dataObj = xhr.response;
                    console.log(xhr.response);
                    break;
                case ServerCode.BAD_REQUEST:
                    error = 'Неверный запрос';
                    break;
                case ServerCode.NOT_FOUND:
                    error = 'Ничего не найдено';
                    break;
                case ServerCode.ENTERNAL_ERROR:
                    error = 'Ошибка сервера';
                    break;
                default:
                    error = `Статус ответа ${xhr.status} ${xhr.statusText}`;
            }
            if (error) {
                onError(error);
            } 
        });

        xhr.addEventListener('error', function () {
            onError('Произошла ошибка соединения');
          });
        

        xhr.timeout = 10000;
        xhr.addEventListener('timeout', function () {
            onError(`Запрос не успел выполниться за ${xhr.timeout}`);
        });
    
        return xhr;
    };

    const getData = (onSuccess, onError) => {
        let xhr = getXHR(onSuccess, onError);

        xhr.open('GET', URL.download);
        xhr.send();
    };

    const sendData = (data, onSuccess, onError) => {
        let xhr = getXHR(onSuccess, onError);

        xhr.open('POST', URL.upload)
        xhr.send(data);
    };


    window.backend = {
        load: getData,
        send: sendData,
      };
})();
