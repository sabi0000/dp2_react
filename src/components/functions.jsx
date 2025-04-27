
import { Typography, Container, Card, Button, Box,  Menu, MenuItem, IconButton, TextField} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";


const Functions = () => {
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

        const [input, setInput] = useState("");
        const [output, setOutput] = useState(null);

        const sigmoid = (x) => {
            return 1 / (1 + Math.exp(-x));
        };

        
        const handleCalculate = () => {
            const num = parseFloat(input);
            if (!isNaN(num)) {
                setOutput(sigmoid(num).toFixed(4));
            } else {
                setOutput("Zadajte platné číslo");
            }
        };

        const handleCalculateReLU = () => {
            const num = parseFloat(input);
            if (!isNaN(num)) {
                setOutput(Math.max(0, num).toFixed(4));
            } else {
                setOutput("Zadajte platné číslo");
            }
        };

        const handleCalculateTanh = () => {
            const num = parseFloat(input);
            if (!isNaN(num)) {
                setOutput(Math.tanh(num).toFixed(4));
            } else {
                setOutput("Zadajte platné číslo");
            }
        };

        const handleSoftmaxCalculate = () => {
            try {
                const inputArray = input.split(',').map(val => parseFloat(val.trim()));
                if (inputArray.some(isNaN)) {
                    setOutput("Zadajte platné čísla oddelené čiarkou");
                    return;
                }
        
                const expValues = inputArray.map(x => Math.exp(x));
                const sumExp = expValues.reduce((a, b) => a + b, 0);
                const softmaxValues = expValues.map(val => (val / sumExp).toFixed(4));
        
                setOutput(`[ ${softmaxValues.join(', ')} ]`);
            } catch (err) {
                setOutput("Chyba pri výpočte");
            }
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
                <Card sx={{ mt: 4, p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{
                            color: "#00bcd4",
                            fontWeight: "bold"
                            }}
                        >
                    Aktivačné funkcie: Rozhodovanie v neurónových sieťach
                    </Typography>
                    <Typography variant="body1" paragraph>
                    Aktivačné funkcie sú neoddeliteľnou súčasťou umelých neurónových sietí. Ich hlavnou úlohou je zaviesť nelinearitu do výpočtového modelu, čo umožňuje neurónovým sieťam učiť sa a modelovať komplexné vzory v dátach. Bez aktivačných funkcií by neurónová sieť bola len lineárnou kombináciou vstupov, čo by výrazne obmedzilo jej schopnosť riešiť zložité problémy.
                    </Typography>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                    Ako fungujú aktivačné funkcie?
                    </Typography>
                    <Typography variant="body1" paragraph>
                    V každom neuróne neurónovej siete sa vstupné signály váhujú a sčítajú. Výsledná hodnota sa potom prenesie cez aktivačnú funkciu, ktorá rozhodne, či sa neurón "aktivuje" (t. j. vyšle signál) alebo nie. Aktivačná funkcia teda určuje výstup neurónu na základe jeho vstupu.
                    </Typography>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                    Sigmoid
                    </Typography>
                    
                    <video width="100%" controls>
                        <source src={`http://${window.location.hostname}:5000/video/sigmoid`} type="video/mp4" />
                            Váš prehliadač nepodporuje prehrávanie videa.
                    </video>

                    <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                    Táto funkcia mapuje vstupné hodnoty do rozsahu medzi 0 a 1.<br />
                     Často sa používa v binárnej klasifikácii, kde výstup predstavuje pravdepodobnosť.
                    </Typography>

                <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>Sigmoid Kalkulačka</Typography>
                <TextField
                    label="Vstupná hodnota"
                    variant="outlined"
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Zadajte číslo"
                    sx={{
                        input: { color: "white" }, // Farba textu v poli
                        bgcolor: "#222", // Tmavé pozadie
                        borderRadius: 1, // Zaoblené rohy
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#555" }, // Fixná farba ohraničenia
                            // Removed hover and focus styles
                        }
                    }}
                    InputLabelProps={{
                        sx: { 
                            color: "white", // Biela farba labelu
                            fontSize: "1.2rem", // Väčší text
                            transform: "translate(14px, -25px) scale(1)", // Posunutie vyššie
                        }
                    }}

                />
                <Button variant="contained" color="primary" onClick={handleCalculate} sx={{ mt: 2 }}>
                    Vypočítať
                </Button>
                {output !== null && (
                    <Typography variant="h5" sx={{ mt: 2 }}>
                        Výstup: {output}
                    </Typography>
                )}
            </Card>

            <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                    ReLU (Rectified Linear Unit)
                    </Typography>
                    
                    <video width="100%" controls>
                        <source src={`http://${window.location.hostname}:5000/video/relu`} type="video/mp4" />
                            Váš prehliadač nepodporuje prehrávanie videa.
                    </video>

                    <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                    ReLU funkcia vracia 0 pre záporné vstupy a samotný vstup pre kladné vstupy.<br />
                    Je to veľmi populárna funkcia v hlbokom učení, pretože pomáha riešiť problém miznúceho gradientu.
                    </Typography>

                <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>ReLU Kalkulačka</Typography>
                <TextField
                    label="Vstupná hodnota"
                    variant="outlined"
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Zadajte číslo"
                    sx={{
                        input: { color: "white" }, // Farba textu v poli
                        bgcolor: "#222", // Tmavé pozadie
                        borderRadius: 1, // Zaoblené rohy
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#555" }, // Fixná farba ohraničenia
                            // Removed hover and focus styles
                        }
                    }}
                    InputLabelProps={{
                        sx: { 
                            color: "white", // Biela farba labelu
                            fontSize: "1.2rem", // Väčší text
                            transform: "translate(14px, -25px) scale(1)", // Posunutie vyššie
                        }
                    }}

                />
                <Button variant="contained" color="primary" onClick={handleCalculateReLU} sx={{ mt: 2 }}>
                    Vypočítať
                </Button>
                {output !== null && (
                    <Typography variant="h5" sx={{ mt: 2 }}>
                        Výstup: {output}
                    </Typography>
                )}
            </Card>

            <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                    Tanh (Hyperbolický tangens)
                    </Typography>
                    
                    <video width="100%" controls>
                        <source src={`http://${window.location.hostname}:5000/video/tanh`} type="video/mp4" />
                            Váš prehliadač nepodporuje prehrávanie videa.
                    </video>

                    <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                    Podobne ako sigmoid, tanh mapuje vstupné hodnoty do rozsahu, ale medzi -1 a 1 <br />
                    Často sa používa v situáciách, kde sú potrebné záporné aj kladné výstupy.
                    </Typography>

                <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>Tanh Kalkulačka</Typography>
                <TextField
                    label="Vstupná hodnota"
                    variant="outlined"
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Zadajte číslo"
                    sx={{
                        input: { color: "white" }, // Farba textu v poli
                        bgcolor: "#222", // Tmavé pozadie
                        borderRadius: 1, // Zaoblené rohy
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#555" }, // Fixná farba ohraničenia
                            // Removed hover and focus styles
                        }
                    }}
                    InputLabelProps={{
                        sx: { 
                            color: "white", // Biela farba labelu
                            fontSize: "1.2rem", // Väčší text
                            transform: "translate(14px, -25px) scale(1)", // Posunutie vyššie
                        }
                    }}

                />
                <Button variant="contained" color="primary" onClick={handleCalculateTanh} sx={{ mt: 2 }}>
                    Vypočítať
                </Button>
                {output !== null && (
                    <Typography variant="h5" sx={{ mt: 2 }}>
                        Výstup: {output}
                    </Typography>
                )}
            </Card>

            <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                    Softmax
                    </Typography>
                    
                    <video width="100%" controls>
                        <source src={`http://${window.location.hostname}:5000/video/softmax`} type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>

                    <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                    Softmax funkcia sa používa na výstupnej vrstve neurónovej siete pre viac-triednu klasifikáciu. <br />
                    Premieňa surové výstupy na pravdepodobnostné rozdelenie cez triedy.
                    </Typography>

                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                        Softmax Kalkulačka
                    </Typography>

                    <TextField
                        label="Vstupné hodnoty"
                        variant="outlined"
                        fullWidth
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Zadajte čísla oddelené čiarkou (napr. 2, 1, 0)"
                        sx={{
                            input: { color: "white" },
                            bgcolor: "#222",
                            borderRadius: 1,
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#555" }
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

                    <Button variant="contained" color="primary" onClick={handleSoftmaxCalculate} sx={{ mt: 2 }}>
                        Vypočítať
                    </Button>

                    {output !== null && (
                        <Typography variant="h5" sx={{ mt: 2 }}>
                            Výstup: {output}
                        </Typography>
                    )}
            </Card>

                
                
                <Button onClick={() => navigate("/")} variant="contained" color="primary" sx={{ mt: 2 }}>
                    Späť na hlavnú stránku
                </Button>
            </Container>
        </Box>
        
    );
};

export default Functions;
