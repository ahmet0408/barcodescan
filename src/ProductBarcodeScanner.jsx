import { useEffect, useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';


function ProductBarcodeScanner() {
  const [scannedCode, setScannedCode] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setScannedCode(data);
      setShowScanner(false);
      // API-a barcode bilen ýüz tutup, haryt maglumatlaryny almaly
    //   fetchProductData(data);
    }
  };

  return (
    <div>
      <button onClick={() => setShowScanner(!showScanner)}>
        Barcode Skanirle
      </button>

      {showScanner && (
        <BarcodeScannerComponent
          onUpdate={(err, result) => {
            if (result) handleScan(result.text);
          }}
          width={300}  // kamera çözünligini azaltmak
  height={200}
  constraints={{
    facingMode: "environment",
    // çözünligi azaltmak
    width: { ideal: 800 },
    height: { ideal: 600 }
  }}
        />
      )}
      
      <input 
        value={scannedCode}
        onChange={(e) => setScannedCode(e.target.value)}
        placeholder="Barcode"
      />
    </div>
  );
}

export default ProductBarcodeScanner;