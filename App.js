import React, { useState } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);

  const fetchImages = () => {
    fetch(`https://api.unsplash.com/search/photos?client_id=pUy11U_LR-dkSDoCJh3wqj53Ew1LDjbvZAamKrC09XM&query=${value}&orientation=squarish`)
      .then(res => res.json())
      .then(data => {
        setResult(data.results);
      })
      .catch(error => {
        console.error("Error fetching images:", error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchImages();
    }
  };

  const openImageWindow = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="App">
      <div className="search-container">
        <h1 className="title">search </h1>
        <div className="search-box">
          <input
            className="search-input"
            type="text"
            placeholder="Search for images..."
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-button" onClick={fetchImages}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div className='gallery'>
        {result.map(item => (
          <div key={item.id} className="image-container">
            <img
              className='item'
              src={item.urls.regular}
              alt={item.alt_description}
              onClick={() => openImageWindow(item.urls.regular)}
            />
            <div className="download-overlay">
              <button className="download-button" onClick={() => openImageWindow(item.links.download)}>
                <i className="fas fa-download"></i> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
