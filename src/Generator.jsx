import React, { useState } from "react";
import Barcode from "react-barcode";

const Generator = () => {
  const [barcodeValue, setBarcodeValue] = useState("");

  // Tötänleýin barcode döretmek
  const generateRandomBarcode = () => {
    // 12 sanlyk tötänleýin san döretýäris
    const randomNum = Math.floor(Math.random() * 1000000000000)
      .toString()
      .padStart(12, "0");
    setBarcodeValue(randomNum);
  };

  // Çap etmek funksiýasy
  const handlePrint = () => {
    const printContent = document.getElementById("barcode-section");
    const printWindow = window.open("", "", "height=400,width=800");

    printWindow.document.write("<html><head><title>Print Barcode</title>");
    // XPrinter üçin ýörite sazlamalar
    printWindow.document.write(`
      <style>
        @page {
          size: 40mm 30mm; /* Etiketiň ölçegi */
          margin: 0;
        }
        body {
          margin: 0;
          padding: 4mm;
        }
        #print-content {
          width: 32mm;
          text-align: center;
        }
        svg {
          max-width: 100%;
          height: auto;
        }
      </style>
    `);
    printWindow.document.write("</head><body>");
    printWindow.document.write('<div id="print-content">');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write("</div></body></html>");

    printWindow.document.close();
    printWindow.focus();

    // Çap etmek
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={barcodeValue}
          onChange={(e) => setBarcodeValue(e.target.value)}
          placeholder="Barcode"
          className="border p-2 rounded"
        />
        <button
          onClick={generateRandomBarcode}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Barcode döret
        </button>
        <button
          onClick={handlePrint}
          disabled={!barcodeValue}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          Çap et
        </button>
      </div>

      {barcodeValue && (
        <div id="barcode-section" className="flex justify-center">
          <Barcode value={barcodeValue} />
        </div>
      )}
    </div>
  );
};

export default Generator;
