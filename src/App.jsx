import React from 'react';
import Header from './components/Header';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <CreateProduct />
      <Footer />
    </div>
  );
}

export default App;