import React, { useState } from "react";
import { Select, MenuItem, TextField, Button, Typography, Grid, Box, Container, Card,Menu, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useRef } from "react";

const generateMatrix = (rows, cols, defaultValue = 0) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => defaultValue)
  );
};

const ConvolutionCalculator = () => {
  const [inputSize, setInputSize] = useState(5);
  const [kernelSize, setKernelSize] = useState(3);

  const [inputMatrix, setInputMatrix] = useState(generateMatrix(5, 5));
  const [kernelMatrix, setKernelMatrix] = useState(generateMatrix(3, 3));
  const [resultMatrix, setResultMatrix] = useState(null);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5; 
        }
    }, []); 
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
      setAnchorEl(null);
  };
  
  const handleNavigate = (path) => {
      navigate(path);
      handleClose();
  };

  const handleMatrixChange = (matrix, setMatrix, row, col, value) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = parseFloat(value) || 0;
    setMatrix(newMatrix);
  };

  const handleSizeChange = (type, size) => {
    if (type === "input") {
      setInputSize(size);
      setInputMatrix(generateMatrix(size, size));
    } else {
      setKernelSize(size);
      setKernelMatrix(generateMatrix(size, size));
    }
    setResultMatrix(null);
  };

  const convolve = () => {
    const outputSize = inputSize - kernelSize + 1;
    const result = generateMatrix(outputSize, outputSize);

    for (let i = 0; i < outputSize; i++) {
      for (let j = 0; j < outputSize; j++) {
        let sum = 0;
        for (let ki = 0; ki < kernelSize; ki++) {
          for (let kj = 0; kj < kernelSize; kj++) {
            sum += inputMatrix[i + ki][j + kj] * kernelMatrix[ki][kj];
          }
        }
        result[i][j] = sum.toFixed(2);
      }
    }

    setResultMatrix(result);
  };

  const renderMatrixInputs = (matrix, setMatrix) => (
    <Grid container direction="column" spacing={1}>
      {matrix.map((row, i) => (
        <Grid item key={i}>
          <Grid container spacing={1} justifyContent="center">
            {row.map((val, j) => (
              <Grid item key={`${i}-${j}`}>
                <TextField
                  value={val}
                  onChange={(e) =>
                    handleMatrixChange(matrix, setMatrix, i, j, e.target.value)
                  }
                  type="number"
                  size="small"
                  inputProps={{
                    style: {
                      width: "60px",
                      textAlign: "center",
                      color: "white", // 
                      backgroundColor: "#333", // 
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );

  return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textAlign: "center",
                paddingTop: "60px"
            }}
        >
            {/* Video pozadie */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: "fixed",         
                    top: 0,
                    left: 0,
                    minWidth: "100%",          
                    minHeight: "100%",         
                    objectFit: "cover",        
                    zIndex: -1,
                    transform: "translateZ(0)", 
                    backfaceVisibility: "hidden" 
                  }}
            >
                <source src="background3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
             {/* Ikona menu */}
             <Box sx={{ position: "absolute", top: 10, left: 10, display: "flex", alignItems: "center" }}>
                <IconButton onClick={handleClick} sx={{ color: "white" }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ marginLeft: 1, color: "white" }}>Menu</Typography>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                >
                    <MenuItem onClick={() => handleNavigate("/")}>Hlavná stránka</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/neurons")}>Neuróny</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/functions")}>Aktivačné funkcie</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/networks")}>Neurónové siete</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/architecture")}>Architektúra</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/convolution")}>Konvolúcia</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/filters")}>Filtre</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/treshold")}>Prahovanie</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/edges")}>Detekcia hrán</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/final")}>Klasifikácia</MenuItem>
                </Menu>
            </Box>           
    <Container maxWidth="lg" sx={{ pt: 10 }}>
    <Card sx={{ mt: 4, p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
    <div style={{ padding: 20 }}>
        <Typography
            variant="h3"
            gutterBottom
             sx={{
                color: "#00bcd4",
                fontWeight: "bold"
                }}
            >
        Konvolučná kalkulačka</Typography>

        <Typography variant="body1" paragraph>
        Táto interaktívna kalkulačka vám umožní experimentovať s konvolúciou, základnou operáciou v konvolučných neurónových sieťach (CNN). Zadajte veľkosť vstupnej matice a filtra, napíšte vlastné hodnoty a sledujte, ako sa konvolúcia aplikuje na dáta.
        </Typography>

        <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
            Ako to funguje?
        </Typography>

        <Typography variant="body1" paragraph align="left">
            <strong>Veľkosť matice a filtra:</strong> Zvoľte si rozmery vstupnej matice (obrázka) a konvolučného filtra (kernelu).<br/>
            <strong>Zadanie hodnôt:</strong> V textových poliach zadajte hodnoty pre vstupnú maticu a filter.<br/>
            <strong>Výpočet: </strong> Kalkulačka vykoná konvolučnú operáciu a zobrazí výslednú maticu.<br/>
            <strong>Analýza výsledkov: </strong> Sledujte, ako filter ovplyvňuje vstupné dáta a ako extrahuje rôzne vlastnosti.
        </Typography>
      <div style={{ marginBottom: 20 }}>
  <Typography variant="subtitle1">Veľkosť vstupnej matice:</Typography>
  <Select
    value={inputSize}
    onChange={(e) => handleSizeChange("input", e.target.value)}
    sx={{
      minWidth: 100,
      backgroundColor: "#333", // 
      color: "white",           // 
      '& .MuiSelect-icon': {
        color: 'white',         // 
      }
    }}
  >
    {[3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
      <MenuItem key={val} value={val} sx={{ color: "black" }}>
        {`${val} x ${val}`}
      </MenuItem>
    ))}
  </Select>
</div>

<div style={{ marginBottom: 20 }}>
  <Typography variant="subtitle1">Veľkosť filtra (len nepárne čísla):</Typography>
  <Select
    value={kernelSize}
    onChange={(e) => handleSizeChange("kernel", e.target.value)}
    sx={{
      minWidth: 100,
      backgroundColor: "#333", // 
      color: "white",           // 
      '& .MuiSelect-icon': {
        color: 'white',         //
      }
    }}
  >
    {[3, 5, 7].filter((k) => k <= inputSize).map((val) => (
      <MenuItem key={val} value={val} sx={{ color: "black" }}>
        {`${val} x ${val}`}
      </MenuItem>
    ))}
  </Select>
</div>

      <div style={{ marginBottom: 30 }}>
        <Typography variant="subtitle1">Vstupná matica:</Typography>
        {renderMatrixInputs(inputMatrix, setInputMatrix)}
      </div>

      <div style={{ marginBottom: 30 }}>
        <Typography variant="subtitle1">Filter (kernel):</Typography>
        {renderMatrixInputs(kernelMatrix, setKernelMatrix)}
      </div>

      <Button variant="contained" onClick={convolve}>Vypočítať konvolúciu</Button>

      {resultMatrix && (
  <div style={{ marginTop: 30 }}>
    <Typography variant="subtitle1">Výsledok konvolúcie:</Typography>
    <Grid container spacing={1}>
      {resultMatrix.map((row, i) => (
        <Grid item xs={12} key={i}>
          <Grid container spacing={1}>
            {row.map((val, j) => {
              const columns = row.length; // 
              const width = 12 / columns;  // 
              return (
                <Grid item key={`${i}-${j}`} xs={width}>
                  <TextField
                    value={val}
                    InputProps={{
                        readOnly: true,
                        style: { color: "white" } // 
                      }}
                    size="small"
                    inputProps={{ style: { width: "60px", textAlign: "center" } }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ))}
    </Grid>
  </div>
)}

    </div>
    </Card>
    </Container>
    </Box>
  );
};

export default ConvolutionCalculator;
