import { BrowserQRCodeReader } from '@zxing/browser';

const qrCodeReader = new BrowserQRCodeReader();

function handleFileUpload(event) {
    const file = event.target.files[0]; // Get uploaded file
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
        try {
            const result = await qrCodeReader.decodeFromImageUrl(reader.result);
            console.log("QR Code Data:", result.text);
            alert("QR Code Data: " + result.text);
        } catch (error) {
            console.error("QR Scan Failed:", error);
            alert("Could not scan QR code.");
        }
    };
    
    reader.readAsDataURL(file); // Convert image to URL
}
