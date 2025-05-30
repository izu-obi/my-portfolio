import React from 'react';
import { Home } from './components/Home';
import { Projects } from './components/Projects';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Element } from 'react-scroll';
import Background from './components/Background';
import './App.css';

function App() {
  return (
    <>
      <Background />
      <div className="font-sans scroll-smooth">
        <Navbar />
        <div className="relative z-10">
          <Element name="home"><Home /></Element>
          <Element name="projects"><Projects /></Element>
          <Element name="resume"><Resume /></Element>
          <Element name="contact"><Contact /></Element>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
