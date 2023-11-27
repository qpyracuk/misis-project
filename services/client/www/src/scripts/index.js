(function () {
  const logo = document.getElementById("logo");
	const mouseHandler = function (e) {
		logo.style.setProperty("--logo-rotate", `${ (e.clientX + e.clientY) / 10 }deg`);
	};
	document.addEventListener("mousemove", mouseHandler.bind(this));
})();

const input = document.getElementById("clicker-input");
const button = document.getElementById("clicker-button");

const generateQrCode = (url) => {
  const qr = new QRCode(document.getElementById("qr-code"), {
    text: url,
    width: 220,
    height: 220,
  });
};

const URL = `${window.location.hostname}:10080/reduce`
const shortUrl = document.getElementById("short-url")
button.addEventListener("click", (e) => {
  fetch(URL, JSON.stringify({ url: input.target.value })).then(response => {
    shortUrl.target.value = response.short
    generateQrCode(response.short)
  }).catch(error => {
    console.log("Сервер недоступен");
  })
})
