import { Typography, Container, Card, Button, Box, Menu, MenuItem, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";

const Architecture= () => {
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
                    <MenuItem onClick={() => handleNavigate("/edge-detection")}>Detekcia hrán</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/edge-detection-2")}>Detekcia hrán 2</MenuItem>
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
                    Architektúra neurónových sietí: Formálny rámec pre výpočtovú inteligenciu
                </Typography>
                    <Typography variant="body1" paragraph>
                    Architektúra neurónovej siete definuje štruktúru a organizáciu neurónov a ich spojení v rámci siete. Predstavuje základný dizajn, ktorý určuje, ako sieť spracúva informácie a ako sa učí. Rôzne architektúry sú navrhnuté pre rôzne typy úloh a dátových štruktúr.
                    </Typography>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                    Konvolučné neurónové siete (CNN):
                    </Typography>
                    <Typography variant="body1" paragraph>
                        CNN sú špeciálne navrhnuté pre spracovanie obrazových dát.<br/>
                        Využívajú konvolučné vrstvy na extrakciu vlastností z obrazov.<br/>
                        Sú efektívne pri rozpoznávaní objektov, tvárí a scén.<br/>
                    </Typography>
                    <video width="100%" autoPlay loop muted>
                        <source src={`http://${window.location.hostname}:5000/video/cnn`} type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                        DenseNet 121
                    </Typography>
                    <Typography variant="body1" paragraph>
                        DenseNet121 je hlboká konvolučná neurónová sieť s 121 vrstvami usporiadanými do 4 dense blokov.<br/>
                        Vyznačuje sa hustými spojeniami medzi vrstvami, čo zlepšuje tok informácií.<br/>
                        Táto architektúra podporuje opätovné použitie vlastností (feature reuse) a zmierňuje problém miznúceho gradientu, čo umožňuje trénovanie hlbokých sietí.<br/>
                    </Typography>
                    <video width="100%" autoPlay loop muted>
                    <source src={`http://${window.location.hostname}:5000/video/densenet`} type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>
                </Card>


                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                        ResNet 50
                    </Typography>
                    <Typography variant="body1" paragraph>
                        ResNet50 je hlboká konvolučná neurónová sieť s 50 vrstvami.<br/>
                        Využíva reziduálne spojenia, ktoré pomáhajú riešiť problém miznúceho gradientu.<br/>
                        Reziduálne bloky pridávajú vstupy priamo k výstupom vrstiev, čo umožňuje sieti učiť sa reziduálne funkcie.<br/>
                    </Typography>
                    <video width="100%" autoPlay loop muted>
                    <source src={`http://${window.location.hostname}:5000/video/resnet`} type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>
                </Card>

                {/* Tlačidlo pre návrat na hlavnú stránku */}
                <Button
                    onClick={() => navigate("/")}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Späť na hlavnú stránku
                </Button>
            </Container>
        </Box>
    );
};

export default Architecture;
