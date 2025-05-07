import React, { useEffect, useRef, useState } from 'react';
import jsnes from 'jsnes';
import { useLocation } from 'react-router-dom';

const GameEmulator: React.FC = () => {
  const [romFile, setRomFile] = useState<File | null>(null);
  const location = useLocation();
  const [romPath, setRomPath] = useState<string | null>(location.state?.romPath || null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setRomFile(file);
    }
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nes = new jsnes.NES({
    onFrame: (frameBuffer) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const imageData = ctx.createImageData(256, 240);
          imageData.data.set(frameBuffer);
          ctx.putImageData(imageData, 0, 0);
        }
      }
    },
  });

  useEffect(() => {
    const loadRomFromPath = async (path: string) => {
      try {
        const response = await fetch(path);
        const arrayBuffer = await response.arrayBuffer();
        const rom = new Uint8Array(arrayBuffer);
        nes.loadRom(rom);
      } catch (error) {
        console.error('Failed to load ROM:', error);
      }
    };

    if (romPath) {
      loadRomFromPath(romPath);
    } else if (romFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const rom = new Uint8Array(e.target.result as ArrayBuffer);
          nes.loadRom(rom);
        }
      };
      reader.readAsArrayBuffer(romFile);
    }
  }, [romFile, romPath]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        type="file"
        accept=".nes"
        onChange={handleFileChange}
        style={{ 
  marginBottom: '24px',
  padding: '12px 24px',
  border: '2px solid #2563eb',
  borderRadius: '8px',
  backgroundColor: '#eff6ff',
  color: '#2563eb',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  ':hover': {
    backgroundColor: '#2563eb',
    color: '#fff',
    transform: 'scale(1.05)'
  }
}}
      />
      <canvas
      ref={canvasRef}
      width={256}
      height={240}
      style={{ width: '100%', height: 'auto' }}
    />
  </div>
  );
};

export default GameEmulator;