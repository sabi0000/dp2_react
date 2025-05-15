import { Typography, Container, Card, Button, Box, Menu, MenuItem, IconButton,Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useRef } from "react";

const Neurons = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5; // 
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
                    Neuróny: Základné stavebné jednotky inteligencie
                </Typography>
                    <Typography variant="body1" paragraph>
                        Neuróny sú základné stavebné kamene nervového systému, zodpovedné za prenos a spracovanie informácií.
                        V tejto sekcii sa hlbšie ponoríme do sveta biologických neurónov a ich fungovania, a preskúmame, ako tieto
                        princípy inšpirovali vývoj modelov neurónov v umelej inteligencii.
                    </Typography>
                </Card>

                {/* Biologické neuróny */}
                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                        Biologické neuróny: Komplexné komunikačné siete
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Biologický neurón sa skladá z tela bunky (sóma), dendritov (prijímajú signály) a axónu (vysiela signály).
                        Informácie sa prenášajú prostredníctvom elektrických a chemických signálov cez synapsie, spojenia medzi neurónmi.
                        Neuróny tvoria zložité siete, ktoré umožňujú spracovanie komplexných informácií a učenie. Elektrické impulzy sa šíria
                        pozdĺž axónu. Na synapsiach sa uvoľňujú chemické látky, ktoré prenášajú signály medzi neurónmi. Synaptické spojenia
                        sa môžu posilňovať alebo oslabovať v závislosti od aktivity, čo je základom učenia a pamäti. Táto schopnosť adaptácie,
                        známa ako plasticita, umožňuje nervovému systému prispôsobiť sa novým skúsenostiam.
                    </Typography>
                </Card>

                {/* Ukážka biologického neurónu */}
                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                        Ukážka biologického neurónu
                    </Typography>
                    <video width="100%" autoPlay loop muted>
                        <source src={`http://${window.location.hostname}:5000/video/bio_neuron`} type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>
                </Card>

                {/* Umelé neuróny */}
                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                        Modelovanie neurónov v umelej inteligencii
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Inšpirované biologickými neurónmi, umelé neuróny sú matematické modely, ktoré prijímajú vstupy, spracúvajú ich a generujú výstupy.
                        Tieto modely sú základom neurónových sietí, ktoré sa používajú v rôznych aplikáciách umelej inteligencie. Neurónové siete sú tvorené
                        vrstvami umelých neurónov, ktoré sú prepojené váhami. Váhy predstavujú silu spojenia medzi neurónmi a upravujú sa počas tréningu,
                        aby sieť dosiahla požadovaný výstup.
                    </Typography>
                </Card>

                {/* Ukážka matematického modelu neurónu */}
                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                        Ukážka matematického modelu neurónu
                    </Typography>
                    <video width="100%" autoPlay loop muted>
                    <source src={`http://${window.location.hostname}:5000/video/ai_neuron`} type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>
                </Card>

                {/* Tlačidlo pre návrat na hlavnú stránku */}
                <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => {
                            window.scrollTo(0, 0);
                            navigate("/");
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
                            navigate("/functions");
                        }}
                    >
                        Ďalej
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default Neurons;
