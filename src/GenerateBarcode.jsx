import React, { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Printer } from "lucide-react";
import Barcode from "react-barcode";

const GenerateBarcode = () => {
  const [barcodeValue, setBarcodeValue] = useState("");
  const barcodeRef = useRef();

  const handleGenerateAndPrint = () => {
    if (!barcodeValue) {
      alert("Barcode maglumatyny giriziň!");
      return;
    }

    // Print etmek üçin täze penjire açýarys
    const printWindow = window.open("", "", "width=800,height=400");
    printWindow.document.write(`
      <html>
        <head>
          <title>Barcode Print</title>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react-barcode/1.4.0/react-barcode.min.js"></script>
        </head>
        <body style="margin: 20px;">
          <div id="printBarcode">
            ${barcodeRef.current.innerHTML}
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={barcodeValue}
          onChange={(e) => setBarcodeValue(e.target.value)}
          placeholder="Barcode maglumatyny giriziň..."
          className="flex-1"
        />
        <button
          onClick={handleGenerateAndPrint}
          className="flex items-center gap-2"
          disabled={!barcodeValue}
        >
          {/* <Printer className="w-4 h-4" /> */}
          Print et
        </button>
      </div>

      {barcodeValue && (
        <div ref={barcodeRef} className="mt-4 flex justify-center">
          <Barcode
            value={barcodeValue}
            format="CODE128"
            width={2}
            height={100}
            displayValue={true}
          />
        </div>
      )}
    </div>
  );
};

export default GenerateBarcode;
