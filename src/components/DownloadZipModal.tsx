import React, { useState } from 'react';
import { X, Download, FolderArchive, Terminal, Check, Copy, Code2, Loader2, Sparkles } from 'lucide-react';
import { downloadDynamicProjectZip } from '../utils/downloadZip';

interface DownloadZipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadZipModal: React.FC<DownloadZipModalProps> = ({ isOpen, onClose }) => {
  const [copiedStep, setCopiedStep] = useState<string | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(id);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const handleBrowserDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadDynamicProjectZip((status) => {
        setDownloadStatus(status);
      });
      setTimeout(() => {
        setDownloadStatus('Downloaded to your Downloads folder!');
        setIsDownloading(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setDownloadStatus('Download error. Please retry.');
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative max-w-xl w-full bg-[#FCFAF7] rounded-3xl overflow-hidden shadow-2xl border border-amber-900/20 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-[#2A1406] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Download Website Project</h3>
              <p className="text-xs text-amber-200">Direct download to your computer for Visual Studio Code</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Main Direct Download Action */}
          <div className="p-6 bg-gradient-to-br from-amber-50 via-amber-100/50 to-amber-200/30 border border-amber-300 rounded-2xl text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 bg-[#2A1406] text-amber-300 rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Download className="w-6 h-6" />
            </div>

            <div>
              <h4 className="font-display text-lg font-bold text-[#2A1406]">
                Direct Browser Download (Recommended)
              </h4>
              <p className="text-xs text-[#5C4535] max-w-sm mx-auto mt-1">
                Packages the entire project directly inside your browser and saves <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-[#8A4616]">ghee-panjiri-website.zip</code> straight to your Windows Downloads folder.
              </p>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleBrowserDownload}
              disabled={isDownloading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#B45309] hover:to-[#92400E] text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-950/20 hover:shadow-amber-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-70"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Preparing ZIP...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Download ghee-panjiri-website.zip (5 MB)</span>
                </>
              )}
            </button>

            {downloadStatus && (
              <p className="text-xs font-semibold text-emerald-800 bg-emerald-50 py-1.5 px-3 rounded-lg border border-emerald-200 inline-block">
                ✓ {downloadStatus}
              </p>
            )}
          </div>

          {/* Quick Steps for VS Code on Windows */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A5A36] flex items-center gap-1.5">
              <Code2 className="w-4 h-4" />
              <span>Step-by-Step Instructions for Windows & VS Code:</span>
            </h4>

            <div className="space-y-2 text-xs">
              {/* Step 1 */}
              <div className="p-3 bg-white border border-[#E5DACB] rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#2A1406]">1. Extract the downloaded ZIP</span>
                  <p className="text-[#6B5342]">Right-click <code className="text-[#8A4616] font-mono">ghee-panjiri-website.zip</code> in your Downloads and choose <strong>"Extract All..."</strong></p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-3 bg-white border border-[#E5DACB] rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#2A1406]">2. Open folder in VS Code</span>
                  <p className="text-[#6B5342]">In VS Code, go to <strong>File &gt; Open Folder...</strong> and choose the extracted folder</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-3 bg-[#1C140E] text-amber-100 rounded-xl flex items-center justify-between font-mono">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>npm install</span>
                </div>
                <button
                  onClick={() => copyToClipboard('npm install', 'install')}
                  className="p-1 hover:bg-white/10 rounded text-amber-300 cursor-pointer"
                  title="Copy command"
                >
                  {copiedStep === 'install' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Step 4 */}
              <div className="p-3 bg-[#1C140E] text-amber-100 rounded-xl flex items-center justify-between font-mono">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>npm run dev</span>
                </div>
                <button
                  onClick={() => copyToClipboard('npm run dev', 'dev')}
                  className="p-1 hover:bg-white/10 rounded text-amber-300 cursor-pointer"
                  title="Copy command"
                >
                  {copiedStep === 'dev' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F5EFE6] border-t border-[#E5DACB] flex items-center justify-between text-xs text-[#5C4535]">
          <span>Includes all components, animated video engine & assets</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#2A1406] text-white rounded-lg hover:bg-[#43200A] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
