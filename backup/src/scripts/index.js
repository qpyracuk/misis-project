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

const URL = `http://${window.location.hostname}/reduce`;
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
				shortUrl.innerText = json.url;
				shortcutHref.setAttribute("href", json.url);
				generateQrCode(json.url);
			}
		})
		.catch((error) => {});
});
