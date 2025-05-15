import { Typography, Container, Card, Button, Box, Menu, MenuItem, IconButton, Grid, TextField,Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { RotatingLines } from 'react-loader-spinner'; // Import the loading spinner
import UploadSection from './UploadSection';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useRef } from "react";


const Filters= () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
      const [file, setFile] = useState(null);

    const [gaussSize, setGaussSize] = useState(5);
    const [sigmaSize, setSigmaSize] = useState(1);
    const [gaussVideo, setGaussVideo] = useState("");

    const [ksize, setKsize] = useState(3);
    const [medianVideo, setMedianVideo] = useState("");

    const [openPicker, setOpenPicker] = useState(false);

    const [isLoading, setIsLoading] = useState(false); // Loading state
 
    const [error, setError] = useState(false);
    const [errorGauss, setErrorGauss] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5; // 
        }
    }, []);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log("Selected file:", selectedFile); // 
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

         
      const handleGaussRendering = async () => {
        setGaussVideo(null);
        setIsLoading(true); 
        const backendUrlGaussRendering = `http://${window.location.hostname}:5000/gauss_render`;
        fetch(backendUrlGaussRendering, {
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
            showGaussVideo(); // Call to show the video after rendering
        })
        .catch((err) => console.error("Network error:", err))
        .finally(() => {
            setIsLoading(false); // Set loading to false after rendering
            alert("Video je pripravené.");
        });
        alert("Renderovanie začalo.");
      };

      const handleMedianRendering = async () => {
        setMedianVideo(null);
        setIsLoading(true); 
        const backendUrlMedianRendering = `http://${window.location.hostname}:5000/median_render`;
        fetch(backendUrlMedianRendering, {
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
            showGaussVideo(); // Call to show the video after rendering
        })
        .catch((err) => console.error("Network error:", err))
        .finally(() => {
            setIsLoading(false); // Set loading to false after rendering
            alert("Video je pripravené.");
        });
        alert("Renderovanie začalo.");
      };



      const showGaussVideo = () => {
        const backendUrlGaussShow = `http://${window.location.hostname}:5000/video/gauss`;
        
          setGaussVideo(backendUrlGaussShow );
         
      };

      const showMedianVideo = () => {
        const backendUrlMedianShow = `http://${window.location.hostname}:5000/video/median`;
        
          setMedianVideo(backendUrlMedianShow);
         
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
                    Filtre v spracovaní obrazu
                </Typography>

                <Typography variant="body1" paragraph>
                Filtre v spracovaní digitálnych obrazov sú algoritmy, ktoré sa aplikujú na obraz s cieľom dosiahnuť špecifický efekt. Digitálne obrazové filtre sú mocné nástroje, ktoré umožňujú modifikovať a analyzovať digitálne obrazy rôznymi spôsobmi. Fungujú na princípe aplikovania matematických operácií na pixely obrazu na základe hodnôt ich susedných pixelov. Výsledkom je transformovaný obraz, ktorý môže byť vizuálne zmenený alebo pripravený pre ďalšiu analýzu.
                </Typography>

                
                <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                Prečo sú filtre dôležité?
                </Typography>

                <Typography variant="body1" paragraph align="left">
                    <strong>Redukcia šumu:</strong> Odstránenie nežiaducich artefaktov a zlepšenie vizuálnej čistoty obrazu. <br />
                    <strong>Extrakcia vlastností:  </strong> Identifikácia špecifických charakteristík obrazu, ako sú hrany alebo rohy.<br />
                    <strong>Príprava pre analýzu: </strong> Čistenie a štandardizácia obrazových dát pre algoritmy strojového učenia a počítačového videnia.<br />
                </Typography>

                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                    Gaussov filter: Jemné vyhladenie pre čistejší obraz
                    </Typography>

                    <Typography variant="body1" paragraph>
                    Gaussov filter je široko používaný na redukciu šumu v obrazoch pri zachovaní dôležitých detailov. Funguje tak, že každý pixel nahradí váženým priemerom jeho okolia, pričom váhy sú určené Gaussovou funkciou. To znamená, že bližšie pixely majú väčší vplyv na výslednú hodnotu, čo vedie k jemnému a prirodzenému vyhladeniu.
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                        <strong>Použitie: </strong> <br />
                        Efektívne znižuje šum, ktorý má náhodné rozloženie. <br />
                        Zachováva hrany lepšie ako jednoduchý priemerovací filter.<br />
                        Používa sa ako prípravný krok pre mnohé ďalšie algoritmy spracovania obrazu, napríklad detekciu hrán.
                    </Typography>
                    <video width="100%" autoPlay loop muted>
                        <source src={`http://${window.location.hostname}:5000/video/gauss_example`} type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                    Interaktívne filtre: Gaussov filter
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                        <strong>Nahrajte svoj obrázok: </strong> Začnite nahraním obrázka, na ktorom chcete experimentovať s Gaussovým filtrom. <br />
                        <strong>Nastavte veľosť jadra: </strong>Interaktívne upravte veľkosť konvolučného jadra (šírku a výšku Gaussovho "okna"). Väčšie hodnoty vedú k silnejšiemu vyhladeniu. <br />
                        <strong>Nastavte sigma:  </strong> Zmeňte hodnotu sigma (štandardná odchýlka Gaussovej funkcie), ktorá ovplyvňuje rozsah a intenzitu vyhladenia. Vyššie hodnoty sigma spôsobujú rozsiahlejšie a jemnejšie vyhladenie.<br />
                        <strong>Spustite rendering:  </strong> Aplikácia spracuje váš obrázok pomocou gaussovho filtra s vašimi nastaveniami.<br />
                        <strong>Sledujte video: </strong>  Pozorujte, ako sa váš obrázok mení pri úprave parametrov, a nájdite ideálne nastavenie pre redukciu šumu pri zachovaní dôležitých detailov.<br />
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
                    <Grid item xs={12}> 
                        <TextField
                        fullWidth
                        label="Gauss size"
                        type="number"
                        value={gaussSize}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setGaussSize(value);
                            setErrorGauss(value % 2 === 0);
                        }}
                        error={errorGauss}
                        helperText={errorGauss ? "Hodnota musí byť nepárna" : " "}
                        //onChange={(e) => setGaussSize(parseInt(e.target.value))}
                        inputProps={{
                            min: 1,
                            max: 10,
                            style: {
                              color: "white",
                              backgroundColor: "#222", // 
                              borderRadius: "4px",
                            },
                          }}
                        placeholder="Zadajte gauss size"  
                        sx={{
                            input: { color: "white" },
                            bgcolor: "#111",
                            borderRadius: 1,
                            mb:4,
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
                        <TextField
                        fullWidth
                        label="Sigma"
                        type="number"
                        value={sigmaSize}
                        onChange={(e) => setSigmaSize(parseInt(e.target.value))}
                        inputProps={{
                            min: 1,
                            max: 10,
                            style: {
                              color: "white",
                              backgroundColor: "#222", // 
                              borderRadius: "4px",
                            },
                          }}
                        placeholder="Zadajte hodnotu sigma"  
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
                        Upload parameters
                        </Button>
                    </Grid>
                    </Grid>

                

                    <Box sx={{ mt: 3 }}>
                    <Button variant="contained" color="secondary" onClick={handleGaussRendering} fullWidth >    
                        Spustiť Rendering
                    </Button>
                    </Box>
                    <Button onClick={showGaussVideo} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
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


                    
                    {gaussVideo && (
                    <Box sx={{ mt: 3 }}>
                        <video width="100%" controls>
                        <source src={gaussVideo} type="video/mp4" />
                        </video>
                    </Box>
                    )}
                </Card>
            

            <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                Mediánový filter: Eliminujte šum s presnosťou
            </Typography>

            <Typography variant="body1" paragraph>
                Mediánový filter je špeciálne navrhnutý na odstránenie impulzného šumu (tzv. "soľ a korenie" šum), ktorý sa prejavuje ako náhodné čierne a biele pixely v obraze. Funguje tak, že pre každý pixel nahradí jeho hodnotu mediánovou hodnotou pixelov v jeho definovanom okolí. Vďaka tomu dokáže efektívne eliminovať extrémne hodnoty šumu bez výrazného rozmazania hrán.
            </Typography>

            <Typography variant="body1" paragraph align="left">
                <strong>Použitie: </strong> <br />
                Ideálny na odstránenie náhlych, izolovaných šumových bodov. <br />
                Lepšie zachováva ostré hrany v porovnaní s priemerovacími filtrami pri odstraňovaní impulzného šumu.<br />
                Používa sa v rôznych aplikáciách, kde sa vyskytuje tento typ šumu, napríklad pri spracovaní naskenovaných dokumentov alebo starých fotografií.
            </Typography>
            <video width="100%" autoPlay loop muted>
                <source src={`http://${window.location.hostname}:5000/video/median_example`} type="video/mp4" />
                Váš prehliadač nepodporuje prehrávanie videa.
            </video>
            

            </Card>
            <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}> 
            Interaktívne filtre: Mediánový filter
            </Typography>

            <Typography variant="body1" paragraph align="left">
                <strong>Nahrajte svoj obrázok: </strong> Začnite nahraním obrázka, na ktorom chcete experimentovať s Gaussovým filtrom. <br />
                <strong>Nastavte veľkosť jadra (K-size): </strong>Interaktívne upravte veľkosť štvorcového okolia, v ktorom sa bude vypočítavať medián. Väčšie okná sú účinnejšie pri odstraňovaní rozsiahlejšieho šumu, ale môžu viesť k väčšiemu rozmazaniu detailov. <br />
                <strong>Spustite rendering:  </strong> Aplikácia spracuje váš obrázok pomocou mediánového filtra s vašimi nastaveniami.<br />
                <strong>Sledujte video: </strong> Sledujte, ako sa impulzný šum (čierne a biele bodky) z vášho obrázka odstraňuje pri zmene veľkosti jadra, a nájdite optimálnu rovnováhu medzi odstránením šumu a zachovaním ostrých hrán.<br />
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
                        label="K-size"
                        type="number"
                        value={ksize}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setKsize(value);
                            setError(value % 2 === 0);
                            }}
                            error={error}
                            helperText={error ? "Hodnota musí byť nepárna" : " "}
                            
                            inputProps={{
                            min: 1,
                            max: 10,
                            style: {
                                color: "white",
                                backgroundColor: "#222", // 
                                borderRadius: "4px",
                            },
                            }}
                        placeholder="Zadajte veľkosť K-size (nepárne číslo)"    

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
                
            </Typography>

            <Button 
                onClick={handleKsizeSubmit} 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 3 }} 
                disabled={error}
            >
                Upload parameters
            </Button>

            <Button variant="contained" color="secondary" onClick={handleMedianRendering} fullWidth sx={{ mt: 2 }}>
                Spustiť rendering
            </Button>

            <Button onClick={showMedianVideo} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
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

            {medianVideo && (
                <Box sx={{ mt: 3 }}>
                    <video width="100%" controls>
                        <source src={medianVideo} type="video/mp4" />
                    </video>
                </Box>
            )}
        </Card>
                {/* Tlačidlo pre návrat na hlavnú stránku */}
                <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => {
                            window.scrollTo(0, 0);
                            navigate("/convolution");
                        }} 
                    >
                        Späť
                    </Button>

                    <Button
                        onClick={() => navigate("/")}
                        variant="contained"
                        color="primary"
                        startIcon={<HomeIcon />}
                    >
                        Hlavná stránka
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => {
                            window.scrollTo(0, 0);
                            navigate("/treshold");
                        }} 
                    >
                        Ďalej
                    </Button>
                </Stack>
        </Container>
        </Box>
        
    );
};

export default Filters;
