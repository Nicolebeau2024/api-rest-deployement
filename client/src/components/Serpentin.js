import React, { useRef, useEffect, useState } from 'react';
import './Serpentin.css'; // Assurez-vous que le CSS est importé

const Serpentin = () => {
  const canvasRef = useRef(null);
  const [pointerEvents, setPointerEvents] = useState('none');
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const drawSerpentin = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#9B7EDA'; // Jaune doré
      ctx.lineWidth = 4;
      ctx.beginPath();
      
      // Dessine la ligne serpentine
      positions.forEach(([x, y], index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
    };

    const handleMouseMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;

      // Ajoute la position actuelle à la liste
      setPositions(prevPositions => [...prevPositions, [x, y]]);

      // Limite le nombre de points pour éviter que le tableau devienne trop grand
      if (positions.length > 5) {
        setPositions(prevPositions => prevPositions.slice(1));
      }
    };

    const handleMouseEnter = () => setPointerEvents('auto');
    const handleMouseLeave = () => setPointerEvents('none');

    const animate = () => {
      drawSerpentin();
      requestAnimationFrame(animate);
    };

    // Resize canvas when window resizes
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial resize

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Start animation loop
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [positions, pointerEvents]);

  return (
    <canvas
      ref={canvasRef}
      className="serpentin-canvas"
      style={{ pointerEvents }}
    ></canvas>
  );
};

export default Serpentin;
