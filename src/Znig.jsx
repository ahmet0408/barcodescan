import { useState, useEffect } from 'react';
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType, NotFoundException } from '@zxing/library';
import './App.css';

// Ses faýly üçin
import beepSound from './beep.mp3'; // ses faýlyňyzy assets papkasynda ýerleşdirmeli

function Znig() {
  const [scannedCode, setScannedCode] = useState('');
  const [codeReader, setCodeReader] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [beep] = useState(new Audio(beepSound));

  useEffect(() => {

    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.CODE_128,
      BarcodeFormat.CODE_39,
      BarcodeFormat.UPC_A,
      // Başga format görnüşlerini goşup bilersiňiz
    ]);
    // Scanner-i inizialize etmek
    const reader = new BrowserMultiFormatReader();
    setCodeReader(reader);

    // Component unmount bolanda arassalamak
    return () => {
      if (reader) {
        reader.reset();
      }
    };
  }, []);

  const startScan = async () => {
    if (!codeReader) return;

    try {
      setIsScanning(true);
      const videoInputDevices = await codeReader.listVideoInputDevices();

      if (!videoInputDevices || videoInputDevices.length === 0) {
        throw new Error('Kamera enjamy tapylmady');
      }

      // Yzky kamerany gözlemek
      const backCamera = videoInputDevices.find(device =>
        device.label.toLowerCase().includes('back') ||
        device.label.toLowerCase().includes('rear')
      );

      // Eger yzky kamera tapylsa şony ulanmak, ýogsam ilkinji kamerany ulanmak
      const selectedDeviceId = backCamera ? backCamera.deviceId : videoInputDevices[0].deviceId;

      const constraints = {
        video: {
          deviceId: selectedDeviceId,
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          aspectRatio: { ideal: 1.7777777778 },
          advanced: [{
            focusMode: "continuous"
          }]
        }
      };

      codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        'video-preview',
        (result, err) => {
          if (result) {
            beep.play().catch(e => console.log('Ses oýnadyp bilmedi:', e));
            setScannedCode(result.getText());
            stopScan();
          }
          if (err && !(err instanceof NotFoundException)) {
            console.error('Decode error:', err);
          }
        },
        constraints
      );
    } catch (err) {
      console.error('Scan error:', err);
      setIsScanning(false);
    }
  };

  const stopScan = () => {
    if (codeReader) {
      codeReader.reset();
      setIsScanning(false);
    }
  };

  // Component açylanda awtomatiki scan başlatmak
  useEffect(() => {
    startScan();
  }, [codeReader]); // codeReader taýyn bolanda başlat

  return (
    <div className="container">
      <h1>Barcode Scanner</h1>

      <div className="scanner-container">
        {isScanning ? (
          <button className="stop-button" onClick={stopScan}>
            Duruz
          </button>
        ) : (
          <button className="scan-button" onClick={startScan}>
            Täzeden Skan et
          </button>
        )}

        <video
          id="video-preview"
          className="video-preview"
          playsInline // iOS-da doly ekran bolmazlygy üçin
          autoPlay
        ></video>

        {scannedCode && (
          <div className="result">
            <h2>Netije:</h2>
            <p className="scanned-code">{scannedCode}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Znig;