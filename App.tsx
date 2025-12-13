import React, { useState, useEffect } from 'react';
import { Tab, AppSettings } from './types';
import { DEFAULT_SETTINGS } from './constants';
import SettingsModal from './components/SettingsModal';
import OrderForm from './components/OrderForm';
import Dashboard from './components/Dashboard';
import { Settings, PlusCircle, List, ShieldAlert } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('grt_courier_settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      if (parsed.githubToken && parsed.repoOwner && parsed.repoName) {
        setIsConfigured(true);
      } else {
        setIsConfigured(false);
        setIsSettingsOpen(true);
      }
    } else {
      setIsSettingsOpen(true);
    }
  }, []);

  const handleSaveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem('grt_courier_settings', JSON.stringify(newSettings));
    if (newSettings.githubToken && newSettings.repoOwner && newSettings.repoName) {
      setIsConfigured(true);
    }
  };

  const renderContent = () => {
    if (!isConfigured) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center p-8 bg-white rounded-lg shadow border border-red-100">
          <ShieldAlert className="w-16 h-16 text-amber-700 mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Configuration Required</h2>
          <p className="text-gray-600 mb-4">Please configure your GitHub Repository settings to start managing orders.</p>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="px-4 py-2 bg-amber-900 text-white rounded hover:bg-amber-800 transition"
          >
            Open Settings
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case Tab.NEW_ORDER:
        return <OrderForm settings={settings} onOrderAdded={() => setActiveTab(Tab.DASHBOARD)} />;
      case Tab.DASHBOARD:
        return <Dashboard settings={settings} />;
      default:
        return <Dashboard settings={settings} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                 <span className="text-2xl font-serif font-bold text-amber-900 tracking-wider">GRT</span>
                 <span className="ml-2 text-sm text-gray-500 uppercase tracking-widest hidden sm:block">Jewellers | Courier Ops</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-600 transition"
                title="Settings"
              >
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        {isConfigured && (
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab(Tab.DASHBOARD)}
              className={`flex items-center px-4 py-2 rounded-md font-medium transition ${
                activeTab === Tab.DASHBOARD
                  ? 'bg-amber-100 text-amber-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5 mr-2" />
              Orders Dashboard
            </button>
            <button
              onClick={() => setActiveTab(Tab.NEW_ORDER)}
              className={`flex items-center px-4 py-2 rounded-md font-medium transition ${
                activeTab === Tab.NEW_ORDER
                  ? 'bg-amber-100 text-amber-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              New Order
            </button>
          </div>
        )}

        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} GRT Jewellers. Internal Use Only.</p>
          <p className="mt-1 text-xs">Securely connected to GitHub.</p>
        </div>
      </footer>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        currentSettings={settings}
        onSave={handleSaveSettings}
      />
    </div>
  );
};

export default App;
