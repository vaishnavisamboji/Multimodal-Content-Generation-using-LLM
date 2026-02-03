import React, { useState, useRef } from 'react';
import { MessageCircle, Upload, X, Sparkles } from 'lucide-react';
import { educationAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const QAAssistant = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const examples = [
    "What is machine learning?",
    "Explain neural networks in simple terms",
    "What are the benefits of deep learning?",
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const result = await educationAPI.answerQuestion(question, image);
      
      if (result.status === 'success') {
        setAnswer(result.answer);
      } else {
        setError(result.error || 'Failed to get answer');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to connect to server. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-100 p-3 rounded-lg">
            <MessageCircle className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Q&A Assistant</h2>
            <p className="text-gray-600">Powered by Qwen VLM (multimodal)</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Try examples:</span>
          {examples.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setQuestion(example)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
            >
              {example}
            </button>
          ))}
        </div>

        {imagePreview && (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Uploaded"
              className="max-h-64 rounded-lg border-2 border-gray-200"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Question
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question (with or without an image)..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Upload className="h-5 w-5" />
            <span>Upload Image (Optional)</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          <button
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Sparkles className="h-5 w-5" />
            <span>{loading ? 'Getting Answer...' : 'Ask Question'}</span>
          </button>
        </div>

        {error && <ErrorMessage message={error} onClose={() => setError('')} />}

        {loading && <LoadingSpinner message="Processing your question..." />}

        {answer && !loading && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-gray-900">Answer</h3>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QAAssistant;
