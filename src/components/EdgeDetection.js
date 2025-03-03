import React, { useState } from "react";
import './styles.css';

const EdgeDetection = () => {
  const [file, setFile] = useState(null);
  const [ksize, setKsize] = useState(3);
  const [gaussSize, setGaussSize] = useState(5);
  const [sigmaSize, setSigmaSize] = useState(1);
  const [lowerThreshold, setLowerThreshold] = useState(50);
  const [upperThreshold, setUpperThreshold] = useState(150);

  const [sobelVideo, setSobelVideo] = useState("");
  const [cannyVideo, setCannyVideo] = useState("");

  const handleFileUpload = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      if (response.ok) {
        alert("Obrázok úspešne nahraný!");
      } else {
        alert("Chyba pri nahrávaní obrázka.");
      }
    } catch (error) {
      console.error("Chyba:", error);
    }
  };

  const handleKsizeSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch("http://127.0.0.1:5000/set_ksize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ksize }),
      });
      alert("Kernel size uložené.");
    } catch (error) {
      console.error("Chyba:", error);
    }
  };

  const handleGaussSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/set_gauss_size", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gauss_size: gaussSize, sigma_size: sigmaSize }),
      });

      if (response.ok) {
        alert("Gauss parametre uložené.");
      } else {
        alert("Chyba pri ukladaní Gauss parametrov.");
      }
    } catch (error) {
      console.error("Chyba:", error);
    }
  };

  const handleCannySubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch("http://127.0.0.1:5000/set_canny", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lower_threshold: lowerThreshold, upper_threshold: upperThreshold }),
      });
      alert("Threshold hodnoty uložené.");
    } catch (error) {
      console.error("Chyba:", error);
    }
  };

  const handleSobelRendering = () => {
    setSobelVideo(null);
    fetch("http://127.0.0.1:5000/sobel_rendering", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => console.log("Sobel response:", data))
      .catch((err) => console.error("Sobel error:", err));
  };

  const showSobelVideo = () => {
    setTimeout(() => {
      setSobelVideo("http://127.0.0.1:5000/video/sobel");
    }, 5000);
  };

  const handleCannyRendering = async () => {
    setCannyVideo(null);
    fetch("http://127.0.0.1:5000/render", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => console.log("Canny response:", data))
      .catch((err) => console.error("Canny error:", err));
  };

  const showCannyVideo = () => {
    setTimeout(() => {
      setCannyVideo("http://127.0.0.1:5000/video/canny");
    }, 5000);
  };

  return (
    <div>
      <h2>Parametre Sobeloveho filtra</h2>

      <form onSubmit={handleFileUpload}>
        <label>Choose an image:</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*" required />
        <button type="submit">Upload Image</button>
      </form>

      <form onSubmit={handleKsizeSubmit}>
        <label>Kernel Size:</label>
        <input type="number" value={ksize} onChange={(e) => setKsize(parseInt(e.target.value))} min="1" max="31" step="2" required />
        <button type="submit">Upload Kernel Size</button>
      </form>

      <form onSubmit={handleGaussSubmit}>
        <label>Gauss size:</label>
        <input type="number" value={gaussSize} onChange={(e) => setGaussSize(parseInt(e.target.value))} required />
        <label>Sigma:</label>
        <input type="number" value={sigmaSize} onChange={(e) => setSigmaSize(parseFloat(e.target.value))} required />
        <button type="submit">Upload Gauss size</button>
      </form>

      <button onClick={handleSobelRendering}>Start Sobel Rendering</button>
      <button onClick={showSobelVideo}>Show video</button>

      {sobelVideo && (
        <video width="800" height="600" controls>
          <source src={sobelVideo} type="video/mp4" />
        </video>
      )}

      <h2>Parametre Cannyho detektora</h2>

      <form onSubmit={handleCannySubmit}>
        <label>Lower threshold:</label>
        <input type="number" value={lowerThreshold} onChange={(e) => setLowerThreshold(parseInt(e.target.value))} required />
        <label>Upper threshold:</label>
        <input type="number" value={upperThreshold} onChange={(e) => setUpperThreshold(parseInt(e.target.value))} required />
        <button type="submit">Upload Threshold</button>
      </form>

      <button onClick={handleCannyRendering}>Start Canny Rendering</button>
      <button onClick={showCannyVideo}>Show video</button>

      {cannyVideo && (
        <video width="800" height="600" controls>
          <source src={cannyVideo} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default EdgeDetection;
