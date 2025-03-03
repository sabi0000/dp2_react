
import { Typography, Container, Card, Button, Box,  Menu, MenuItem, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";


const Neurons = () => {
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
                        Neuróny
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Nejaký text.
                    </Typography>
                </Card>
                
                <Card sx={{ p: 4, bgcolor: "#444", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        Biologické neuróny
                    </Typography>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#666", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        Ukážka biologického neurónu
                    </Typography>
                    <video width="100%" controls>
                        <source src="http://127.0.0.1:5000/video/bio_neuron" type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>
                </Card>
                
                <Card sx={{ p: 4, bgcolor: "#555", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        Umelé neuróny
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Nejaký text.
                    </Typography>
                </Card>
                
                <Card sx={{ p: 4, bgcolor: "#666", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        Ukážka matematického modelu neurónu
                    </Typography>
                    <video width="100%" controls>
                        <source src="http://127.0.0.1:5000/video/ai_neuron" type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>
                </Card>
                
                <Button onClick={() => navigate("/")} variant="contained" color="primary" sx={{ mt: 2 }}>
                    Späť na hlavnú stránku
                </Button>
            </Container>
        </Box>
    );
};

export default Neurons;
