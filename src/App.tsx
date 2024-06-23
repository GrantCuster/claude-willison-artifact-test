import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const MandelbrotExplorer = () => {
  const canvasRef = useRef(null);
  const [maxIterations, setMaxIterations] = useState(100);
  const [zoom, setZoom] = useState(200);
  const [centerX, setCenterX] = useState(-0.5);
  const [centerY, setCenterY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  const drawMandelbrot = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let a = (x - width / 2) / zoom + centerX;
        let b = (y - height / 2) / zoom + centerY;
        let ca = a;
        let cb = b;
        let n = 0;

        while (n < maxIterations) {
          let aa = a * a - b * b;
          let bb = 2 * a * b;
          a = aa + ca;
          b = bb + cb;
          if (a * a + b * b > 4) break;
          n++;
        }

        let brightness = n < maxIterations ? Math.sqrt(n / maxIterations) : 0;
        let rgb = hslToRgb(0.5 + brightness * 0.5, 0.7, brightness);
        ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, [maxIterations, zoom, centerX, centerY]);

  useEffect(() => {
    drawMandelbrot();
  }, [drawMandelbrot]);

  const hslToRgb = (h, s, l) => {
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMousePosition.x;
      const deltaY = e.clientY - lastMousePosition.y;
      setCenterX(centerX - deltaX / zoom);
      setCenterY(centerY - deltaY / zoom);
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mandelbrot Fractal Explorer</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader>Mandelbrot Set</CardHeader>
          <CardContent>
            <canvas 
              ref={canvasRef} 
              width={400} 
              height={400} 
              className="border border-gray-300 cursor-move"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>Controls</CardHeader>
          <CardContent>
            <div className="mb-4">
              <label className="block mb-2">Max Iterations: {maxIterations}</label>
              <Slider
                min={10}
                max={1000}
                step={10}
                value={[maxIterations]}
                onValueChange={(value) => setMaxIterations(value[0])}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Zoom: {zoom}</label>
              <Slider
                min={100}
                max={1000}
                step={10}
                value={[zoom]}
                onValueChange={(value) => setZoom(value[0])}
              />
            </div>
            <div className="mb-4">
              <Button onClick={() => {setCenterX(-0.5); setCenterY(0); setZoom(200);}}>
                Reset View
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>About the Mandelbrot Set</CardHeader>
        <CardContent>
          <p>The Mandelbrot set is a famous example of a fractal in mathematics. It's defined as the set of complex numbers c for which the function f(z) = z^2 + c does not diverge when iterated from z = 0.</p>
          <p>In the visualization above:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Each pixel represents a complex number in the complex plane.</li>
            <li>The color of each pixel is determined by how quickly the sequence diverges for that point.</li>
            <li>Black points are in the Mandelbrot set (the sequence doesn't diverge).</li>
            <li>Colored points are outside the set, with the color indicating how quickly the sequence diverges.</li>
          </ul>
          <p className="mt-2">Use the controls to explore different aspects of the fractal:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Drag on the canvas to pan around the fractal.</li>
            <li>Increase "Max Iterations" for more detailed boundaries.</li>
            <li>Adjust "Zoom" to focus on specific areas of the fractal.</li>
            <li>Click "Reset View" to return to the default view.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MandelbrotExplorer;
