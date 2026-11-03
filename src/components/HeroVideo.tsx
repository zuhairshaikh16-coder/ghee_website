import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Video, ArrowDown, ExternalLink } from 'lucide-react';

interface HeroVideoProps {
  onExploreMenu: () => void;
  onOpenOriginalPoster: () => void;
  onDownloadZip: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  onExploreMenu,
  onOpenOriginalPoster,
  onDownloadZip,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [activeMode, setActiveMode] = useState<'ai-canvas' | 'video-stream'>('ai-canvas');
  const [isHovering, setIsHovering] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioGainRef = useRef<GainNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mousePosRef = useRef<{ x: number; y: number; prevX: number; prevY: number; isInteracting: boolean }>({
    x: -100,
    y: -100,
    prevX: -100,
    prevY: -100,
    isInteracting: false,
  });

  // Sound generator (soothing hot ghee simmering / roasting crackle) using Web Audio API
  const toggleAudio = () => {
    if (isAudioMuted) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioContextRef.current) {
          const ctx = new AudioCtx();
          audioContextRef.current = ctx;

          // Pink noise buffer for gentle simmering oil/ghee sizzle
          const bufferSize = ctx.sampleRate * 2;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
            b6 = white * 0.115926;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          // Bandpass filter to model gentle pan simmer
          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(1400, ctx.currentTime);
          filter.Q.setValueAtTime(1.2, ctx.currentTime);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          audioGainRef.current = gain;

          whiteNoise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          whiteNoise.start(0);
        } else if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }

        if (audioGainRef.current) {
          audioGainRef.current.gain.setValueAtTime(0.25, audioContextRef.current?.currentTime || 0);
        }
        setIsAudioMuted(false);
      } catch (e) {
        console.warn('AudioContext init error:', e);
      }
    } else {
      if (audioGainRef.current && audioContextRef.current) {
        audioGainRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      }
      setIsAudioMuted(true);
    }
  };

  // Video play/pause toggle
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Canvas AI Generative Simmering Animation Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle Classes: Golden Ghee Liquid Ripples, Roasted Semolina Flecks, Dry Fruit Slices & Steam
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      type: 'ghee-drop' | 'roast-crumb' | 'almond-slice' | 'makhana' | 'steam' | 'saffron';
      angle: number;
      vAngle: number;
      life?: number;
      maxLife?: number;
    }

    const particles: Particle[] = [];
    const PARTICLE_COUNT = 85;

    // Seed realistic golden and earthen warm food particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const types: Particle['type'][] = ['ghee-drop', 'roast-crumb', 'almond-slice', 'makhana', 'steam', 'saffron'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      let color = '#E69C24';
      let size = 2 + Math.random() * 4;

      if (type === 'ghee-drop') {
        color = Math.random() > 0.5 ? '#FBBF24' : '#F59E0B';
        size = 3 + Math.random() * 5;
      } else if (type === 'roast-crumb') {
        color = Math.random() > 0.5 ? '#9A3412' : '#C27803';
        size = 1.5 + Math.random() * 2.5;
      } else if (type === 'almond-slice') {
        color = '#FEF3C7';
        size = 4 + Math.random() * 6;
      } else if (type === 'makhana') {
        color = '#FFFBEB';
        size = 6 + Math.random() * 7;
      } else if (type === 'saffron') {
        color = '#DC2626';
        size = 3 + Math.random() * 8;
      } else if (type === 'steam') {
        color = 'rgba(255, 245, 230, 0.15)';
        size = 20 + Math.random() * 40;
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: type === 'steam' ? -0.4 - Math.random() * 0.6 : (Math.random() - 0.5) * 0.3,
        size,
        alpha: type === 'steam' ? 0.08 + Math.random() * 0.12 : 0.4 + Math.random() * 0.5,
        color,
        type,
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.02,
        life: 0,
        maxLife: type === 'steam' ? 180 + Math.random() * 120 : undefined,
      });
    }

    let t = 0;

    const render = () => {
      if (isPlaying) {
        t += 0.015;

        // Warm golden atmospheric background gradient with subtle radial shimmer
        const bgGrad = ctx.createRadialGradient(
          width * 0.5 + Math.sin(t * 0.7) * 40,
          height * 0.5 + Math.cos(t * 0.5) * 30,
          width * 0.05,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.8
        );
        bgGrad.addColorStop(0, '#3F1E07');
        bgGrad.addColorStop(0.35, '#261204');
        bgGrad.addColorStop(0.75, '#160902');
        bgGrad.addColorStop(1, '#0C0501');

        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Golden Liquid Swirl Waves (simulating warm bubbling clarified ghee)
        const waveCount = 3;
        for (let w = 0; w < waveCount; w++) {
          ctx.beginPath();
          const wavePhase = t * (0.8 + w * 0.3) + w * 2;
          const baseY = height * 0.65 + w * 45;
          ctx.moveTo(0, height);
          ctx.lineTo(0, baseY);

          for (let x = 0; x <= width; x += 30) {
            const distFromMouse = Math.hypot(x - mousePosRef.current.x, baseY - mousePosRef.current.y);
            let mouseLift = 0;
            if (distFromMouse < 220) {
              mouseLift = Math.sin((1 - distFromMouse / 220) * Math.PI) * 28;
            }
            const y = baseY + Math.sin(x * 0.005 + wavePhase) * 25 + Math.cos(x * 0.009 + wavePhase * 0.5) * 15 - mouseLift;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(width, height);
          ctx.closePath();

          const waveGrad = ctx.createLinearGradient(0, baseY - 30, 0, height);
          if (w === 0) {
            waveGrad.addColorStop(0, 'rgba(217, 119, 6, 0.22)');
            waveGrad.addColorStop(1, 'rgba(120, 53, 15, 0.08)');
          } else if (w === 1) {
            waveGrad.addColorStop(0, 'rgba(245, 158, 11, 0.16)');
            waveGrad.addColorStop(1, 'rgba(69, 26, 3, 0.1)');
          } else {
            waveGrad.addColorStop(0, 'rgba(251, 191, 36, 0.12)');
            waveGrad.addColorStop(1, 'rgba(41, 15, 2, 0.25)');
          }
          ctx.fillStyle = waveGrad;
          ctx.fill();
        }

        // Draw and update animated particles
        particles.forEach((p) => {
          // Dynamic swirling motion
          p.angle += p.vAngle;

          // Mouse swirl interaction (stirring the golden kadai)
          if (mousePosRef.current.isInteracting || isHovering) {
            const dx = mousePosRef.current.x - p.x;
            const dy = mousePosRef.current.y - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 180 && dist > 1) {
              const force = (1 - dist / 180) * 2.5;
              // Vortex circular swirl + repulsion
              p.vx += (-dy / dist) * force * 0.4 + (dx / dist) * 0.15;
              p.vy += (dx / dist) * force * 0.4 + (dy / dist) * 0.15;
            }
          }

          // Viscous drag in ghee
          p.vx *= 0.96;
          p.vy = p.type === 'steam' ? p.vy * 0.98 : p.vy * 0.96;

          p.x += p.vx + Math.sin(t + p.y * 0.01) * 0.3;
          p.y += p.vy;

          // Boundary wrapping / resetting
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -30) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }
          if (p.y > height + 30) {
            p.y = -20;
            p.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = p.alpha;

          if (p.type === 'steam') {
            // Rising culinary steam plume
            const steamGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
            steamGrad.addColorStop(0, 'rgba(254, 243, 199, 0.12)');
            steamGrad.addColorStop(0.5, 'rgba(253, 230, 138, 0.05)');
            steamGrad.addColorStop(1, 'rgba(253, 230, 138, 0)');
            ctx.fillStyle = steamGrad;
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.type === 'ghee-drop') {
            // Specular highlighted golden oil sphere
            const dropGrad = ctx.createRadialGradient(-p.size * 0.3, -p.size * 0.3, 1, 0, 0, p.size);
            dropGrad.addColorStop(0, '#FEF08A');
            dropGrad.addColorStop(0.4, '#F59E0B');
            dropGrad.addColorStop(1, '#92400E');
            ctx.fillStyle = dropGrad;
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.type === 'almond-slice') {
            // Flaked badam shape with toasted edge
            ctx.fillStyle = '#FDE68A';
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 1.6, p.size * 0.7, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#B45309';
            ctx.lineWidth = 1;
            ctx.stroke();
          } else if (p.type === 'makhana') {
            // Puffed crunchy foxnut shape
            ctx.fillStyle = '#FFFDF5';
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.arc(p.size * 0.4, -p.size * 0.2, p.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
            // Roasted brown speckle
            ctx.fillStyle = '#78350F';
            ctx.fillRect(0, 0, 2, 2);
          } else if (p.type === 'saffron') {
            // Curled saffron filament (kesar)
            ctx.strokeStyle = '#DC2626';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-p.size, 0);
            ctx.quadraticCurveTo(0, -p.size * 0.5, p.size, 0);
            ctx.stroke();
          } else {
            // Roasted coarse crumb
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          }

          ctx.restore();
        });
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, isHovering]);

  // Mouse & Touch interactions on canvas
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePosRef.current = {
      x,
      y,
      prevX: mousePosRef.current.x,
      prevY: mousePosRef.current.y,
      isInteracting: true,
    };
  };

  const handlePointerLeave = () => {
    mousePosRef.current.isInteracting = false;
    setIsHovering(false);
  };

  return (
    <div
      className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] bg-[#160902] text-white overflow-hidden flex flex-col justify-center"
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={handlePointerLeave}
    >
      {/* BACKGROUND LAYER 1: Fallback / Realistic High-Def Food Ambient Video Stream */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          activeMode === 'video-stream' ? 'opacity-85' : 'opacity-35'
        }`}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/src/assets/images/hero_bilona_ghee_pour_1793636454276.jpg"
          className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1] scale-105"
        >
          {/* Public streaming culinary liquid food video loop */}
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
        </video>
        {/* Warm amber color grading overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#160902] via-[#2A1406]/60 to-[#120701]/80 mix-blend-multiply" />
      </div>

      {/* BACKGROUND LAYER 2: Generative Interactive AI Fluid & Particles Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 pointer-events-auto ${
          activeMode === 'ai-canvas' ? 'opacity-90' : 'opacity-40'
        }`}
      />

      {/* Top subtle vignette for header legibility */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
      {/* Bottom fade into page background */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#FFFDF9] via-[#FFFDF9]/40 to-transparent pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center flex flex-col items-center">
        {/* Clean Editorial Kicker */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wider uppercase text-[#FCD34D] mb-4">
          <span>Pure Desi Goodness</span>
          <span aria-hidden="true" className="text-[#D97706]">·</span>
          <span>Traditional Taste</span>
          <span aria-hidden="true" className="text-[#D97706]">·</span>
          <span>100% Pure Desi Ghee</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFF8ED] leading-[1.15] max-w-4xl text-balance drop-shadow-md">
          Authentic Desi Ghee <br className="hidden sm:block" />
          <span className="italic font-normal text-[#FBBF24]">& Handcrafted Panjiri</span>
        </h1>

        {/* Description / Value Proposition */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-[#FDE68A]/90 max-w-2xl font-light leading-relaxed">
          Coarsely ground whole wheat, slow-roasted over a gentle flame in pure A2 Bilona Desi Ghee, generously blended with crunchy puffed Gond, premium Californian almonds, rich cashews, and traditional Ayurvedic vitality herbs.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreMenu}
            className="px-6 sm:px-8 py-3.5 text-sm sm:text-base font-semibold text-[#220D03] bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] rounded-xl hover:from-[#FCD34D] hover:to-[#FBBF24] shadow-lg shadow-amber-950/40 hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
          >
            <span>Explore Panjiri Menu</span>
            <ArrowDown className="w-4 h-4 text-[#220D03]" />
          </button>

          <button
            onClick={onOpenOriginalPoster}
            className="px-5 sm:px-6 py-3.5 text-sm sm:text-base font-medium text-[#FFF8ED] bg-[#3B1907]/80 hover:bg-[#4E2109] border border-[#B45309]/50 rounded-xl transition-all cursor-pointer flex items-center gap-2 backdrop-blur-sm"
          >
            <span>View Original Menu Poster</span>
            <ExternalLink className="w-4 h-4 text-[#FCD34D]" />
          </button>

          
        </div>

      </div>
    </div>
  );
};