import { useState } from 'react';
import Barcode from 'react-barcode';

function BarcodeGenerator() {
  const [barcodeValue, setBarcodeValue] = useState('');
  
  const generateBarcode = () => {
    // Random barcode döretmek
    const newBarcode = Math.floor(Math.random() * 1000000000000).toString();
    setBarcodeValue(newBarcode);
  };

  return (
    <div>
      <button onClick={generateBarcode}>
        Täze Barcode Döret
      </button>
      
      {barcodeValue && (
        <div>
          <Barcode value={barcodeValue} />
          <button onClick={() => window.print()}>Print Et</button>
        </div>
      )}
    </div>
  );
}

export default BarcodeGenerator;