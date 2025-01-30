import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Barcode from "react-barcode";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

const RandomBarcodeGenerator = () => {
  const [barcodeValue, setBarcodeValue] = useState("");

  // Tötänleýin barcode döretmek üçin funksiýa
  const generateRandomBarcode = () => {
    // 12 sanlyk tötänleýin san döredýäris
    const randomNum = Math.floor(Math.random() * 1000000000000)
      .toString()
      .padStart(12, "0");
    setBarcodeValue(randomNum);

    // Çap etmek üçin täze sahypa açýarys
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Barcode Print</title>
          <style>
            body { margin: 20px; }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div id="printContent"></div>
          <button class="no-print" onclick="window.print()">Çap et</button>
        </body>
      </html>
    `);

    // React-barcode-y täze sahypa goşýarys
    const BarcodeComponent = () => <Barcode value={randomNum} />;
    const root = ReactDOM.createRoot(
      printWindow.document.getElementById("printContent")
    );
    root.render(<BarcodeComponent />);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={barcodeValue}
          onChange={(e) => setBarcodeValue(e.target.value)}
          placeholder="Barcode"
          className="w-64"
        />
        <button
          onClick={generateRandomBarcode}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Barcode döret
        </button>
      </div>

      {barcodeValue && (
        <div className="mt-4">
          <Barcode value={barcodeValue} />
        </div>
      )}
    </div>
  );
};

export default RandomBarcodeGenerator;
