import { Typography, Grid, Container, Card, Button, Box, Menu, MenuItem, IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { RotatingLines } from 'react-loader-spinner'; // Import the loading spinner

const Networks = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
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

    const [error, setError] = useState(false);
    const [errorNeurons, setErrorNeurons] = useState(false);

    const [networkVideo, setNetworkVideo] = useState("");
    const [networkLayers, setNetworkLayers] = useState("");
    const [networkNeurons, setNetworkNeurons] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const [accVideo, setAccVideo] = useState("");
    const [valVideo, setValVideo] = useState("");
    const [networkLayers_m, setAccLayers] = useState(1);
    const [networkNeurons_m, setAccNeurons] = useState(2);
    const [networkEpochs_m, setAccEpochs] = useState(2);

    const handleNetworkSubmit = async (event) => {
        event.preventDefault();
        try {
            await fetch("http://127.0.0.1:5000/set_neural_network", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ layers: networkLayers, neurons: networkNeurons }),
            });
            alert("Hodnoty uložené.");
        } catch (error) {
            console.error("Chyba:", error);
        }
    };

    const handleMetricsSubmit = async (event) => {
        event.preventDefault();
        try {
            await fetch("http://127.0.0.1:5000/set_metrics", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ layers_m: networkLayers_m, neurons_m: networkNeurons_m, epochs_m:networkEpochs_m }),
            });
            alert("Hodnoty uložené.");
        } catch (error) {
            console.error("Chyba:", error);
        }
    };
    
    const handleNetworkRendering = async () => {
        setIsLoading(true); // Set loading to true
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
        .then((data) => {
            console.log("Network response:", data);
            showNetworkVideo(); // Call to show the video after rendering
        })
        .catch((err) => console.error("Network error:", err))
        .finally(() => {
            setIsLoading(false); // Set loading to false after rendering
        });
        alert("Renderovanie začalo.");
    };

    const handleMetricsRendering = async () => {
        setIsLoading(true); // Set loading to true
        setAccVideo(null);
        setValVideo(null);
    
        try {
            const res = await fetch("http://127.0.0.1:5000/acc_rendering", {
                method: "POST",
                credentials: "include",
            });
    
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
    
            const data = await res.text(); // Ak server vracia iba text, použijeme text() namiesto json()
            console.log("Network response:", data);
    
            // Po úspešnom renderovaní zobrazíme obe videá
            showAccVideo();
            showValVideo();
        } catch (err) {
            console.error("Network error:", err);
        } finally {
            setIsLoading(false); // Set loading to false after rendering
        }
    };
    
    
    const showNetworkVideo = () => {
        setTimeout(() => {
            setNetworkVideo("http://127.0.0.1:5000/video/neural_network");
        }, 5);
    };

    const showAccVideo = () => {
        setTimeout(() => {
            setAccVideo("http://127.0.0.1:5000/video/acc");
        }, 5000);
    };

    const showValVideo = () => {
        setTimeout(() => {
            setValVideo("http://127.0.0.1:5000/video/val");
        }, 5000);
    };

    return (
        
        <Box sx={{ bgcolor: "black", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white", textAlign: "center", p: 4 }}>
            <Box sx={{ position: "absolute", top: 10, left: 10, display: "flex", alignItems: "center" }}>
                <IconButton onClick={handleClick} sx={{ color: "white" }}>
                    <MenuIcon />
                </IconButton>
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
                    <MenuItem onClick={() => handleNavigate("/edge-detection")}>Detekcia hrán</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/edge-detection-2")}>Detekcia hrán 2</MenuItem>
                </Menu>
            </Box>
            <Container maxWidth="md">
                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>  
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{
                            color: "#00bcd4",
                            fontWeight: "bold"
                            }}
                    >
                        Neurónové siete
                    </Typography>
                    <Typography variant="body1" paragraph>
                    Neurónové siete sú výpočtové modely inšpirované štruktúrou a funkciou ľudského mozgu. Skladajú sa z prepojených uzlov, nazývaných neuróny, ktoré spracúvajú a prenášajú informácie.
                    </Typography>
                </Card>
                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                        Paralely s ľudským mozgom
                    </Typography>
                        <video width="100%" autoPlay loop muted>
                            <source src="http://127.0.0.1:5000/video/brain" type="video/mp4" />
                                Váš prehliadač nepodporuje prehrávanie videa.
                        </video>
                        <Typography variant="body1" paragraph>
                        Rovnako ako ľudský mozog, aj neurónové siete sú tvorené sieťou prepojených jednotiek.<br />
                        Ľudský mozog sa učí posilňovaním alebo oslabovaním synaptických spojení.<br />
                        Neurónové siete sa učia úpravou váh medzi neurónmi počas tréningu.<br />
                        Mozog spracúva informácie paralelne, čo mu umožňuje rýchlo riešiť komplexné problémy.<br />
                        Neurónové siete tiež spracúvajú informácie paralelne, čo ich robí efektívnymi pre úlohy ako rozpoznávanie obrazu a spracovanie prirodzeného jazyka.<br />
                        </Typography>
                    </Card>

                    <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                        Ako fungujú neurónové siete?
                    </Typography>
                        <video width="100%" autoPlay loop muted>
                            <source src="http://127.0.0.1:5000/video/networks_example" type="video/mp4" />
                                Váš prehliadač nepodporuje prehrávanie videa.
                        </video>
                        <Typography variant="body1" paragraph>
                        Neurónové siete sú organizované do vrstiev: vstupná vrstva, skryté vrstvy a výstupná vrstva..<br />
                        Vstupná vrstva: Prijíma surové dáta, ako sú pixely obrázka alebo slová v texte, a prenáša ich do siete.<br />
                        Skryté vrstvy: Spracúvajú a transformujú vstupné dáta, extrahujú zložité vzory a reprezentácie.<br />
                        Výstupná vrstva: Generuje konečný výstup siete, ako sú predikcie alebo klasifikácie.<br />
                        </Typography>
                    </Card>

                    <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                        Vytvorenie vlastnej neurónovej siete
                    </Typography>

                    <Typography variant="body1" paragraph>
                    Táto aplikácia umožňuje užívateľovi definovať architektúru neurónovej siete podľa vlastných potrieb. Zadávajú sa počty neurónov v jednotlivých vrstvách a celkový počet vrstiev. Táto flexibilita umožňuje experimentovať s rôznymi konfiguráciami a nájsť optimálnu sieť pre danú úlohu.
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                    <strong>Počet vrstiev:</strong> Určuje hĺbku siete a jej schopnosť modelovať komplexné vzory. Viac vrstiev môže viesť k lepším výsledkom, ale aj k vyššej výpočtovej náročnosti. <br />
                    <strong>Počet neurónov v každej vrstve:</strong> Ovplyvňuje kapacitu siete a jej schopnosť učiť sa z dát. Príliš málo neurónov môže viesť k nedostatočnému učeniu, zatiaľ čo príliš veľa neurónov môže viesť k preučeniu.
                    </Typography>

                    <Typography variant="h5" sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                     Parametre neurónovej siete
                    </Typography>
                    <Typography variant="h5" gutterBottom paragraph sx={{ mt: 2 }}>
                        <Grid item xs={12}> 
                            <TextField
                                fullWidth
                                label="Neural Network Layers"
                                type="number"
                                value={networkLayers}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setNetworkLayers(value);
                                    setError(value < 1 || value > 6);
                                  }}
                                  error={error}
                                  helperText={error ? "Hodnota musí byť medzi 1 a 6" : " "}
                                  
                                  inputProps={{
                                    min: 1,
                                    max: 10,
                                    style: {
                                      color: "white",
                                      backgroundColor: "#222", // Tmavé pozadie iba pre samotný input
                                      borderRadius: "4px",
                                    },
                                  }}
                                placeholder="Zadajte počet vrstiev od 1 po 6"    

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
                                label="Neural Network Neurons"
                                type="number"
                                value={networkNeurons}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                      setNetworkNeurons(value);
                                      setErrorNeurons(value < 2 || value > 8); // nastaví error stav   
                                  }}
                                error={errorNeurons}
                                helperText={errorNeurons ? "Hodnota musí byť medzi 2 a 8" : " "}
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
                    </Typography>

                    <Button 
                        onClick={handleNetworkSubmit} 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ mt: 3 }} 
                        disabled={error || errorNeurons}
                    >
                        Upload network parameters
                    </Button>
                    
                    <Button onClick={showNetworkVideo} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                        Show network video
                    </Button>

                    <Button variant="contained" color="secondary" onClick={handleNetworkRendering} fullWidth sx={{ mt: 2 }}>
                        Spustiť network rendering
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

                    {networkVideo && (
                        <Box sx={{ mt: 3 }}>
                            <video width="100%" controls>
                                <source src={networkVideo} type="video/mp4" />
                            </video>
                        </Box>
                    )}
                </Card>

                <Card sx={{ p: 4, bgcolor: "#333", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        Metriky
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Nejaký text.
                    </Typography>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#444", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                <Typography variant="h5" gutterBottom>
                        <Grid item xs={6}> 
                            <TextField
                                fullWidth
                                label="Metrics Network Layers"
                                type="number"
                                value={networkLayers_m}
                                onChange={(e) => setAccLayers(parseInt(e.target.value))}
                                placeholder="Zadajte číslo"    
                                sx={{
                                    input: { color: "white" },
                                    bgcolor: "#222",
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
                        <Grid item xs={6}> 
                            <TextField
                                fullWidth
                                label="Metrics Network Neurons"
                                type="number"
                                value={networkNeurons_m}
                                onChange={(e) => setAccNeurons(parseInt(e.target.value))}
                                sx={{
                                    input: { color: "white" },
                                    bgcolor: "#222",
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
                                label="Metrics Network Epochs"
                                type="number"
                                value={networkEpochs_m}
                                onChange={(e) => setAccEpochs(parseInt(e.target.value))}
                                sx={{
                                    input: { color: "white" },
                                    bgcolor: "#222",
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


                    <Button onClick={handleMetricsSubmit} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Upload network parameters
                    </Button>
                    
                    <Button onClick={showAccVideo} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                        Show network video
                    </Button>

                    <Button variant="contained" color="secondary" onClick={handleMetricsRendering} fullWidth sx={{ mt: 2 }}>
                        Spustiť network rendering
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

                    {accVideo && (
                        <Box sx={{ mt: 3 }}>
                            <video width="100%" controls>
                                <source src={accVideo} type="video/mp4" />
                            </video>
                        </Box>
                    )}

                    {valVideo && (
                        <Box sx={{ mt: 3 }}>
                            <video width="100%" controls>
                                <source src={valVideo} type="video/mp4" />
                            </video>
                        </Box>
                    )}
                </Card>
                <Button onClick={() => navigate("/")} variant="contained" color="primary" sx={{ mt: 2 }}>
                    Späť na hlavnú stránku
                </Button>
            </Container>
        </Box>
    );
};

export default Networks;