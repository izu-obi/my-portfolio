import { useEffect, useRef, useState } from 'react';

export default function Background() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Check system color scheme
    const checkColorScheme = () => {
      setIsLightMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches);
    };

    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    // Responsive sizing with devicePixelRatio consideration
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      
      // Set canvas CSS size
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      // Set canvas drawing buffer size
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      // Scale context to account for DPR
      ctx.scale(dpr, dpr);
    };

    let width, height;
    setCanvasSize();

    let mouseX = width / 2;
    let mouseY = height / 2;
    let angle = 0;
    let time = 0;

    let stars = [];
    let shootingStars = [];
    let nebulaClouds = [];
    const planetImages = {};

    // Color schemes for light/dark mode
    const colorSchemes = {
      dark: {
        background: ['#0a0a0a', '#1a1a2e', '#16213e'],
        star: 'white',
        shootingStar: 'cyan',
        nebulaBaseHue: 240,
        nebulaSaturation: '50%',
        nebulaLightness: '15%',
        planetGlowOpacity: '40',
        orbitalTrailOpacity: 0.1
      },
      light: {
        background: ['#f0f2ff', '#d6e0ff', '#b3c6ff'],
        star: '#333',
        shootingStar: '#0066ff',
        nebulaBaseHue: 220,
        nebulaSaturation: '30%',
        nebulaLightness: '85%',
        planetGlowOpacity: '30',
        orbitalTrailOpacity: 0.05
      }
    };

    // Get current color scheme
    const getColors = () => colorSchemes[isLightMode ? 'light' : 'dark'];

    // Planet sources
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
            
            const colors = { 
              earth: isLightMode ? '#6b9eff' : '#4A90E2', 
              venus: isLightMode ? '#ffb347' : '#FFA500', 
              jupiter: isLightMode ? '#ff8080' : '#FF6B6B' 
            };
            
            const gradient = fallbackCtx.createRadialGradient(50, 35, 0, 50, 50, 50);
            gradient.addColorStop(0, colors[key] || '#4A90E2');
            gradient.addColorStop(1, isLightMode ? '#ffffff' : '#000');
            
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

    // Responsive planet configuration
    const getPlanetConfig = () => {
      const baseSize = Math.min(width, height) * (isMobile ? 0.03 : 0.04);
      const colors = getColors();
      
      return [
        { 
          orbitRadius: Math.min(width, height) * (isMobile ? 0.12 : 0.15), 
          radius: baseSize, 
          key: 'earth', 
          speed: isMobile ? 0.008 : 0.012, 
          angleOffset: 0,
          color: isLightMode ? '#6b9eff' : '#4A90E2'
        },
        { 
          orbitRadius: Math.min(width, height) * (isMobile ? 0.2 : 0.25), 
          radius: baseSize * 0.8, 
          key: 'venus', 
          speed: isMobile ? 0.005 : 0.008, 
          angleOffset: Math.PI / 3,
          color: isLightMode ? '#ffb347' : '#FFA500'
        },
        { 
          orbitRadius: Math.min(width, height) * (isMobile ? 0.3 : 0.35), 
          radius: baseSize * (isMobile ? 1.2 : 1.5), 
          key: 'jupiter', 
          speed: isMobile ? 0.003 : 0.005, 
          angleOffset: Math.PI,
          color: isLightMode ? '#ff8080' : '#FF6B6B'
        }
      ];
    };

    let planets = getPlanetConfig();

    // Optimized star generation
    const generateStars = () => {
      const starCount = isMobile 
        ? Math.floor((width * height) / 12000) 
        : Math.floor((width * height) / 8000);
      
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * (isMobile ? 1.5 : 2) + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
        brightness: Math.random() * 0.5 + 0.5,
        type: Math.random() > (isMobile ? 0.98 : 0.95) ? 'bright' : 'normal'
      }));
    };

    // Shooting stars
    const generateShootingStars = () => {
      const count = isMobile 
        ? Math.max(1, Math.floor(width / 1200))
        : Math.max(1, Math.floor(width / 800));
      
      shootingStars = Array.from({ length: count }, () => ({
        x: Math.random() * width - 200,
        y: Math.random() * height * 0.6,
        speedX: Math.random() * (isMobile ? 2 : 3) + (isMobile ? 2 : 4),
        speedY: Math.random() * (isMobile ? 1 : 1.5) + 0.5,
        length: Math.random() * (isMobile ? 40 : 80) + (isMobile ? 30 : 60),
        opacity: Math.random() * 0.5 + 0.5,
        trail: []
      }));
    };

    // Nebula clouds
    const generateNebulaClouds = () => {
      const colors = getColors();
      const count = isMobile 
        ? Math.max(1, Math.floor(width / 800))
        : Math.max(2, Math.floor(width / 600));
      
      nebulaClouds = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * (isMobile ? 150 : 200) + (isMobile ? 50 : 100),
        color: `hsl(${colors.nebulaBaseHue + Math.random() * 60}, ${colors.nebulaSaturation}, ${colors.nebulaLightness})`,
        drift: Math.random() * 0.2 + 0.1
      }));
    };

    const resize = () => {
      checkIfMobile();
      checkColorScheme();
      setCanvasSize();
      
      planets = getPlanetConfig();
      generateStars();
      generateShootingStars();
      generateNebulaClouds();
    };

    const drawNebula = () => {
      const colors = getColors();
      nebulaClouds.forEach(cloud => {
        const gradient = ctx.createRadialGradient(
          cloud.x, cloud.y, 0,
          cloud.x, cloud.y, cloud.radius
        );
        gradient.addColorStop(0, cloud.color.replace(/\d+%\)$/, isLightMode ? '75%)' : '25%)'));
        gradient.addColorStop(0.5, cloud.color.replace(/\d+%\)$/, isLightMode ? '90%)' : '10%)'));
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
      const colors = getColors();
      stars.forEach(star => {
        // Reduced parallax effect on mobile
        const parallaxFactor = isMobile 
          ? (star.type === 'bright' ? 0.0005 : 0.0001)
          : (star.type === 'bright' ? 0.001 : 0.0003);
        
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
          ctx.shadowBlur = isMobile ? 5 : 8;
          ctx.shadowColor = colors.star;
          ctx.strokeStyle = colors.star;
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
        ctx.fillStyle = colors.star;
        ctx.shadowBlur = star.type === 'bright' ? (isMobile ? 4 : 6) : (isMobile ? 2 : 3);
        ctx.shadowColor = colors.star;
        ctx.fill();
        
        ctx.restore();
      });
    };

    const drawShootingStars = () => {
      const colors = getColors();
      shootingStars.forEach(s => {
        // Add point to trail
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > (isMobile ? 5 : 8)) s.trail.shift();

        // Draw trail
        if (s.trail.length > 1) {
          ctx.save();
          ctx.globalAlpha = s.opacity;
          ctx.strokeStyle = colors.star;
          ctx.shadowBlur = isMobile ? 10 : 15;
          ctx.shadowColor = colors.shootingStar;
          
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
      const colors = getColors();
      planets.forEach(p => {
        const x = width / 2 + Math.cos(angle * p.speed + p.angleOffset) * p.orbitRadius;
        const y = height / 2 + Math.sin(angle * p.speed + p.angleOffset) * p.orbitRadius;
        const img = planetImages[p.key];

        ctx.save();
        
        // Orbital trail (faint)
        ctx.globalAlpha = colors.orbitalTrailOpacity;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, p.orbitRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.globalAlpha = 1;
        
        // Planet glow
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, p.radius * 2);
        glowGradient.addColorStop(0, `${p.color}${colors.planetGlowOpacity}`);
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x, y, p.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw planet
        if (img) {
          ctx.shadowBlur = isMobile ? 10 : 15;
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
      const colors = getColors();
      const bgGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height)
      );
      bgGradient.addColorStop(0, colors.background[0]);
      bgGradient.addColorStop(0.5, colors.background[1]);
      bgGradient.addColorStop(1, colors.background[2]);
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      drawNebula();
      drawStars();
      drawShootingStars();
      drawPlanets();

      angle += isMobile ? 0.2 : 0.3;
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

    const handleColorSchemeChange = (e) => {
      setIsLightMode(e.matches);
      resize();
    };

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Set up color scheme listener
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: light)');
    colorSchemeQuery.addEventListener('change', handleColorSchemeChange);

    // Initialize
    checkIfMobile();
    checkColorScheme();
    loadImages().then(() => {
      resize();
      setIsLoaded(true);
      animate();
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      colorSchemeQuery.removeEventListener('change', handleColorSchemeChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLightMode]);

  // Get the appropriate background gradient for the loading state
  const loadingBackground = isLightMode 
    ? 'bg-gradient-to-br from-blue-50 to-indigo-100'
    : 'bg-gradient-to-br from-gray-900 to-black';

  return (
    <div className="fixed inset-0 z-[-1]">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          background: isLightMode 
            ? 'linear-gradient(135deg, #f0f2ff 0%, #d6e0ff 50%, #b3c6ff 100%)' 
            : 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)'
        }}
      />
      {!isLoaded && (
        <div className={`absolute inset-0 flex items-center justify-center ${loadingBackground}`}>
          <div className={`text-lg animate-pulse ${isLightMode ? 'text-indigo-800' : 'text-white'}`}>
            Loading cosmic view...
          </div>
        </div>
      )}
    </div>
  );
}