import React, { useState } from "react";
import { Typography, Container, Card, Button, Box, Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
        <Box sx={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white", textAlign: "center" }}>
            
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
                    <MenuItem onClick={() => handleNavigate("/edge-detection")}>Detekcia hrán</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/edge-detection-2")}>Detekcia hrán 2</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/architecture")}>Architektúra</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/convolution")}>Konvolúcia</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/edges")}>Hrany</MenuItem>
                </Menu>
            </Box>
            
            {/* Úvodná obrazovka */}
            <Container maxWidth="sm">
                <Card sx={{ p: 4, bgcolor: "rgba(51, 51, 51, 0.8)", color: "white", borderRadius: 2, textAlign: "center" }}>
                    <Typography variant="h4" gutterBottom>
                        Vitajte v edukačnej aplikácii pre výpočtovú inteligenciu a strojové videnie
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Táto aplikácia umožňuje analyzovať a vizualizovať jednotlivé aspekty výpočtovej inteligencie a strojového videnia.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => handleNavigate("/edge-detection")}>
                        Začať
                    </Button>
                </Card>
            </Container>
        </Box>
    );
};

export default Home;
