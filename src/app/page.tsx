'use client';

import { useState } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold text-white">AutoAgent</span>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-200"
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI Browser
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {' '}Automation
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the future of web automation with our intelligent AI agent. 
              Automatically navigate, fill forms, and interact with websites like a human.
            </p>
            
            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Bot className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Smart Navigation</h3>
                <p className="text-gray-300 text-sm">Intelligently navigates websites and locates forms automatically</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <CheckCircle className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Form Automation</h3>
                <p className="text-gray-300 text-sm">Fills out complex forms with human-like interactions</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Loader className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Real-time Results</h3>
                <p className="text-gray-300 text-sm">Get instant feedback and detailed automation reports</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={runAutomation}
            disabled={isLoading}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </button>
          
          <p className="text-sm text-gray-400 mt-4">
            Click to automatically fill the ChaiCode signup form
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Bot className="h-6 w-6 text-purple-400" />
              <span className="text-gray-300">© 2025 AutoAgent. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Result Modal */}
      {showModal && result && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {result.success ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-500" />
                  )}
                  <h2 className="text-xl font-bold text-gray-900">
                    {result.success ? 'Automation Successful!' : 'Automation Failed'}
                  </h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{result.message}</p>
                </div>

                {result.success && result.formData && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Form Data Submitted:</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-medium text-gray-700">First Name:</span>
                        <span className="text-gray-900">{result.formData.firstName}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-medium text-gray-700">Last Name:</span>
                        <span className="text-gray-900">{result.formData.lastName}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="text-gray-900">{result.formData.email}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-medium text-gray-700">Password:</span>
                        <span className="text-gray-900">••••••••••••</span>
                      </div>
                    </div>
                  </div>
                )}

                {result.finalUrl && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-700">Final URL: </span>
                    <a 
                      href={result.finalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline break-all"
                    >
                      {result.finalUrl}
                    </a>
                  </div>
                )}

                {result.error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <span className="font-medium text-red-700">Error: </span>
                    <span className="text-red-600">{result.error}</span>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
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
