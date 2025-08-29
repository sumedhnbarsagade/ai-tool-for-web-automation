'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Bot, CheckCircle, XCircle, Loader } from 'lucide-react';

interface AutomationResult {
  success: boolean;
  message: string;
  finalUrl?: string;
  formData?: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  error?: string;
}

// Matrix Background Component
const MatrixBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = '0101010101000000010101001010100110100101010101001010101010010101010101';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // Animation function
    const draw = () => {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = 'rgba(12, 16, 29, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00aaff';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Draw character with blue variations
        ctx.fillStyle = i % 3 === 0 ? '#00aaff' : i % 2 === 0 ? '#0088cc' : '#0066aa';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop randomly or when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      id="matrix-canvas"
      className="fixed inset-0 w-full h-full z-0"
      style={{ background: '#0c101d' }}
    />
  );
};

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<AutomationResult | null>(null);

  const runAutomation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
      });
      const data = await response.json();
      setResult(data);
      setShowModal(true);
    } catch (error) {
      setResult({
        success: false,
        message: 'Failed to connect to automation service',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#0c101d' }}>
      {/* Matrix Background */}
      <MatrixBackground />
      
      {/* Overlay for better content visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20 z-10" />
      
      {/* Content Container */}
      <div className="relative z-20">
        {/* Header */}
        <header className="bg-black/30 backdrop-blur-md border-b border-blue-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <Bot className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold text-white">Web Agent</span>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-mono">
                AI Browser
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {' '}Automation
                </span>
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto font-mono">
                Experience the future of web automation with our intelligent AI agent. 
                Automatically navigate, fill forms, and interact with websites like a human.
              </p>
              
              {/* Feature Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Bot className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 font-mono">Smart Navigation</h3>
                  <p className="text-white/70 text-sm">Intelligently navigates websites and locates forms automatically</p>
                </div>
                
                <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <CheckCircle className="h-6 w-6 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 font-mono">Form Automation</h3>
                  <p className="text-white/70 text-sm">Fills out complex forms with human-like interactions</p>
                </div>
                
                <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Loader className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 font-mono">Real-time Results</h3>
                  <p className="text-white/70 text-sm">Get instant feedback and detailed automation reports</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={runAutomation}
              disabled={isLoading}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-mono"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Running Automation...
                </>
              ) : (
                <>
                  <Bot className="h-5 w-5 mr-2" />
                  Start AI Automation
                </>
              )}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
            </button>
            
            <p className="text-sm text-white/60 mt-4 font-mono">
              Click to automatically fill the ChaiCode signup form
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-black/30 backdrop-blur-md border-t border-blue-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Bot className="h-6 w-6 text-blue-400" />
                <span className="text-white/80 font-mono">© 2025 AutoAgent. All rights reserved.</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-white/60 font-mono">
                <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors duration-200">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Result Modal */}
      {showModal && result && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-blue-500/30 rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {result.success ? (
                    <CheckCircle className="h-8 w-8 text-blue-500" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-500" />
                  )}
                  <h2 className="text-xl font-bold text-white font-mono">
                    {result.success ? 'Automation Successful!' : 'Automation Failed'}
                  </h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-4">
                <div className="p-4 bg-black/40 border border-blue-500/20 rounded-lg">
                  <p className="text-white font-mono text-sm">{result.message}</p>
                </div>

                {result.success && result.formData && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-white font-mono">Form Data Submitted:</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <span className="font-medium text-white font-mono">First Name:</span>
                        <span className="text-white font-mono">{result.formData.firstName}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <span className="font-medium text-white font-mono">Last Name:</span>
                        <span className="text-white font-mono">{result.formData.lastName}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <span className="font-medium text-white font-mono">Email:</span>
                        <span className="text-white font-mono">{result.formData.email}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <span className="font-medium text-white font-mono">Password:</span>
                        <span className="text-white font-mono">••••••••••••</span>
                      </div>
                    </div>
                  </div>
                )}

                {result.finalUrl && (
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                    <span className="font-medium text-white font-mono">Final URL: </span>
                    <a 
                      href={result.finalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 underline break-all font-mono text-sm"
                    >
                      {result.finalUrl}
                    </a>
                  </div>
                )}

                {result.error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <span className="font-medium text-white font-mono">Error: </span>
                    <span className="text-red-300 font-mono text-sm">{result.error}</span>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-mono font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
