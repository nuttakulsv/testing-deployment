import React from 'react';
import Header from './components/Header';
import StatusDashboard from './components/StatusDashboard';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <StatusDashboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;