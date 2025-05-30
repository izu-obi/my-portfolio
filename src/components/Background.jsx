import { useEffect, useRef, useState } from 'react';

export default function Background() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    // Responsive sizing
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let angle = 0;
    let time = 0;

    let stars = [];
    let shootingStars = [];
    let nebulaClouds = [];
    const planetImages = {};

    // Enhanced planet sources with fallbacks
    const planetSources = {
      earth: 'https://www.pngmart.com/files/3/Earth-PNG-Transparent-Image.png',
      venus: 'https://www.pngmart.com/files/3/Venus-PNG-Transparent-Image.png',
      jupiter: 'https://www.pngmart.com/files/3/Jupiter-PNG-Transparent-Image.png'
    };

    const loadImages = () => {
      const promises = Object.entries(planetSources).map(([key, src]) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = src;
          img.onload = () => {
            planetImages[key] = img;
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load planet image: ${src}`);
            // Create a fallback colored circle
            const fallbackCanvas = document.createElement('canvas');
            fallbackCanvas.width = 100;
            fallbackCanvas.height = 100;
            const fallbackCtx = fallbackCanvas.getContext('2d');
            
            const colors = { earth: '#4A90E2', venus: '#FFA500', jupiter: '#FF6B6B' };
            const gradient = fallbackCtx.createRadialGradient(50, 35, 0, 50, 50, 50);
            gradient.addColorStop(0, colors[key] || '#4A90E2');
            gradient.addColorStop(1, '#000');
            
            fallbackCtx.fillStyle = gradient;
            fallbackCtx.beginPath();
            fallbackCtx.arc(50, 50, 50, 0, Math.PI * 2);
            fallbackCtx.fill();
            
            planetImages[key] = fallbackCanvas;
            resolve();
          };
        });
      });
      return Promise.all(promises);
    };

    // Enhanced planet configuration with varied speeds and orbits
    const getPlanetConfig = () => {
      const baseSize = Math.min(width, height) * 0.04;
      const centerX = width / 2;
      const centerY = height / 2;
      
      return [
        { 
          orbitRadius: Math.min(width, height) * 0.15, 
          radius: baseSize, 
          key: 'earth', 
          speed: 0.012, 
          angleOffset: 0,
          color: '#4A90E2'
        },
        { 
          orbitRadius: Math.min(width, height) * 0.25, 
          radius: baseSize * 0.8, 
          key: 'venus', 
          speed: 0.008, 
          angleOffset: Math.PI / 3,
          color: '#FFA500'
        },
        { 
          orbitRadius: Math.min(width, height) * 0.35, 
          radius: baseSize * 1.5, 
          key: 'jupiter', 
          speed: 0.005, 
          angleOffset: Math.PI,
          color: '#FF6B6B'
        }
      ];
    };

    let planets = getPlanetConfig();

    // Enhanced star generation with different types
    const generateStars = () => {
      const starCount = Math.floor((width * height) / 8000);
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
        brightness: Math.random() * 0.5 + 0.5,
        type: Math.random() > 0.95 ? 'bright' : 'normal'
      }));
    };

    // Enhanced shooting stars
    const generateShootingStars = () => {
      const count = Math.max(1, Math.floor(width / 800));
      shootingStars = Array.from({ length: count }, () => ({
        x: Math.random() * width - 200,
        y: Math.random() * height * 0.6,
        speedX: Math.random() * 3 + 4,
        speedY: Math.random() * 1.5 + 0.5,
        length: Math.random() * 80 + 60,
        opacity: Math.random() * 0.5 + 0.5,
        trail: []
      }));
    };

    // Add nebula clouds for depth
    const generateNebulaClouds = () => {
      const count = Math.max(2, Math.floor(width / 600));
      nebulaClouds = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 200 + 100,
        color: `hsl(${Math.random() * 60 + 240}, 50%, 15%)`,
        drift: Math.random() * 0.2 + 0.1
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      planets = getPlanetConfig();
      generateStars();
      generateShootingStars();
      generateNebulaClouds();
    };

    const drawNebula = () => {
      nebulaClouds.forEach(cloud => {
        const gradient = ctx.createRadialGradient(
          cloud.x, cloud.y, 0,
          cloud.x, cloud.y, cloud.radius
        );
        gradient.addColorStop(0, cloud.color.replace('15%', '25%'));
        gradient.addColorStop(0.5, cloud.color.replace('15%', '10%'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Slow drift
        cloud.x += Math.sin(time * 0.001) * cloud.drift;
        cloud.y += Math.cos(time * 0.0008) * cloud.drift * 0.5;
        
        // Wrap around
        if (cloud.x > width + cloud.radius) cloud.x = -cloud.radius;
        if (cloud.x < -cloud.radius) cloud.x = width + cloud.radius;
      });
    };

    const drawStars = () => {
      stars.forEach(star => {
        // Enhanced parallax effect
        const parallaxFactor = star.type === 'bright' ? 0.001 : 0.0003;
        const dx = (mouseX - width / 2) * parallaxFactor;
        const dy = (mouseY - height / 2) * parallaxFactor;
        star.x += dx;
        star.y += dy;

        // Gentle downward drift
        star.y += star.speed;
        
        // Wrap around
        if (star.y > height + 10) star.y = -10;
        if (star.x > width + 10) star.x = -10;
        if (star.x < -10) star.x = width + 10;

        // Twinkling effect
        star.twinkle += 0.05;
        const twinkleIntensity = (Math.sin(star.twinkle) + 1) * 0.5;
        const alpha = star.brightness * (0.6 + twinkleIntensity * 0.4);

        ctx.save();
        ctx.globalAlpha = alpha;
        
        if (star.type === 'bright') {
          // Bright stars with cross pattern
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'white';
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 2, star.y);
          ctx.lineTo(star.x + star.radius * 2, star.y);
          ctx.moveTo(star.x, star.y - star.radius * 2);
          ctx.lineTo(star.x, star.y + star.radius * 2);
          ctx.stroke();
        }
        
        // Main star body
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.shadowBlur = star.type === 'bright' ? 6 : 3;
        ctx.shadowColor = 'white';
        ctx.fill();
        
        ctx.restore();
      });
    };

    const drawShootingStars = () => {
      shootingStars.forEach(s => {
        // Add point to trail
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 8) s.trail.shift();

        // Draw trail
        if (s.trail.length > 1) {
          ctx.save();
          ctx.globalAlpha = s.opacity;
          ctx.strokeStyle = 'white';
          ctx.shadowBlur = 15;
          ctx.shadowColor = 'cyan';
          
          for (let i = 1; i < s.trail.length; i++) {
            const alpha = i / s.trail.length;
            ctx.globalAlpha = s.opacity * alpha;
            ctx.lineWidth = 3 * alpha;
            ctx.beginPath();
            ctx.moveTo(s.trail[i-1].x, s.trail[i-1].y);
            ctx.lineTo(s.trail[i].x, s.trail[i].y);
            ctx.stroke();
          }
          ctx.restore();
        }

        // Move shooting star
        s.x += s.speedX;
        s.y += s.speedY;

        // Reset when off screen
        if (s.x > width + 100 || s.y > height + 100) {
          s.x = Math.random() * -200 - 100;
          s.y = Math.random() * height * 0.4;
          s.trail = [];
          s.opacity = Math.random() * 0.5 + 0.5;
        }
      });
    };

    const drawPlanets = () => {
      planets.forEach(p => {
        const x = width / 2 + Math.cos(angle * p.speed + p.angleOffset) * p.orbitRadius;
        const y = height / 2 + Math.sin(angle * p.speed + p.angleOffset) * p.orbitRadius;
        const img = planetImages[p.key];

        ctx.save();
        
        // Orbital trail (faint)
        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, p.orbitRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.globalAlpha = 1;
        
        // Planet glow
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, p.radius * 2);
        glowGradient.addColorStop(0, `${p.color}40`);
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x, y, p.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw planet
        if (img) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = p.color;
          ctx.drawImage(
            img, 
            x - p.radius, 
            y - p.radius, 
            p.radius * 2, 
            p.radius * 2
          );
        }
        
        ctx.restore();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw background gradient
      const bgGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height)
      );
      bgGradient.addColorStop(0, '#0a0a0a');
      bgGradient.addColorStop(0.5, '#1a1a2e');
      bgGradient.addColorStop(1, '#16213e');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      drawNebula();
      drawStars();
      drawShootingStars();
      drawPlanets();

      angle += 0.3;
      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      resize();
    };

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize
    loadImages().then(() => {
      resize();
      setIsLoaded(true);
      animate();
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1]">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
          <div className="text-white text-lg animate-pulse">Loading cosmic view...</div>
        </div>
      )}
    </div>
  );
}