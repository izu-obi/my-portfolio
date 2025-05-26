import React from 'react';
import { Home } from './components/Home';
import { Projects } from './components/Projects';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Element } from 'react-scroll';

function App() {
  return (
    <div className="font-sans scroll-smooth">
      <Navbar />
      <Element name="home"><Home /></Element>
      <Element name="projects"><Projects /></Element>
      <Element name="resume"><Resume /></Element>
      <Element name="contact"><Contact /></Element>
      <Footer />
    </div>
  );
}

export default App;
