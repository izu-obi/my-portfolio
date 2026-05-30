import { useEffect, useRef, useState } from 'react';

export default function Background() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let mobile = width <= 768;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let angle = 0;
    let time = 0;

    let stars = [];
    let shootingStars = [];
    let nebulaClouds = [];
    let planets = [];

    const planetImages = {};

    const colors = {
      background: ['#0a0a0a', '#1a1a2e', '#16213e'],
      star: '#fff',
      shootingStar: '#00ffff',
      orbitalTrailOpacity: 0.08,
    };

    const planetSources = {
      earth:
        'https://www.pngmart.com/files/3/Earth-PNG-Transparent-Image.png',
      venus:
        'https://www.pngmart.com/files/3/Venus-PNG-Transparent-Image.png',
      jupiter:
        'https://www.pngmart.com/files/3/Jupiter-PNG-Transparent-Image.png',
    };

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loadImages = async () => {
      const promises = Object.entries(
        planetSources
      ).map(([key, src]) => {
        return new Promise((resolve) => {
          const img = new Image();

          img.crossOrigin = 'anonymous';
          img.src = src;

          img.onload = () => {
            planetImages[key] = img;
            resolve();
          };

          img.onerror = resolve;
        });
      });

      return Promise.all(promises);
    };

    const getPlanetConfig = () => {
      const orbitBase = mobile
        ? Math.min(width, height)
        : Math.max(width, height);

      const baseSize = mobile
        ? Math.min(width, height) * 0.035
        : Math.min(width, height) * 0.05;

      return [
        {
          orbitRadius: orbitBase * 0.18,
          radius: baseSize,
          key: 'earth',
          speed: 0.012,
          angleOffset: 0,
          color: '#4A90E2',
        },
        {
          orbitRadius: orbitBase * 0.28,
          radius: baseSize * 0.8,
          key: 'venus',
          speed: 0.008,
          angleOffset: Math.PI / 3,
          color: '#FFA500',
        },
        {
          orbitRadius: orbitBase * 0.4,
          radius: baseSize * 1.3,
          key: 'jupiter',
          speed: 0.005,
          angleOffset: Math.PI,
          color: '#FF6B6B',
        },
      ];
    };

    const generateStars = () => {
      const density = mobile ? 9000 : 6500;

      stars = Array.from(
        {
          length: Math.floor(
            (width * height) / density
          ),
        },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          radius:
            Math.random() *
              (mobile ? 1.5 : 2) +
            0.5,
          speed:
            Math.random() * 0.25 + 0.08,
          twinkle:
            Math.random() * Math.PI * 2,
          brightness:
            Math.random() * 0.5 + 0.5,
          type:
            Math.random() > 0.96
              ? 'bright'
              : 'normal',
        })
      );
    };

    const generateShootingStars = () => {
      const count = mobile ? 1 : 3;

      shootingStars = Array.from(
        { length: count },
        () => ({
          x: Math.random() * width - 300,
          y: Math.random() * height * 0.5,
          speedX:
            Math.random() * 4 + 4,
          speedY:
            Math.random() * 1 + 0.5,
          opacity:
            Math.random() * 0.5 + 0.5,
          trail: [],
        })
      );
    };

    const generateNebulaClouds = () => {
      const count = mobile ? 2 : 5;

      nebulaClouds = Array.from(
        { length: count },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          radius:
            Math.random() *
              (mobile ? 220 : 380) +
            150,
          color: `hsla(${
            240 + Math.random() * 60
          }, 50%, 15%, 0.18)`,
          drift:
            Math.random() * 0.15 + 0.05,
        })
      );
    };

    const resize = () => {
      mobile = window.innerWidth <= 768;

      setCanvasSize();

      planets = getPlanetConfig();

      generateStars();
      generateShootingStars();
      generateNebulaClouds();
    };

    const drawNebula = () => {
      nebulaClouds.forEach((cloud) => {
        const gradient =
          ctx.createRadialGradient(
            cloud.x,
            cloud.y,
            0,
            cloud.x,
            cloud.y,
            cloud.radius
          );

        gradient.addColorStop(
          0,
          cloud.color
        );

        gradient.addColorStop(
          1,
          'transparent'
        );

        ctx.fillStyle = gradient;

        ctx.beginPath();

        ctx.arc(
          cloud.x,
          cloud.y,
          cloud.radius,
          0,
          Math.PI * 2
        );

        ctx.fill();
      });
    };

    const drawStars = () => {
      stars.forEach((star) => {
        star.y += star.speed;

        if (star.y > height) {
          star.y = -10;
          star.x = Math.random() * width;
        }

        star.twinkle += 0.05;

        const alpha =
          star.brightness *
          (0.6 +
            ((Math.sin(star.twinkle) + 1) /
              2) *
              0.4);

        ctx.save();

        ctx.globalAlpha = alpha;

        ctx.beginPath();

        ctx.arc(
          star.x,
          star.y,
          star.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = '#fff';
        ctx.fill();

        ctx.restore();
        ctx.globalCompositeOperation = 'source-over';
      });
    };

    const drawShootingStars = () => {
      shootingStars.forEach((s) => {
        s.trail.push({
          x: s.x,
          y: s.y,
        });

        if (s.trail.length > 8)
          s.trail.shift();

        for (
          let i = 1;
          i < s.trail.length;
          i++
        ) {
          ctx.globalAlpha =
            i / s.trail.length;

          ctx.strokeStyle =
            colors.shootingStar;

          ctx.beginPath();

          ctx.moveTo(
            s.trail[i - 1].x,
            s.trail[i - 1].y
          );

          ctx.lineTo(
            s.trail[i].x,
            s.trail[i].y
          );

          ctx.stroke();
        }

        s.x += s.speedX;
        s.y += s.speedY;

        if (
          s.x > width + 200 ||
          s.y > height + 200
        ) {
          s.x = -200;
          s.y =
            Math.random() *
            height *
            0.4;
          s.trail = [];
        }
      });

      ctx.globalAlpha = 1;
    };

    const drawPlanets = () => {
      planets.forEach((p) => {
        const x =
          width / 2 +
          Math.cos(
            angle * p.speed +
              p.angleOffset
          ) *
            p.orbitRadius;

        const y =
          height / 2 +
          Math.sin(
            angle * p.speed +
              p.angleOffset
          ) *
            p.orbitRadius;

        const img = planetImages[p.key];
        if (!img) return;

        ctx.save();

        ctx.globalAlpha =
          colors.orbitalTrailOpacity;

        ctx.strokeStyle = p.color;

        ctx.beginPath();

        ctx.arc(
          width / 2,
          height / 2,
          p.orbitRadius,
          0,
          Math.PI * 2
        );

        ctx.stroke();

        ctx.globalAlpha = 1;

        ctx.drawImage(
          img,
          x - p.radius,
          y - p.radius,
          p.radius * 2,
          p.radius * 2
        );

        ctx.restore();
      });
    };

    // const animate = () => {
    //   ctx.clearRect(0, 0, width, height);

    //   const bg =
    //     ctx.createRadialGradient(
    //       width / 2,
    //       height / 2,
    //       0,
    //       width / 2,
    //       height / 2,
    //       Math.max(width, height)
    //     );

    //   bg.addColorStop(
    //     0,
    //     colors.background[0]
    //   );

    //   bg.addColorStop(
    //     0.5,
    //     colors.background[1]
    //   );

    //   bg.addColorStop(
    //     1,
    //     colors.background[2]
    //   );

    //   ctx.fillStyle = bg;
    //   ctx.fillRect(0, 0, width, height);

    //   drawNebula();
    //   drawStars();
    //   drawShootingStars();
    //   drawPlanets();

    //   angle += mobile ? 0.2 : 0.3;
    //   time++;

    //   animationRef.current =
    //     requestAnimationFrame(animate);
    // };

    const animate = () => {
  // 1. HARD DARK BASE (prevents white flash in light mode)
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);

  // 2. Background gradient (your original logic)
  const bg = ctx.createRadialGradient(
    width / 2,
    height / 2,
    0,
    width / 2,
    height / 2,
    Math.max(width, height)
  );

  bg.addColorStop(0, colors.background[0]);
  bg.addColorStop(0.5, colors.background[1]);
  bg.addColorStop(1, colors.background[2]);

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // 3. IMPORTANT: draw your elements (you already have logic elsewhere)
  drawNebula?.();
  drawStars?.();
  drawShootingStars?.();
  drawPlanets?.();

  angle += mobile ? 0.2 : 0.3;

  animationRef.current = requestAnimationFrame(animate);
};

    const handleResize = () => resize();

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener(
      'resize',
      handleResize
    );

    window.addEventListener(
      'mousemove',
      handleMouseMove
    );

    loadImages().then(() => {
      resize();
      setIsLoaded(true);
      animate();
    });

    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      );

      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* BACKGROUND LAYER (canvas only) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* LOADING OVERLAY */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-black" />
      )}
    </div>
  );
}