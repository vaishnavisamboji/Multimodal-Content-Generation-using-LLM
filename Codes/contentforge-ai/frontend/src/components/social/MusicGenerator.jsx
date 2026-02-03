import React, { useState } from 'react';
import { Music, Sparkles, Download } from 'lucide-react';
import { socialAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const MusicGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(10);
  const [generatedAudio, setGeneratedAudio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const examplePrompts = [
    "Upbeat electronic dance music with energetic drums",
    "Calm piano melody for relaxation and meditation",
    "Epic orchestral music with powerful strings",
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedAudio('');

    try {
      const result = await socialAPI.generateMusic(prompt, duration);
      
      if (result.status === 'success') {
        setGeneratedAudio(result.audio_base64);
      } else {
        setError(result.error || 'Failed to generate music');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to connect to server. Music generation may take 1-2 minutes.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedAudio;
    link.download = `contentforge-music-${Date.now()}.wav`;
    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="bg-secondary-100 p-3 rounded-lg">
            <Music className="h-6 w-6 text-secondary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Music Generator</h2>
            <p className="text-gray-600">Powered by Fine-tuned MusicGen</p>
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
            Music Description
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the music you want to generate (mood, genre, instruments)..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration: {duration} seconds
          </label>
          <input
            type="range"
            min="5"
            max="30"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full bg-secondary-600 hover:bg-secondary-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <Sparkles className="h-5 w-5" />
          <span>{loading ? 'Generating...' : 'Generate Music'}</span>
        </button>

        {error && <ErrorMessage message={error} onClose={() => setError('')} />}

        {loading && (
          <LoadingSpinner message="Generating music... This may take 1-2 minutes." />
        )}

        {generatedAudio && !loading && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Music</h3>
              <audio controls className="w-full">
                <source src={generatedAudio} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <button
              onClick={handleDownload}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Download Music</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicGenerator;
