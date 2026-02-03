import React, { useState } from 'react';
import { FileText, Sparkles, Copy, Check } from 'lucide-react';
import { educationAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const TextSummarizer = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const exampleTexts = [
    "We present a novel approach to neural network optimization using adaptive learning rates. Our method dynamically adjusts the learning rate based on gradient statistics during training. Experiments on ImageNet show 15% improvement over standard SGD with minimal computational overhead.",
    "Climate change poses significant challenges to global agriculture. Rising temperatures and changing precipitation patterns affect crop yields worldwide. This study examines adaptation strategies including drought-resistant crop varieties and improved irrigation systems.",
  ];

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError('Please enter some text to summarize');
      return;
    }

    setLoading(true);
    setError('');
    setSummary('');

    try {
      const result = await educationAPI.summarize(text);
      
      if (result.status === 'success') {
        setSummary(result.summary);
      } else {
        setError(result.error || 'Failed to generate summary');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to connect to server. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = (exampleText) => {
    setText(exampleText);
    setSummary('');
    setError('');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-100 p-3 rounded-lg">
            <FileText className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Text Summarizer</h2>
            <p className="text-gray-600">Powered by fine-tuned T5 (+46% improvement)</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Try examples:</span>
          {exampleTexts.map((example, idx) => (
            <button
              key={idx}
              onClick={() => loadExample(example)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
            >
              Example {idx + 1}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text to Summarize
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your academic paper, article, or long text here..."
            rows={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            {text.split(/\s+/).filter(Boolean).length} words
          </p>
        </div>

        <button
          onClick={handleSummarize}
          disabled={loading || !text.trim()}
          className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <Sparkles className="h-5 w-5" />
          <span>{loading ? 'Summarizing...' : 'Generate Summary'}</span>
        </button>

        {error && <ErrorMessage message={error} onClose={() => setError('')} />}

        {loading && <LoadingSpinner message="Generating summary..." />}

        {summary && !loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Generated Summary</h3>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span className="text-sm">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5" />
                    <span className="text-sm">Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-gray-800 leading-relaxed">{summary}</p>
            <p className="text-xs text-gray-500">
              {summary.split(/\s+/).filter(Boolean).length} words
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextSummarizer;
