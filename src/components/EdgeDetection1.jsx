import React, { useState } from "react";
import { Typography, Container, Card, Button, Box, Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'; // Import ikony
import { useNavigate } from "react-router-dom";

const EdgeDetection = () => {
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
        handleClose(); // Zatvorenie menu po navigácii
    };

    return (
        <Box sx={{ bgcolor: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

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

            <Container maxWidth="md" sx={{ mt: 4, flexGrow: 1 }}>
                <Card elevation={6} sx={{ p: 4, bgcolor: '#424242', color: 'white' }}>
                    <Typography variant="h3" gutterBottom align="center">
                        Detekcia hrán
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Hrany sú miesta, kde sa prudko mení hodnota jasu. Sú dôležité pre analýzu obrazu.
                    </Typography>
                </Card>

                {/* Ostatné Card komponenty s tieňmi */}
                <Card elevation={6} sx={{ p: 4, mt: 2, bgcolor: '#424242', color: 'white' }}>
                    <Typography variant="h3" gutterBottom align="center">
                        Canny
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Navrhol ho John Canny v roku 1986. Spĺňa 3 základné kritériá:
                    </Typography>
                    <ul>
                        <li>Kritérium detekcie: Identifikuje všetky dôležité hrany.</li>
                        <li>Lokalizačné kritérium: Hranice sú presne umiestnené.</li>
                        <li>Kritérium jednej odozvy: Každá hrana má len jednu odozvu.</li>
                    </ul>
                </Card>

                <Card elevation={3} sx={{ p: 4, mt: 2, textAlign: "center", bgcolor: '#424242', color: 'white' }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Ukážka Cannyho detekcie hrán
                    </Typography>
                    <video width="100%" controls>
                        <source src="http://127.0.0.1:5000/video/canny_example" type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>
                </Card>

                <Card elevation={3} sx={{ p: 4, mt: 2, bgcolor: '#424242', color: 'white' }}>
                    <Typography variant="h3" gutterBottom align="center">
                        Sobel
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Sobelov filter využíva gradient jasovej funkcie na detekciu hrán pomocou konvolúcie s jadrom.
                    </Typography>
                </Card>

                <Card elevation={3} sx={{ p: 4, mt: 2, textAlign: "center", bgcolor: '#424242', color: 'white' }}>
                    < Typography variant="h4" gutterBottom align="center">
                        Ukážka Sobelovej detekcie hrán
                    </Typography>
                    <video width="100%" controls>
                        <source src="http://127.0.0.1:5000/video/sobel_example" type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>
                </Card>
                <Button onClick={() => handleNavigate("/edge-detection-2")} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Ďalšia strana
                    </Button>
            </Container>
        </Box>
    );
};

export default EdgeDetection;