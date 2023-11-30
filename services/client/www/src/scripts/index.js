(function () {
	const logo = document.getElementById("logo");
	const mouseHandler = function (e) {
		logo.style.setProperty("--logo-rotate", `${(e.clientX + e.clientY) / 10}deg`);
	};
	document.addEventListener("mousemove", mouseHandler.bind(this));
})();

const input = document.getElementById("clicker-input");
const button = document.getElementById("clicker-button");
const qrCanvas = document.getElementById("qr-code");
const shortcutHref = document.getElementById("short-href");

const generateQrCode = (url) => {
	qrCanvas.innerHTML = "";
	const qr = new QRCode(qrCanvas, {
		text: url,
		width: 220,
		height: 220,
	});
};

const URL = `http://${window.location.hostname}:80/reduce`;
const shortUrl = document.getElementById("short-url");
button.addEventListener("click", async () => {
	fetch(URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ url: input.value }),
	})
		.then((response) => response.json())
    .then((json) => {
      if (json !== undefined && json.type === "correct") {
        console.log("URL ",json.url);
				shortUrl.innerText = json.url;
				shortcutHref.setAttribute("href", json.url);
				generateQrCode(json.url);
			}
		})
		.catch((error) => {});
});
