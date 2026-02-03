import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, Download } from 'lucide-react';
import { socialAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const examplePrompts = [
    "A futuristic cityscape at sunset, cyberpunk style, neon lights, highly detailed",
    "A serene mountain landscape with a crystal clear lake, photorealistic, 4k",
    "Abstract digital art, vibrant colors, geometric patterns, modern style",
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedImage('');

    try {
      const result = await socialAPI.generateImage(prompt, negativePrompt);
      
      if (result.status === 'success') {
        setGeneratedImage(result.image_base64);
      } else {
        setError(result.error || 'Failed to generate image');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to connect to server. Image generation may take 1-2 minutes on first request.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `contentforge-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="bg-secondary-100 p-3 rounded-lg">
            <ImageIcon className="h-6 w-6 text-secondary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Image Generator</h2>
            <p className="text-gray-600">Powered by Stable Diffusion XL</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Try examples:</span>
          {examplePrompts.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setPrompt(example)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
            >
              Example {idx + 1}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image Description
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Negative Prompt (Optional)
          </label>
          <input
            type="text"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            placeholder="What to avoid (e.g., blur, low quality, distorted)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full bg-secondary-600 hover:bg-secondary-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <Sparkles className="h-5 w-5" />
          <span>{loading ? 'Generating...' : 'Generate Image'}</span>
        </button>

        {error && <ErrorMessage message={error} onClose={() => setError('')} />}

        {loading && (
          <LoadingSpinner message="Generating image... This may take 1-2 minutes on first request." />
        )}

        {generatedImage && !loading && (
          <div className="space-y-4 animate-fadeIn">
            <div className="relative">
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <button
              onClick={handleDownload}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Download Image</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
