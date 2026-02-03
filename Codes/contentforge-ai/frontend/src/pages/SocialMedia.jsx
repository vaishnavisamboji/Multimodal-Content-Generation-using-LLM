import React, { useState } from 'react';
import { Image, Music } from 'lucide-react';
import ImageGenerator from '../components/social/ImageGenerator';
import MusicGenerator from '../components/social/MusicGenerator';

const SocialMedia = () => {
  const [activeTab, setActiveTab] = useState('image');

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Social Media Tools</h1>
          <p className="text-gray-600">Create stunning content for your audience</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 inline-flex space-x-1">
            <button
              onClick={() => setActiveTab('image')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                activeTab === 'image'
                  ? 'bg-secondary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Image className="h-5 w-5" />
              <span className="font-medium">Image Generator</span>
            </button>
            <button
              onClick={() => setActiveTab('music')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                activeTab === 'music'
                  ? 'bg-secondary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Music className="h-5 w-5" />
              <span className="font-medium">Music Generator</span>
            </button>
          </div>
        </div>

        <div className="animate-fadeIn">
          {activeTab === 'image' && <ImageGenerator />}
          {activeTab === 'music' && <MusicGenerator />}
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
