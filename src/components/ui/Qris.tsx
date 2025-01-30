import React from "react";
import { QRCodeCanvas } from "qrcode.react";

interface QRISProps {
    qrisLink: string;
}

const downloadQRCode = () => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qris-code.png";
    a.click();
};


const QRIS: React.FC<QRISProps> = ({ qrisLink }) => {
    return (
        <div className="flex flex-col items-center p-4">

            <QRCodeCanvas value={qrisLink} size={300} />

            <button
                onClick={downloadQRCode}
                className="btn btn-outline text-emeraldGreen mt-10"
            >
                Download QR
            </button>
        </div>
    );
};

export default QRIS;
