import { Typography, Container, Card, Button, Box,  Menu, MenuItem, IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { SketchPicker } from "react-color";

const ColorSegmentation = () => {
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

  const [color, setColor] = useState({ r: 255, g: 0, b: 0 }); // Default: červená
  const [imageUrl, setImageUrl] = useState("");

  const handleChangeComplete = (newColor) => {
    setColor(newColor.rgb);
  };

  const segmentImage = async () => {
    const response = await fetch("http://127.0.0.1:5000/segment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color }),
    });

    const data = await response.json();

    // Pridáme časovú pečiatku, aby sa obrázok vždy načítal nanovo
    setImageUrl(`${data.image_url}?timestamp=${new Date().getTime()}`);
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
                Segmentácia
            </Typography>
            <Typography variant="body1" paragraph>
                 Nejaký text.
            </Typography>
        </Card>

        <Card
        sx={{
            p: 4,
            bgcolor: "#666",
            color: "white",
            borderRadius: 2,
            textAlign: "center",
            mb: 2,
        }}
        >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            {/* Výber farby */}
            <SketchPicker color={color} onChangeComplete={handleChangeComplete} />

            {/* Tlačidlo na segmentáciu */}
            <Button
            variant="contained"
            color="primary"
            onClick={segmentImage}
            sx={{ mt: 2, bgcolor: "#1976d2", ":hover": { bgcolor: "#1565c0" } }}
            >
            Segmentovať
            </Button>

            {/* Zobrazenie obrázka po segmentácii */}
            {imageUrl && (
            <img
                src={`${imageUrl}`}
                alt="Segmentovaný obrázok"
                style={{
                maxWidth: "100%",
                maxHeight: "300px",
                borderRadius: "8px",
                marginTop: "16px",
                }}
            />
            )}
        </div>
        </Card>
    </Container>
    </Box>
  );
};

export default ColorSegmentation;
