import { Typography, Container, Card, Button, Box, Menu, MenuItem, IconButton, Grid, TextField, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { RotatingLines } from 'react-loader-spinner'; // Import the loading spinner
import UploadSection from './UploadSection';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";

const Treshold= () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [file, setFile] = useState(null);

    const [threshold, setThreshold] = useState();
    const [tresholdVideo, setTresholdVideo] = useState("");

    const [adaptive_treshold, setAdaptiveThreshold] = useState();
    const [constant, setConstant] = useState();
    const [adaptive_tresholdVideo, setAdaptiveTresholdVideo] = useState("");

    const [isLoading, setIsLoading] = useState(false); // Loading state
 
    const [error, setError] = useState(false);
    const [errorNeurons, setErrorNeurons] = useState(false);

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

      const handleTresholdSubmit = async (event) => {
        event.preventDefault();
        try {
            const backendUrlTreshold = `http://${window.location.hostname}:5000/set_simple_treshold`;
          const response = await fetch(backendUrlTreshold, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ threshold: threshold }),
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
    
      const handleAdaptiveSumbmit = async (event) => {
        event.preventDefault();
        try {
            const backendUrlAdapt = `http://${window.location.hostname}:5000/set_adaptive_treshold`;
            await fetch(backendUrlAdapt, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adaptive_treshold: adaptive_treshold, constant: constant }),
            });
            alert("Hodnoty uložené.");
        } catch (error) {
            console.error("Chyba:", error);
        }
    };
         
      const handleTresholdRendering = async () => {
        setTresholdVideo(null);
        setIsLoading(true); 
        const backendUrlTresholdRendering = `http://${window.location.hostname}:5000/simple_render`;
        fetch(backendUrlTresholdRendering, {
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
            showTresholdVideo(); // Call to show the video after rendering
        })
        .catch((err) => console.error("Network error:", err))
        .finally(() => {
            setIsLoading(false); // Set loading to false after rendering
            alert("Video je pripravené.");
        });
        alert("Renderovanie začalo.");
      };
    
      const handleAdaptiveRendering = async () => {
        setTresholdVideo(null);
        setIsLoading(true); 
        const backendUrlAdaptRendering = `http://${window.location.hostname}:5000/adaptive_render`;
        fetch(backendUrlAdaptRendering, {
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
            showAdaptiveVideo(); // Call to show the video after rendering
        })
        .catch((err) => console.error("Network error:", err))
        .finally(() => {
            setIsLoading(false); // Set loading to false after rendering
            alert("Video je pripravené.");
        });
        alert("Renderovanie začalo.");
      };   

      const showAdaptiveVideo = () => {
        const backendUrlAdaptShow = `http://${window.location.hostname}:5000/video/adaptive_treshold`;
        
          setAdaptiveTresholdVideo(backendUrlAdaptShow );
         
      };

      const showTresholdVideo = () => {
        const backendUrlTresholdShow = `http://${window.location.hostname}:5000/video/simple_treshold`;
        
          setTresholdVideo(backendUrlTresholdShow );
         
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
                <source src="background.mp4" type="video/mp4" />
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
                    <MenuItem onClick={() => handleNavigate("/treshold")}>Prahovanie</MenuItem>
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
                    Prahovanie: Zjednodušenie snímok
                </Typography>
                    <Typography variant="body1" paragraph>
                    V tejto sekcii preskúmame techniku prahovania, ktorá slúži na zjednodušenie obrazov premenou na binárnu formu – čiernu a bielu. Objavte, ako rôzne metódy prahovania môžu odhaliť skryté štruktúry a zvýrazniť dôležité informácie vo vašich obrázkoch.
                    </Typography>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                    Jednoduché prahovanie: Globálny pohľad
                    </Typography>

                    <Typography variant="body1" paragraph>
                    Pri jednoduchom prahovaní zvolíte jednu globálnu prahovú hodnotu. Všetky pixely s intenzitou vyššou ako táto hodnota sa zmenia na bielu (popredie) a všetky pixely s intenzitou nižšou alebo rovnou sa zmenia na čiernu (pozadie).
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                        <strong>Prahová hodnota: </strong> Pixely s intenzitou vyššou ako táto hodnota sa zmenia na bielu a pixely s intenzitou nižšou alebo rovnou sa zmenia na čiernu  <br />
                        <strong>Aplikácia prahu: </strong> Každý pixel v obraze sa porovná s touto prahovou hodnotou. <br />
                        <strong>Výsledný binárny obraz:</strong>  Zobrazí sa výsledný čierno-biely obraz.<br />
                    </Typography>
                    <video width="100%" autoPlay loop muted>
                        <source src={`http://${window.location.hostname}:5000/video/simple_treshold_exaple`} type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                    Interaktívne prahovanie: Jednoduché prahovanie
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                        <strong>Nahrajte svoj obrázok: </strong> Vyberte obrázok, na ktorom chcete aplikovať jednduché prahovanie <br />
                        <strong>Nastavte prahovú hodnotu: </strong>Pomocou posuvníka vyberte prahovú hodnotu intenzity. Všetky pixely s intenzitou vyššou ako táto hodnota sa zmenia na bielu (popredie) a všetky pixely s intenzitou nižšou alebo rovnou sa zmenia na čiernu (pozadie). <br />
                        <strong>Spustite rendering:  </strong> Aplikácia spracuje váš obrázok pomocou jednoduchého prahovania s vašimi nastaveniami.<br />
                        <strong>Sledujte video: </strong>  Aplikácia zobrazí výsledný čierno-biely obraz na základe vami zvolenej prahovej hodnoty.<br />
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
                        label="Prahová hodnota"
                        type="number"
                        value={threshold}
                        onChange={(e) => setThreshold(parseInt(e.target.value))}
                        inputProps={{
                            min: 1,
                            max: 10,
                            style: {
                              color: "white",
                              backgroundColor: "#222", // Tmavé pozadie iba pre samotný input
                              borderRadius: "4px",
                            },
                          }}
                        placeholder="Zadajte prahovú hodnotu"  
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
                        <Button onClick={handleTresholdSubmit} variant="contained" color="primary" fullWidth>
                        Upload Threshold
                        </Button>
                    </Grid>
                    </Grid>

                

                    <Box sx={{ mt: 3 }}>
                    <Button variant="contained" color="secondary" onClick={handleTresholdRendering} fullWidth >    
                        Spustiť Rendering
                    </Button>
                    </Box>
                    <Button onClick={showTresholdVideo} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                    Show video
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


                    
                    {tresholdVideo && (
                    <Box sx={{ mt: 3 }}>
                        <video width="100%" controls>
                        <source src={tresholdVideo} type="video/mp4" />
                        </video>
                    </Box>
                    )}
                </Card>
            

            <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                Adaptívne prahovanie: Lokálny detail
            </Typography>

            <Typography variant="body1" paragraph>
            Adaptívne prahovanie, na rozdiel od jednoduchého, vypočítava lokálnu prahovú hodnotu pre každý pixel na základe intenzity okolitých pixelov. To znamená, že prahová hodnota sa mení v závislosti od lokálnych vlastností obrazu.
            </Typography>

            <Typography variant="body1" paragraph align="left"> 
                Vhodné pre obrazy s nekonzistentným osvetlením alebo zložitým pozadím. <br />
                Dokáže efektívnejšie segmentovať objekty aj v náročnejších svetelných podmienkach. <br />
                Zvýrazňuje lokálne detaily, ktoré by pri globálnom prahovaní mohli zaniknúť.
            </Typography>
            <video width="100%" autoPlay loop muted>
                <source src={`http://${window.location.hostname}:5000/video/adaptive_treshold_example`} type="video/mp4" />
                Váš prehliadač nepodporuje prehrávanie videa.
            </video>
            

            </Card>
            <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}> 
            Interaktívne prahovanie: Adaptívne prahovanie
            </Typography>

            <Typography variant="body1" paragraph align="left">
                <strong>Nahrajte svoj obrázok: </strong> Vyberte obrázok, na ktorom chcete aplikovať jednduché prahovanie <br />
                <strong>Nastavte parametre: </strong> <br />
                <ul>
                    <li><strong>Veľkosť okolia:</strong> Určite veľkosť lokálneho okolia (okna pixelov), na základe ktorého sa bude pre každý pixel vypočítavať prahová hodnota. Menšie okolie zachytí viac lokálnych detailov, zatiaľ čo väčšie okolie bude menej citlivé na drobné zmeny.</li>
                    <li><strong>Konštanta:</strong> Zadajte konštantu, ktorá sa odčíta od vypočítanej lokálnej prahovej hodnoty. Kladné hodnoty konštanty spôsobia, že sa ako popredie (biela) označí menej pixelov, čím sa zvýši citlivosť na svetlejšie oblasti. Záporné hodnoty naopak označia viac pixelov ako popredie. </li>
                </ul>
                <strong>Spustite rendering:  </strong>  Aplikácia vypočíta lokálnu prahovú hodnotu pre každý pixel na základe jeho okolia a následne od nej odčíta vašu konštantu.<br />
                <strong>Sledujte video: </strong> Zobrazí sa výsledný čierno-biely obraz v ktorom sú zobrazené detaily <br />
            </Typography>

            <Typography variant="h5" gutterBottom paragraph sx={{ mt: 2 }}>
                <Grid item xs={12}> 
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
                    <TextField
                        fullWidth
                        label="Veľkosť okolia"
                        type="number"
                        value={adaptive_treshold}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setAdaptiveThreshold(value);
                            setError(value % 2 === 0);
                            }}
                            error={error}
                            helperText={error ? "Hodnota musí byť nepárna" : " "}
                            
                            inputProps={{
                            min: 1,
                            max: 10,
                            style: {
                                color: "white",
                                backgroundColor: "#222", // Tmavé pozadie iba pre samotný input
                                borderRadius: "4px",
                            },
                            }}
                        placeholder="Zadajte veľkosť okolia (nepárne číslo)"    

                        sx={{
                            mt: 5,
                            input: { color: "white" },
                            bgcolor: "#111",
                            borderRadius: 1,
                            mb: 4,
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
                <Grid item xs={12}> 
                    <TextField
                        fullWidth
                        label="Veľkosť konštanty"
                        type="number"
                        value={constant}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                                setConstant(value);
                                setErrorNeurons(value < 2 || value > 8); // nastaví error stav   
                            }}
                        inputProps={{
                            min: 1,
                            max: 10,
                            style: {
                                color: "white",
                                backgroundColor: "#222", // Tmavé pozadie iba pre samotný input
                                borderRadius: "4px",
                            },
                            }}
                        placeholder="Zadajte hodnotu konštanty"  
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
            </Typography>

            <Button 
                onClick={handleAdaptiveSumbmit} 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 3 }} 
                disabled={error || errorNeurons}
            >
                Upload parameters
            </Button>

            <Button variant="contained" color="secondary" onClick={handleAdaptiveRendering} fullWidth sx={{ mt: 2 }}>
                Spustiť rendering
            </Button>

            <Button onClick={showAdaptiveVideo} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                Show video
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

            {adaptive_tresholdVideo && (
                <Box sx={{ mt: 3 }}>
                    <video width="100%" controls>
                        <source src={adaptive_tresholdVideo} type="video/mp4" />
                    </video>
                </Box>
            )}
        </Card>
                {/* Tlačidlo pre návrat na hlavnú stránku */}
                <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: "center" }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<ArrowBackIcon />}
                        // Tu si doplníš referenciu
                        onClick={() => navigate("/filters")}
                    >
                        Späť
                    </Button>

                    <Button
                        onClick={() => navigate("/")}
                        variant="outlined"
                        color="primary"
                        startIcon={<HomeIcon />}
                    >
                        Hlavná stránka
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                        endIcon={<ArrowForwardIcon />}
                        // Tu si doplníš referenciu
                        onClick={() => navigate("/edges")}
                    >
                        Ďalej
                    </Button>
                </Stack>
        </Container>
        </Box>
        
    );
};

export default Treshold;
