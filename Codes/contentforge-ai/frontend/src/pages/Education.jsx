import React, { useState } from 'react';
import { FileText, MessageCircle } from 'lucide-react';
import TextSummarizer from '../components/education/TextSummarizer';
import QAAssistant from '../components/education/QAAssistant';

const Education = () => {
  const [activeTab, setActiveTab] = useState('summarizer');

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Education Tools</h1>
          <p className="text-gray-600">AI-powered tools for learning and research</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 inline-flex space-x-1">
            <button
              onClick={() => setActiveTab('summarizer')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                activeTab === 'summarizer'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText className="h-5 w-5" />
              <span className="font-medium">Summarizer</span>
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                activeTab === 'qa'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">Q&A Assistant</span>
            </button>
          </div>
        </div>

        <div className="animate-fadeIn">
          {activeTab === 'summarizer' && <TextSummarizer />}
          {activeTab === 'qa' && <QAAssistant />}
        </div>
      </div>
    </div>
  );
};

export default Education;
