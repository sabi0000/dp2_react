import { Typography, Container, Card, Button, Box, Menu, MenuItem, IconButton, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { RotatingLines } from 'react-loader-spinner'; // Import the loading spinner
import UploadSection from './UploadSection';

const Edges= () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
      const [file, setFile] = useState(null);
      const [ksize, setKsize] = useState(3);
      const [gaussSize, setGaussSize] = useState(5);
      const [sigmaSize, setSigmaSize] = useState(1);
      const [lowerThreshold, setLowerThreshold] = useState(50);
      const [upperThreshold, setUpperThreshold] = useState(150);
      const [sobelVideo, setSobelVideo] = useState("");
      const [cannyVideo, setCannyVideo] = useState("");
      const [isLoading, setIsLoading] = useState(false); // Loading state
      const [openPicker, setOpenPicker] = useState(false);
 
 
      const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log("Selected file:", selectedFile); // Pridajte tento riadok na kontrolu
        setFile(selectedFile);
    };
      const handleDefaultImageSelect = async (imgPath) => {
        const response = await fetch(imgPath);
        const blob = await response.blob();
        const file = new File([blob], "default.jpg", { type: blob.type });
        setFile(file);
        setOpenPicker(false);
      }; 
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

    const handleFileUpload = async (event) => {
        event.preventDefault();
        if (!file) return;
    
        const formData = new FormData();
        formData.append("file", file);
    
        try {
            const backendUrlFileEdges = `http://${window.location.hostname}:5000/upload`;
          const response = await fetch(backendUrlFileEdges, {
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

      const handleGaussSubmit = async (event) => {
        event.preventDefault();
        try {
            const backendUrlGauss = `http://${window.location.hostname}:5000/set_gauss_size`;
          const response = await fetch(backendUrlGauss, {
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
            const backendUrlCanny = `http://${window.location.hostname}:5000/set_canny`;
          await fetch(backendUrlCanny, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lower_threshold: lowerThreshold, upper_threshold: upperThreshold }),
          });
          alert("Threshold hodnoty uložené.");
        } catch (error) {
          console.error("Chyba:", error);
        }
      };
      const handleCannyRendering = async () => {
        setCannyVideo(null);
        setIsLoading(true); 
        const backendUrlCannyRendering = `http://${window.location.hostname}:5000/render`;
        fetch(backendUrlCannyRendering, {
          method: "POST",
          credentials: "include",
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then((data) => {
            console.log("Network response:", data);
            showCannyVideo(); // Call to show the video after rendering
        })
        .catch((err) => console.error("Network error:", err))
        .finally(() => {
            setIsLoading(false); // Set loading to false after rendering
            alert("Video je pripravené.");
        });
        alert("Renderovanie začalo.");
      };
    
    
      const showCannyVideo = () => {
        const backendUrlCannyShow = `http://${window.location.hostname}:5000/video/canny`;
        
          setCannyVideo(backendUrlCannyShow);
         
      };

      const handleKsizeSubmit = async (event) => {
        event.preventDefault();
        try {
            const backendUrlKSize = `http://${window.location.hostname}:5000/set_ksize`;
          await fetch(backendUrlKSize, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ksize }),
          });
          alert("Kernel size uložené.");
        } catch (error) {
          console.error("Chyba:", error);
        }
      };

      const handleSobelRendering = () => {
        setSobelVideo(null);
        setIsLoading(true); 
        const backendUrlSobelRendering = `http://${window.location.hostname}:5000/sobel_rendering`;
        fetch(backendUrlSobelRendering , {
          method: "POST",
          credentials: "include",
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then((data) => {
            console.log("Network response:", data);
            showCannyVideo(); // Call to show the video after rendering
        })
        .catch((err) => console.error("Network error:", err))
        .finally(() => {
            setIsLoading(false); // Set loading to false after rendering
            alert("Video je pripravené.");
        });
        alert("Renderovanie začalo.");
      };

      const showSobelVideo = () => {
            const backendUrlSobelShow = `http://${window.location.hostname}:5000/video/sobel`;
          setSobelVideo(backendUrlSobelShow );
      };

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
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -1
                }}
            >
                <source src="background3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Ikona menu a nadpis vedľa nej */}
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
                    <MenuItem onClick={() => handleNavigate("/treshold")}>Prahovvanie</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/edges")}>Detekcia hrán</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/final")}>Klasifikácia</MenuItem>
                </Menu>
            </Box>

            <Container maxWidth="md" sx={{ pt: 10 }}>
                {/* Úvodná karta o neurónoch */}
                <Card sx={{ mt: 4, p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        color: "#00bcd4",
                        fontWeight: "bold"
                      }}
                    >
                    Detekcia hrán: Skryté obrysy digitálnych snímok 
                </Typography>
                    <Typography variant="body1" paragraph>
                    Detekcia hrán je základná technika v oblasti spracovania digitálnych obrazov, ktorej cieľom je identifikovať a zvýrazniť hranice medzi objektmi v obraze. Tieto hranice, definované ako miesta s výraznou zmenou intenzity pixelov, nesú kľúčové informácie o tvare a štruktúre objektov.
                    </Typography>

                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                    Prečo je detekcia hrán dôležitá?
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                        <strong>Rozpoznávanie objektov:</strong> Hrany poskytujú základné kontúry, ktoré pomáhajú pri identifikácii objektov. <br />
                        <strong>Analýza obrazu: </strong> Zvýraznenie hrán zjednodušuje analýzu obrazových dát a umožňuje extrakciu relevantných informácií.<br />
                        <strong>Kompresia obrazu:  </strong> Hrany možno použiť na efektívnu kompresiu obrazu, pretože obsahujú podstatné informácie.<br />
                    </Typography>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                    Cannyho detektor hrán:
                    </Typography>

                    <Typography variant="body1" paragraph>
                    Cannyho detektor hrán je viacstupňový algoritmus, ktorý sa považuje za jeden z najúčinnejších a najspoľahlivejších. Jeho kroky zahŕňajú:
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                        <strong>Redukcia šumu: </strong> Použitie Gaussovho filtra na vyhladenie obrazu a odstránenie šumu. <br />
                        <strong>Výpočet gradientu: </strong> Určenie intenzity a smeru gradientu pomocou Sobelovho operátora.<br />
                        <strong>Nelineárna supresia nemaxím:</strong> Zoslabenie hrán, ktoré nie sú lokálnymi maximami gradientu.<br />
                        <strong>Hysterezné prahovanie: </strong> Použitie dvoch prahových hodnôt na identifikáciu silných a slabých hrán a ich prepojenie.<br />
                    </Typography>
                    <video width="100%" autoPlay loop muted>
                        <source src={`http://${window.location.hostname}:5000/video/canny_example`} type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                    Interaktívna detekcia hrán s Cannyho filtrom
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                        <strong>Nahrajte svoj obrázok: </strong> Vyberte obrázok, na ktorom chcete aplikovať Cannyho detektor hrán <br />
                        <strong>Nastavte parametre: </strong> <br />
                        <ul>
                            <li><strong>Thresholdy (spodný a horný):</strong> Určujú citlivosť detekcie hrán. Nižšie hodnoty detekujú viac hrán, ale aj šum. Vyššie hodnoty detekujú len silné hrany.</li>
                            <li><strong>Sigma:</strong> Ovplyvňuje rozsah Gaussovho filtra, ktorý sa používa na vyhladenie obrazu a redukciu šumu.</li>
                            <li><strong>Gauss Size:</strong> Určuje veľkosť Gaussovho filtra.</li>
                        </ul>
                        <strong>Spustite rendering:  </strong> Aplikácia spracuje váš obrázok pomocou Cannyho detektora hrán s vašimi nastaveniami.<br />
                        <strong>Sledujte video: </strong> Pozrite si video, ktoré ukazuje postupnú aplikáciu filtra a odhaľovanie hrán.<br />
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                        Parametre Cannyho detektora
                    </Typography>

                    <Box component="form" onSubmit={handleFileUpload} sx={{ mb: 3 }}>
                    <UploadSection
                    handleFileChange={handleFileChange}
                    openPicker={openPicker}
                    setOpenPicker={setOpenPicker}
                    handleDefaultImageSelect={handleDefaultImageSelect}
                    />
                    <Button variant="contained" color="secondary" onClick={handleFileUpload} fullWidth sx={{ mt: 2 }} >Nahrať obrázok </Button>
                    </Box>

                    <Grid container spacing={2}>
                    {/* Gauss Parameters */}
                    <Grid item xs={6} sx={{ mt: 2 }}>
                        <TextField
                        fullWidth
                        label="Gauss Size"
                        type="number"
                        value={gaussSize}
                        onChange={(e) => setGaussSize(parseInt(e.target.value))}
                        inputProps={{
                            min: 1,
                            max: 10,
                            style: {
                              color: "white",
                              backgroundColor: "#222", // Tmavé pozadie iba pre samotný input
                              borderRadius: "4px",
                            },
                          }}
                        placeholder="Zadajte počet neurónov od 2 po 8"  
                        sx={{
                            input: { color: "white" },
                            bgcolor: "#111",
                            borderRadius: 1,
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#555" },
                            }
                        }}
                        InputLabelProps={{
                            sx: { 
                                color: "white",
                                fontSize: "1.2rem",
                                transform: "translate(14px, -25px) scale(1)",
                            }
                        }}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ mt: 2 }}>
                        <TextField
                        fullWidth
                        label="Sigma"
                        type="number"
                        value={sigmaSize}
                        onChange={(e) => setSigmaSize(parseFloat(e.target.value))}
                        inputProps={{
                            min: 1,
                            max: 10,
                            style: {
                              color: "white",
                              backgroundColor: "#222", // Tmavé pozadie iba pre samotný input
                              borderRadius: "4px",
                            },
                          }}
                        placeholder="Zadajte počet neurónov od 2 po 8"  
                        sx={{
                            input: { color: "white" },
                            bgcolor: "#111",
                            borderRadius: 1,
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#555" },
                            }
                        }}
                        InputLabelProps={{
                            sx: { 
                                color: "white",
                                fontSize: "1.2rem",
                                transform: "translate(14px, -25px) scale(1)",
                            }
                        }}
                        />
                    </Grid>
                    
                    {/* Full-width Upload Gauss Button */}
                    <Grid item xs={12}>
                        <Button onClick={handleGaussSubmit} variant="contained" color="primary" fullWidth>
                        Upload Gauss
                        </Button>
                    </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={6}>
                        <TextField
                        fullWidth
                        label="Lower Threshold"
                        type="number"
                        value={lowerThreshold}
                        onChange={(e) => setLowerThreshold(parseInt(e.target.value))}
                        inputProps={{
                            min: 1,
                            max: 10,
                            style: {
                              color: "white",
                              backgroundColor: "#222", // Tmavé pozadie iba pre samotný input
                              borderRadius: "4px",
                            },
                          }}
                        placeholder="Zadajte počet neurónov od 2 po 8"  
                        sx={{
                            input: { color: "white" },
                            bgcolor: "#111",
                            borderRadius: 1,
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#555" },
                            }
                        }}
                        InputLabelProps={{
                            sx: { 
                                color: "white",
                                fontSize: "1.2rem",
                                transform: "translate(14px, -25px) scale(1)",
                            }
                        }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        fullWidth
                        label="Upper Threshold"
                        type="number"
                        value={upperThreshold}
                        onChange={(e) => setUpperThreshold(parseInt(e.target.value))}
                        inputProps={{
                            min: 1,
                            max: 10,
                            style: {
                              color: "white",
                              backgroundColor: "#222", // Tmavé pozadie iba pre samotný input
                              borderRadius: "4px",
                            },
                          }}
                        placeholder="Zadajte počet neurónov od 2 po 8"  
                        sx={{
                            input: { color: "white" },
                            bgcolor: "#111",
                            borderRadius: 1,
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#555" },
                            }
                        }}
                        InputLabelProps={{
                            sx: { 
                                color: "white",
                                fontSize: "1.2rem",
                                transform: "translate(14px, -25px) scale(1)",
                            }
                        }}
                        />
                    </Grid>
                    </Grid>

                    <Button onClick={handleCannySubmit} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Upload Threshold
                    </Button>

                    <Box sx={{ mt: 3 }}>
                    <Button variant="contained" color="secondary" onClick={handleCannyRendering} fullWidth >    
                        Spustiť Canny Rendering
                    </Button>
                    </Box>
                    <Button onClick={showCannyVideo} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                    Show canny video
                    </Button>
                    {isLoading && ( // Show loading spinner while rendering
                        <Box sx={{ mt: 3 }}>
                            <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="50"
                                visible={true}
                            />
                        </Box>
                    )}


                    
                    {cannyVideo && (
                    <Box sx={{ mt: 3 }}>
                        <video width="100%" controls>
                        <source src={cannyVideo} type="video/mp4" />
                        </video>
                    </Box>
                    )}

                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                    Sobelov operátor
                    </Typography>

                    <Typography variant="body1" paragraph>
                    Sobelov operátor je jednoduchší algoritmus, ktorý používa konvolučné masky na výpočet gradientu v horizontálnom a vertikálnom smere. Výsledný gradient sa používa na identifikáciu hrán.
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                        Cannyho detektor je zložitejší a poskytuje presnejšie výsledky s lepšou lokalizáciou hrán<br/>
                        Sobelov operátor je výpočtovo menej náročný a vhodný pre aplikácie, kde je dôležitá rýchlosť.<br/>
                    </Typography>
                    <video width="100%" autoPlay loop muted>
                    <source src={`http://${window.location.hostname}:5000/video/sobel_example`} type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>
                </Card>


                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                    Interaktívna detekcia hrán so Sobelovým operátorom
                    </Typography>
                    <Typography variant="body1" paragraph align="left">
                        <strong>Nahrajte svoj obrázok: </strong> Vyberte obrázok, na ktorom chcete aplikovať Sobelov operátor.<br />
                        <strong>Nastavte parametre: </strong> <br />
                        <ul>
                            <li><strong>K-size (spodný a horný):</strong> Určite veľkosť konvolučného jadra. Väčšie hodnoty K-size vyhladzujú obraz a redukujú šum, ale môžu rozmazať jemné detaily. Menšie hodnoty zachovávajú viac detailov, ale sú citlivejšie na šum.</li>
                            <li><strong>Sigma:</strong> Ovplyvňuje rozsah Gaussovho filtra, ktorý sa používa na vyhladenie obrazu a redukciu šumu.</li>
                            <li><strong>Gauss Size:</strong> Určuje veľkosť Gaussovho filtra.</li>
                        </ul>
                        <strong>Spustite rendering:  </strong> Aplikácia spracuje váš obrázok a vytvorí video, ktoré zobrazuje aplikáciu Sobelovho operátora s vašimi nastaveniami.<br />
                        <strong>Sledujte video: </strong> Pozrite si video, ktoré ukazuje postupnú aplikáciu filtra a odhaľovanie hrán.<br />
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                        Parametre Sobelovho operátora
                    </Typography>

                    <Box component="form" onSubmit={handleFileUpload} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1">Vyberte obrázok:</Typography>
                    <UploadSection
                    handleFileChange={handleFileChange}
                    openPicker={openPicker}
                    setOpenPicker={setOpenPicker}
                    handleDefaultImageSelect={handleDefaultImageSelect}
                    />
                    <Button variant="contained" color="secondary" onClick={handleFileUpload} fullWidth sx={{ mt: 2 }} >Nahrať obrázok </Button>
                    </Box>

                    <Grid container spacing={2}>
                    {/* Gauss Parameters */}
                    <Grid item xs={6} sx={{ mt: 2 }}>
                        <TextField
                        fullWidth
                        label="Gauss Size"
                        type="number"
                        value={gaussSize}
                        onChange={(e) => setGaussSize(parseInt(e.target.value))}
                        inputProps={{
                            min: 1,
                            max: 10,
                            style: {
                              color: "white",
                              backgroundColor: "#222", // Tmavé pozadie iba pre samotný input
                              borderRadius: "4px",
                            },
                          }}
                        placeholder="Zadajte počet neurónov od 2 po 8"  
                        sx={{
                            input: { color: "white" },
                            bgcolor: "#111",
                            borderRadius: 1,
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#555" },
                            }
                        }}
                        InputLabelProps={{
                            sx: { 
                                color: "white",
                                fontSize: "1.2rem",
                                transform: "translate(14px, -25px) scale(1)",
                            }
                        }}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ mt: 2 }}>
                        <TextField
                        fullWidth
                        label="Sigma"
                        type="number"
                        value={sigmaSize}
                        onChange={(e) => setSigmaSize(parseFloat(e.target.value))}
                        inputProps={{
                            min: 1,
                            max: 10,
                            style: {
                              color: "white",
                              backgroundColor: "#222", // Tmavé pozadie iba pre samotný input
                              borderRadius: "4px",
                            },
                          }}
                        placeholder="Zadajte počet neurónov od 2 po 8"  
                        sx={{
                            input: { color: "white" },
                            bgcolor: "#111",
                            borderRadius: 1,
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#555" },
                            }
                        }}
                        InputLabelProps={{
                            sx: { 
                                color: "white",
                                fontSize: "1.2rem",
                                transform: "translate(14px, -25px) scale(1)",
                            }
                        }}
                        />
                    </Grid>
                    
                    {/* Full-width Upload Gauss Button */}
                    <Grid item xs={12}>
                        <Button onClick={handleGaussSubmit} variant="contained" color="primary" fullWidth>
                        Upload Gauss
                        </Button>
                    </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={6}>
                        <TextField
                        fullWidth
                        label="K-size"
                        type="number"
                        value={ksize}
                        onChange={(e) => setKsize(parseInt(e.target.value))}
                        inputProps={{
                            min: 1,
                            max: 10,
                            style: {
                              color: "white",
                              backgroundColor: "#222", // Tmavé pozadie iba pre samotný input
                              borderRadius: "4px",
                            },
                          }}
                        placeholder="Zadajte počet neurónov od 2 po 8"  
                        sx={{
                            input: { color: "white" },
                            bgcolor: "#111",
                            borderRadius: 1,
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#555" },
                            }
                        }}
                        InputLabelProps={{
                            sx: { 
                                color: "white",
                                fontSize: "1.2rem",
                                transform: "translate(14px, -25px) scale(1)",
                            }
                        }}
                        />
                    </Grid>
                    </Grid>

                    <Button onClick={handleKsizeSubmit} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Upload K-size
                    </Button>

                    <Box sx={{ mt: 3 }}>
                    <Button variant="contained" color="secondary" onClick={handleSobelRendering} fullWidth >    
                        Spustiť Sobel Rendering
                    </Button>
                    </Box>
                    <Button onClick={showSobelVideo} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                    Show Sobel video
                    </Button>
                    {isLoading && ( // Show loading spinner while rendering
                        <Box sx={{ mt: 3 }}>
                            <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="50"
                                visible={true}
                            />
                        </Box>
                    )}

                    {sobelVideo && (
                    <Box sx={{ mt: 3 }}>
                        <video width="100%" controls>
                        <source src={sobelVideo} type="video/mp4" />
                        </video>
                    </Box>
                    )}
                </Card>

                {/* Tlačidlo pre návrat na hlavnú stránku */}
                <Button
                    onClick={() => navigate("/")}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Späť na hlavnú stránku
                </Button>
            </Container>
        </Box>
    );
};

export default Edges;
