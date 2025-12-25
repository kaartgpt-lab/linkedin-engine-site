import { useEffect, useRef } from 'react';

export const BackgroundRipple = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let ripples: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      opacity: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.random() * 200 + 100,
        speed: Math.random() * 2 + 1,
        opacity: 0.3,
      });
    };

    // Create initial ripples
    for (let i = 0; i < 3; i++) {
      createRipple(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw ripples
      ripples = ripples.filter((ripple) => {
        ripple.radius += ripple.speed;
        ripple.opacity -= 0.002;

        if (ripple.opacity <= 0 || ripple.radius >= ripple.maxRadius) {
          return false;
        }

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(74, 124, 255, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        return true;
      });

      // Randomly create new ripples
      if (Math.random() < 0.02 && ripples.length < 5) {
        createRipple(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
};
