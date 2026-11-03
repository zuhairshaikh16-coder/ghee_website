import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Sparkles, CheckCircle2, ChevronRight, Flame } from 'lucide-react';
import { MAKING_VIDEO_CHAPTERS, MakingVideoChapter } from '../data/products';

export const HowItsMadeVideoSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ghee' | 'panjiri'>('all');
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const filteredChapters = MAKING_VIDEO_CHAPTERS.filter((chap) => {
    if (selectedCategory === 'all') return true;
    return chap.itemType === selectedCategory;
  });

  const currentChapter: MakingVideoChapter = filteredChapters[activeChapterIndex] || filteredChapters[0];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
    setProgress(0);
  }, [activeChapterIndex, selectedCategory]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(current);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <section id="how-its-made" className="py-16 sm:py-24 bg-[#1C0D05] text-[#FDFBF7] border-y border-amber-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FCD34D] mb-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Behind The Scenes · Traditional Kitchen</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Watch How Desi Ghee & Panjiri Is Made
          </h2>
          <p className="mt-4 text-base sm:text-lg text-amber-200/80 leading-relaxed font-light">
            Follow our authentic multi-step craft from raw cultured milk to aromatic slow-roasted golden Panjiri loaded with crispy puffed Gond and roasted nuts.
          </p>

          {/* Process Switcher Tabs */}
          <div className="inline-flex items-center gap-1.5 p-1 mt-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-xs">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveChapterIndex(0);
              }}
              className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#F59E0B] text-black shadow-sm'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              Full Process (All 5 Steps)
            </button>
            <button
              onClick={() => {
                setSelectedCategory('ghee');
                setActiveChapterIndex(0);
              }}
              className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                selectedCategory === 'ghee'
                  ? 'bg-[#F59E0B] text-black shadow-sm'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              Desi Ghee Making
            </button>
            <button
              onClick={() => {
                setSelectedCategory('panjiri');
                setActiveChapterIndex(0);
              }}
              className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                selectedCategory === 'panjiri'
                  ? 'bg-[#F59E0B] text-black shadow-sm'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              Panjiri Roasting
            </button>
          </div>
        </div>

        {/* 2-Column Interactive Video Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Viewport (Col 1-7) */}
          <div className="lg:col-span-7 bg-[#261207] rounded-3xl overflow-hidden border border-amber-900/40 shadow-2xl relative flex flex-col">
            {/* Video Screen Container */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                src={currentChapter.videoSrc}
                poster={currentChapter.posterImg}
                autoPlay
                playsInline
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover filter brightness-90"
              />

              {/* Dynamic Video Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Step Badge Overlay on Video */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1 bg-[#D97706]/90 backdrop-blur-md text-white font-bold text-xs rounded-lg shadow-sm">
                  Step {currentChapter.stepNumber} of 5
                </span>
                <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-amber-200 text-xs rounded-lg font-medium">
                  {currentChapter.itemType === 'ghee' ? 'Pure Ghee Craft' : 'Panjiri Roast'}
                </span>
              </div>

              {/* Center Play/Pause button on click */}
              <button
                onClick={togglePlay}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-transparent group cursor-pointer"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {!isPlaying && (
                  <div className="w-16 h-16 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shadow-xl transform scale-100 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-black translate-x-0.5" />
                  </div>
                )}
              </button>

              {/* Bottom Video Progress Bar */}
              <div className="absolute bottom-0 inset-x-0 h-1.5 bg-white/20">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-[#FBBF24] transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="p-4 sm:p-5 bg-[#200E05] border-t border-amber-900/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 sm:px-3 sm:py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-amber-300" />}
                  <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 sm:px-3 sm:py-1.5 bg-white/5 hover:bg-white/10 text-amber-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Sound On'}</span>
                </button>

                <button
                  onClick={handleRestart}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-200 transition-colors cursor-pointer"
                  title="Replay step"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Video Title Indicator */}
              <div className="text-right truncate max-w-[200px] sm:max-w-xs">
                <p className="text-xs font-semibold text-white truncate">
                  {currentChapter.title}
                </p>
                <p className="text-[11px] text-amber-400/80">
                  Natural Traditional Method
                </p>
              </div>
            </div>

            {/* Step Details & Live Chef Advice */}
            <div className="p-5 sm:p-6 space-y-4">
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  {currentChapter.title}
                </h3>
                <p className="text-sm text-amber-100/90 mt-1 leading-relaxed">
                  {currentChapter.description}
                </p>
              </div>

              {/* Chef secret tip box */}
              <div className="p-4 bg-amber-950/60 border border-amber-700/40 rounded-2xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Artisan Secret
                  </span>
                  <p className="text-xs text-amber-100/85 mt-0.5 leading-relaxed">
                    {currentChapter.chefTips}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step Selection Playlist (Col 8-12) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-1 px-1">
              Select A Chapter to Watch:
            </div>

            <div className="space-y-2.5">
              {filteredChapters.map((chap, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={chap.id}
                    onClick={() => {
                      setActiveChapterIndex(idx);
                      setIsPlaying(true);
                    }}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-[#3A1B0B] border-[#F59E0B] shadow-md shadow-amber-950/50'
                        : 'bg-[#220E05] border-amber-950/70 hover:bg-[#2C1307] hover:border-amber-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Step Number Badge */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm tabular-nums ${
                          isActive
                            ? 'bg-[#F59E0B] text-black'
                            : 'bg-white/10 text-amber-200'
                        }`}
                      >
                        {isActive ? (
                          <Play className="w-4 h-4 fill-black translate-x-0.5" />
                        ) : (
                          chap.stepNumber
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                            {chap.itemType === 'ghee' ? 'Pure Ghee' : 'Panjiri'}
                          </span>
                          <span className="text-white/30 text-[10px]">·</span>
                          <span className="text-[11px] text-amber-200/60 tabular-nums">
                            {chap.duration}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white truncate mt-0.5">
                          {chap.title}
                        </h4>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isActive ? (
                        <CheckCircle2 className="w-5 h-5 text-amber-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-amber-400/50" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quality Statement Card */}
            <div className="mt-6 p-5 bg-[#2B1408] border border-amber-900/50 rounded-2xl text-xs text-amber-200/90 space-y-2">
              <h5 className="font-bold text-white text-sm">
                Authentic Craftsmanship Promise
              </h5>
              <p className="leading-relaxed">
                We never use pre-packaged powders or industrial high-speed blenders. Every batch of our Panjiri is roasted in heavy copper-bottom kadai with fresh Asli Desi Ghee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
