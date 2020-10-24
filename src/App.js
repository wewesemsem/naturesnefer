import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Routes from './routes';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Container fluid className="App-body">
        <Routes />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
