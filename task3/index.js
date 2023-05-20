const url = 'wss://echo-ws-service.herokuapp.com'

const chat = document.querySelector('.chat__row');
const input = document.querySelector('input');
const btnSend = document.querySelector('.j-btn-send');
const btnGeo = document.querySelector('.j-btn-geo');

let websocket;

function writeToScreenResponse(message) {
    let sentence = document.createElement('p');
    sentence.innerHTML = message;
    chat.appendChild(sentence);
}

function writeToScreenRequest(message) {
    let sentence = document.createElement('p');
    sentence.innerHTML = message;
    sentence.classList.add('requestMessage');
    chat.appendChild(sentence);
}

btnSend.addEventListener('click', () => {
    websocket = new WebSocket(url);
    if (input.value != "") {
        websocket.onopen = function (evt) {
            writeToScreenRequest(`<span style="color: black;">${input.value}</span>`);
            websocket.send(input.value);
            input.value = "";
        }
    };

    websocket.onclose = function (evt) {
        writeToScreenResponse(`<span style="color: red;">DISCONNECTED</span>`);
    };
    websocket.onmessage = function (evt) {
        writeToScreenResponse(`<span style="color: black;">${evt.data}</span>`)
    };
    websocket.onerror = function (evt) {
        writeToScreenResponse(
            '<span style="color: red;">ERROR:</span> ' + evt.data
        );
    };

});


btnGeo.addEventListener('click', () => {
    websocket = new WebSocket(url)
    websocket.onopen = function (evt) {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { coords } = position;
                const latitude = coords.latitude;
                const longitude = coords.longitude;
                writeToScreenRequest(`<a href = "https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Ваша геолокация</a>`);
                websocket.send(coords);
            });
        }
    }
});