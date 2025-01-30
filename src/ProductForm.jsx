import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";
import Barcode from "react-barcode";

function ProductForm() {
  const [formData, setFormData] = useState({
    barcode: '',
    name: '',
    price: ''
  });
  const [scanning, setScanning] = useState(false);
  const [scanner, setScanner] = useState(null);
  
  // Scanner başladýar
  const startScanner = () => {
    setScanning(true);
  };

  // Scanner duruzýar
  const stopScanner = () => {
    if (scanner) {
      scanner.clear();
      setScanner(null);
    }
    setScanning(false);
  };

  // Scanner effekti
  useEffect(() => {
    if (scanning) {
      const newScanner = new Html5QrcodeScanner("reader", {
        qrbox: { width: 300, height: 180 },
        fps: 5,
        rememberLastUsedCamera: true,
        showTorchButton: true
      });
      
      newScanner.render((decodedText) => {
        setFormData({...formData, barcode: decodedText});
        stopScanner();
      }, (error) => {
        console.log(error);
      });

      setScanner(newScanner);
    }
  }, [scanning]);

  // Komponent aýrylanda scanner arassalaýar
  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner]);

  const generateNewBarcode = () => {
    const newBarcode = Math.floor(Math.random() * 9000000000000) + 1000000000000;
    setFormData({...formData, barcode: newBarcode.toString()});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Haryt goşuldy:', formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Barcode:</label>
          <input 
            type="text" 
            value={formData.barcode}
            onChange={(e) => setFormData({...formData, barcode: e.target.value})}
          />
          <button type="button" onClick={scanning ? stopScanner : startScanner}>
            {scanning ? 'Scanner Duruz' : 'Scan Et'}
          </button>
          <button type="button" onClick={generateNewBarcode}>
            Täze Barcode Döret
          </button>
        </div>

        {scanning && (
          <div id="reader" style={{marginTop: '20px'}}></div>
        )}

        {formData.barcode && !scanning && (
          <div style={{marginTop: '20px'}}>
            <Barcode value={formData.barcode} />
          </div>
        )}

        <div>
          <label>Harydyň ady:</label>
          <input 
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label>Bahasy:</label>
          <input 
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
          />
        </div>

        <button type="submit">Haryt Goş</button>
      </form>
    </div>
  );
}

export default ProductForm;