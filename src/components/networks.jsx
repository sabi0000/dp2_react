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

    const [networkVideo, setNetworkVideo] = useState("");
    const [networkLayers, setNetworkLayers] = useState(1);
    const [networkNeurons, setNetworkNeurons] = useState(2);
    const [isLoading, setIsLoading] = useState(false); // Loading state

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
    };
    
    const showNetworkVideo = () => {
        setTimeout(() => {
            setNetworkVideo("http://127.0.0.1:5000/video/neural_network");
        }, 5000);
    };

    return (
        <Box sx={{ bgcolor: "black", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white", textAlign: "center", p: 4 }}>
            <Box sx={{ position: "absolute", top: 10, left: 10 }}>
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
                    <MenuItem onClick={() => handleNavigate("/edge-detection")}>Detekcia hrán</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/edge-detection-2")}>Detekcia hrán 2</MenuItem>
                </Menu>
            </Box>
            <Container maxWidth="md">
                <Card sx={{ p: 4, bgcolor: "#333", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        Neurónové siete
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
                                label="Neural Network Layers"
                                type="number"
                                value={networkLayers}
                                onChange={(e) => setNetworkLayers(parseInt(e.target.value))}
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
                                label="Neural Network Neurons"
                                type="number"
                                value={networkNeurons}
                                onChange={(e) => setNetworkNeurons(parseInt(e.target.value))}
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

                    <Button onClick={handleNetworkSubmit} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
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

                <Button onClick={() => navigate("/")} variant="contained" color="primary" sx={{ mt: 2 }}>
                    Späť na hlavnú stránku
                </Button>
            </Container>
        </Box>
    );
};

export default Networks;