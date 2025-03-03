import React, { useState } from "react";
import { 
  Button, TextField, Typography, Container, Paper, Grid, Box, Menu, MenuItem, IconButto 
} from "@mui/material";

const EdgeDetection = () => {
  const [file, setFile] = useState(null);
  const [ksize, setKsize] = useState(3);
  const [gaussSize, setGaussSize] = useState(5);
  const [sigmaSize, setSigmaSize] = useState(1);
  const [lowerThreshold, setLowerThreshold] = useState(50);
  const [upperThreshold, setUpperThreshold] = useState(150);
  const [sobelVideo, setSobelVideo] = useState("");
  const [cannyVideo, setCannyVideo] = useState("");
  const [networkVideo, setNetworkVideo] = useState("");
  const [networkLayers, setNetworkLayers] = useState(1);
  const [networkNeurons, setNetworkNeurons] = useState(2);
  
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

  const handleNetworkSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch("http://127.0.0.1:5000/set_neural_network", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ layers: networkLayers, neurons: networkNeurons }),
      });
      alert("Threshold hodnoty uložené.");
    } catch (error) {
      console.error("Chyba:", error);
    }
  };

  const handleNetworkRendering = async () => {
    setNetworkVideo(null);
    fetch("http://127.0.0.1:5000/network_rendering", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => console.log("Network response:", data))
      .catch((err) => console.error("Network error:", err));
  };

  const showNetworkVideo = () => {
    setTimeout(() => {
      setCannyVideo("http://127.0.0.1:5000/video/neural_network");
    }, 5000);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Parametre Sobeloveho filtra</Typography>
  
        <Box component="form" onSubmit={handleFileUpload} sx={{ mb: 3 }}>
          <Typography variant="subtitle1">Vyberte obrázok:</Typography>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
            required
            style={{ marginBottom: "10px" }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>Upload Image</Button>
        </Box>
  
        <Grid container spacing={2}>
          {/* Gauss Parameters */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Gauss Size"
              type="number"
              value={gaussSize}
              onChange={(e) => setGaussSize(parseInt(e.target.value))}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Sigma"
              type="number"
              value={sigmaSize}
              onChange={(e) => setSigmaSize(parseFloat(e.target.value))}
            />
          </Grid>
          
          {/* Full-width Upload Gauss Button */}
          <Grid item xs={12}>
            <Button onClick={handleGaussSubmit} variant="contained" color="primary" fullWidth>
              Upload Gauss
            </Button>
          </Grid>
        </Grid>
            {/* Kernel Size Parameter */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
                <TextField
                fullWidth
                label="Kernel Size"
                type="number"
                value={ksize}
                onChange={(e) => setKsize(parseInt(e.target.value))}
                inputProps={{ min: 1, max: 31, step: 2 }}
                />
                <Button onClick={handleKsizeSubmit} variant="contained" color="primary" fullWidth>
                Upload Kernel
                </Button>
            </Grid>
            </Grid>
            

  
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="secondary" onClick={handleSobelRendering} fullWidth sx={{ mt: 2 }} >
            Spustiť Sobel Rendering
          </Button>
        </Box>

        <Button onClick={showSobelVideo} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
          Show sobel video
        </Button>
  
        {sobelVideo && (
          <Box sx={{ mt: 3 }}>
            <video width="100%" controls>
              <source src={sobelVideo} type="video/mp4" />
            </video>
          </Box>
        )}
  
      </Paper>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mt: 4 }}>Parametre Cannyho detektora</Typography>

        <Box component="form" onSubmit={handleFileUpload} sx={{ mb: 3 }}>
          <Typography variant="subtitle1">Vyberte obrázok:</Typography>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
            required
            style={{ marginBottom: "10px" }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>Upload Image</Button>
        </Box>

        <Grid container spacing={2}>
          {/* Gauss Parameters */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Gauss Size"
              type="number"
              value={gaussSize}
              onChange={(e) => setGaussSize(parseInt(e.target.value))}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Sigma"
              type="number"
              value={sigmaSize}
              onChange={(e) => setSigmaSize(parseFloat(e.target.value))}
            />
          </Grid>
          
          {/* Full-width Upload Gauss Button */}
          <Grid item xs={12}>
            <Button onClick={handleGaussSubmit} variant="contained" color="primary" fullWidth>
              Upload Gauss
            </Button>
          </Grid>
        </Grid>
  
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Lower Threshold"
              type="number"
              value={lowerThreshold}
              onChange={(e) => setLowerThreshold(parseInt(e.target.value))}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Upper Threshold"
              type="number"
              value={upperThreshold}
              onChange={(e) => setUpperThreshold(parseInt(e.target.value))}
            />
          </Grid>
        </Grid>
  
        <Button onClick={handleCannySubmit} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Upload Threshold
        </Button>
  
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="secondary" onClick={handleCannyRendering} fullWidth sx={{ mt: 2 }}>
            Spustiť Canny Rendering
          </Button>
        </Box>

        
        <Button onClick={showCannyVideo} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
          Show canny video
        </Button>
  
        {cannyVideo && (
          <Box sx={{ mt: 3 }}>
            <video width="100%" controls>
              <source src={cannyVideo} type="video/mp4" />
            </video>
          </Box>
        )}
      </Paper>

      <Grid container spacing={2} sx={{ mt: 2 }}> 
        <Grid item xs={6}> 
          <TextField
          fullWidth
          label="Neural Network Layers"
              type="number"
              value={networkLayers}
              onChange={(e) => setNetworkLayers(parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={6}> 
          <TextField
            fullWidth
            label="Neural Network Neurons"
                type="number"
                value={networkNeurons}
                onChange={(e) => setNetworkNeurons(parseInt(e.target.value))}
            />
        </Grid>
      </Grid>

      <Button onClick={handleNetworkSubmit} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Upload network parameters
      </Button>

      <Button onClick={showNetworkVideo} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
        Show network video
      </Button>

      {networkVideo && (
          <Box sx={{ mt: 3 }}>
            <video width="100%" controls>
              <source src={networkVideo} type="video/mp4" />
            </video>
          </Box>
        )}


      <Box sx={{mt: 3}}>ä
        <Button variant="contained" color="secondary" onClick={handleNetworkRendering} fullWidth sx={{ mt: 2 }}>
          Spustiť network rendering
        </Button>
      </Box>
      
    </Container>
  );
  
};

export default EdgeDetection;
