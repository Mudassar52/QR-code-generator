const inputBox = document.querySelector("#input");
const qrImage = document.querySelector("#qrimage");
const imageBox = document.querySelector("#image-box");
const colorOptions = document.querySelectorAll(".color-option");
let selectedColor = "000000"; // ڈیفالٹ رنگ (کالا)

// کلر آپشن سلیکٹ کرنے کا فنکشن
colorOptions.forEach(option => {
    option.addEventListener("click", function () {
        colorOptions.forEach(opt => opt.classList.remove("active"));
        this.classList.add("active");
        selectedColor = this.getAttribute("data-color").substring(1); // Remove #
    });
});

// QR کوڈ بنانے کا فنکشن
function generateQR() {
    if (inputBox.value.trim().length > 0) {
        let encodedData = encodeURIComponent(inputBox.value.trim()); // Text Encoding
        let apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodedData}&color=${selectedColor}`;

        qrImage.src = apiUrl;
        imageBox.classList.add("show-img");
        document.querySelector("#download").style.display = "block"; // ڈاؤن لوڈ بٹن دکھائیں
    } else {
        inputBox.classList.add("error");
        setTimeout(() => {
            inputBox.classList.remove("error");
        }, 1000);
    }
}

// QR کوڈ ڈاؤن لوڈ کرنے کا فنکشن
function downloadFile() {
    if (imageBox.classList.contains("show-img")) {
        document.querySelector("#download").innerHTML = "Downloading....";

        let encodedData = encodeURIComponent(inputBox.value.trim());
        let url = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodedData}&color=${selectedColor}`;

        fetch(url)
            .then(res => res.blob())
            .then(file => {
                let tempUrl = URL.createObjectURL(file);
                let aTag = document.createElement("a");
                aTag.href = tempUrl;
                aTag.download = "QR.png";
                document.body.appendChild(aTag);
                aTag.click();
                aTag.remove();
                URL.revokeObjectURL(tempUrl);
                document.querySelector("#download").innerHTML = "Download QR";
            })
            .catch(() => {
                alert("Unable to Download...");
            });
    }
}
