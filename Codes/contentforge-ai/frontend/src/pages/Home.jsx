import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Image, Sparkles, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      domain: 'Education',
      icon: BookOpen,
      color: 'primary',
      features: [
        { name: 'Text Summarizer', desc: 'Fine-tuned T5 (+46% improvement)', status: 'live' },
        { name: 'Q&A Assistant', desc: 'Multimodal question answering', status: 'live' },
      ],
      link: '/education'
    },
    {
      domain: 'Social Media',
      icon: Image,
      color: 'secondary',
      features: [
        { name: 'Image Generator', desc: 'Stable Diffusion XL', status: 'live' },
        { name: 'Music Generator', desc: 'Text-to-music generation', status: 'soon' },
      ],
      link: '/social'
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fadeIn">
            <div className="flex justify-center">
              <Sparkles className="h-16 w-16 text-primary-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900">
              Welcome to <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                ContentForge AI
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multi-modal AI platform for education and social media content generation.
              Powered by state-of-the-art fine-tuned models.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link
                to="/education"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <span>Explore Education</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/social"
                className="bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <span>Explore Social</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.domain}
                className="bg-white rounded-xl shadow-lg p-8 space-y-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <div className={`bg-${domain.color}-100 p-3 rounded-lg`}>
                    <Icon className={`h-8 w-8 text-${domain.color}-600`} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{domain.domain}</h2>
                </div>

                <div className="space-y-4">
                  {domain.features.map((feature) => (
                    <div key={feature.name} className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.name}</h3>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          feature.status === 'live'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {feature.status === 'live' ? '● Live' : '⏱ Soon'}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to={domain.link}
                  className={`block w-full bg-${domain.color}-600 hover:bg-${domain.color}-700 text-white text-center py-3 rounded-lg font-medium transition-colors`}
                >
                  Try {domain.domain} Tools
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600">+46%</div>
              <div className="text-gray-600 mt-2">T5 ROUGE-2 Improvement</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-600">4</div>
              <div className="text-gray-600 mt-2">AI Features</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">2</div>
              <div className="text-gray-600 mt-2">Domains</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-600">100%</div>
              <div className="text-gray-600 mt-2">Free to Use</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
