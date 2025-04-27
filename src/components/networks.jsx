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
            const backendUrl = `http://${window.location.hostname}:5000/set_neural_network`;
            await fetch(backendUrl, {
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
            const backendUrlMetrics = `http://${window.location.hostname}:5000/set_metrics`;
            await fetch(backendUrlMetrics, {
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
        const backendUrlnetworkRendering = `http://${window.location.hostname}:5000/network_rendering`;
        fetch(backendUrlnetworkRendering, {
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
            const backendUrlaccRendering = `http://${window.location.hostname}:5000/acc_rendering`;
            const res = await fetch(backendUrlaccRendering, {
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
            const backendUrlNetworkVideo = `http://${window.location.hostname}:5000/video/neural_network`;
            setNetworkVideo(backendUrlNetworkVideo);
        }, 5);
    };

    const showAccVideo = () => {
        setTimeout(() => {
            const backendUrlacc = `http://${window.location.hostname}:5000/video/acc`;
            setAccVideo(backendUrlacc);
        }, 1);
    };

    const showValVideo = () => {
        setTimeout(() => {
            const backendUrlval = `http://${window.location.hostname}:5000/video/val`;
            setValVideo(backendUrlval);
        }, 1);
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
                            <source src={`http://${window.location.hostname}:5000/video/brain`} type="video/mp4" />
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
                            <source src={`http://${window.location.hostname}:5000/video/networks_example`} type="video/mp4" />
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

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                        Riziko preučenia (overfitting):
                    </Typography>
                    <Typography variant="body1" paragraph align="left">
                        Pri návrhu architektúry siete je dôležité zvážiť riziko preučenia. Preučenie nastáva, keď sa sieť príliš dobre naučí trénovacie dáta a stráca schopnosť generalizovať na nové, neznáme dáta.<br/>
                        Pri používaní tejto aplikácie je dôležité experimentovať s rôznymi parametrami a sledovať výkon siete, aby sa našla optimálna architektúra pre danú úlohu.
                    </Typography>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                    Epochy: Opakovanie je matka múdrosti
                    </Typography>

                    <Typography variant="body1" paragraph >
                        Epocha je základný koncept v trénovaní neurónových sietí. Predstavuje jeden kompletný prechod celého trénovacieho datasetu cez neurónovú sieť.
                    </Typography>

                    <video width="100%" autoPlay loop muted>
                            <source src={`http://${window.location.hostname}:5000/video/epochs`} type="video/mp4" />
                                Váš prehliadač nepodporuje prehrávanie videa.
                        </video>

                    <Typography variant="body1" paragraph align="left">
                        Počas jednej epochy sa sieť postupne pozerá na každý obrázok v tejto zbierke.<br/>
                        Po každom obrázku upravuje svoje vnútorné nastavenia (váhy), aby sa zlepšila v rozpoznávaní.<br/>
                        Keď sieť prejde cez všetky obrázky v zbierke, jedna epocha je dokončená.<br/>
                        Počas každej epochy sa sieť postupne učí z trénovacích dát a upravuje svoje váhy, aby minimalizovala chyby.<br/>    
                        Opakovaným prechádzaním dát sa sieť postupne zlepšuje v rozpoznávaní vzorov. <br/>  
                        Príliš málo epoch môže viesť k nedostatočnému učeniu, zatiaľ čo príliš veľa epoch môže viesť k preučeniu (overfitting). <br/>  
                        Správny počet epoch je kľúčový pre dosiahnutie optimálneho výkonu siete.
                    </Typography>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                        Metriky výkonu a rozdelenie dát
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Pri tréningu neurónových sietí je kľúčové sledovať rôzne metriky, aby sme pochopili, ako dobre sa sieť učí a ako generalizuje na nové dáta.<br/>
                        Okrem toho je dôležité správne rozdeliť dáta na trénovaciu a validačnú sadu, aby sme mohli objektívne hodnotiť výkon modelu.
                    </Typography>

                    <Typography variant="h5" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                        Metriky výkonu
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                        <strong>Presnosť (Accuracy):</strong> Meria, koľko predikcií modelu je správnych.<br/>
                        <strong>Strata (Loss):</strong> Meria, ako dobre model predpovedá výstupy, nižšia strata znamená lepší výkon modelu.<br/>
                        <strong>Validačná presnosť (Validation Accuracy):</strong> Meria presnosť modelu na validačnej sade dát, používa sa na monitorovanie generalizačnej schopnosti modelu a na detekciu preučenia.<br/>
                        <strong>Validačná strata (Validation Loss):</strong> Meria stratu modelu na validačnej sade dát, používa sa na monitorovanie generalizačnej schopnosti modelu a na detekciu preučenia.
                    </Typography>

                    <Typography variant="h5" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                        Rozdelenie dát
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                        <strong>Trénovacia sada (Training Set):</strong> Model sa z týchto dát učí. Predtavujú väčšinu datasetu. Zvyčajne okolo 75 % dát. <br/>
                        <strong>Validačná sada (Validation Set):</strong> Používa sa na monitorovanie výkonu modelu počas tréningu. Slúži na detegovanie preučenia. Tvoria zhruba 25 % datasetu<br/>
                    </Typography>

                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                    Priebeh tréningu: Vizualizácia a analýza tréningu neurónových sietí
                </Typography>
                    <Typography variant="body1" paragraph align="left">
                        <strong>Navrhnite svoju sieť:</strong> Zadajte, koľko vrstiev a neurónov chcete použiť.<br/>
                        <strong>Sledujte tréning v reálnom čase:</strong> Sledujte, ako sa vaša sieť učí, vďaka prehľadným grafom strát a presností.<br/>
                        <strong>Analyzujte a optimalizujte: </strong> Zistite, či sa vaša sieť učí správne, alebo či sa nepreučuje. Upravte parametre a sledujte, ako sa zlepšuje.<br/>
                        <strong>Epochy pod kontrolou:</strong> Sledujte, ako sa mení výkon vašej siete v závislosti od počtu epoch, a nájdite optimálny počet pre vašu úlohu.<br/>
                    </Typography>
                    <Typography variant="h5" sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                     Parametre neurónovej siete
                    </Typography>
                <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
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
                        <Grid item xs={6} sx={{ mt: 2 }}> 
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

                        <Grid item xs={6} sx={{ mt: 6 }}> 
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