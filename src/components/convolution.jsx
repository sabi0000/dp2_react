import { Typography, Container, Card, Button, Box, Menu, MenuItem, IconButton} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { RotatingLines } from 'react-loader-spinner'; // Import the loading spinner

const Convolution= () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [file, setFile] = useState(null);
    const open = Boolean(anchorEl);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [convVideo, setConvVideo] = useState("");
    
    

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

    const handleConvFileUpload = async (event) => {
      event.preventDefault();
      if (!file) return;
  
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const backendUrl = `http://${window.location.hostname}:5000/conv_upload`;
        const response = await fetch(backendUrl, {
          method: "POST",
          body: formData,
          credentials: "include"
        });
  
        if (response.ok) {
          alert("Obrázok úspešne nahraný!");
        } else {
          alert("Chyba pri nahrávaní obrázka.");
        }
      } catch (error) {
        console.error("Chyba:", error);
      }
    };

    const handleConvRendering = async () => {
      setIsLoading(true); // Set loading to true
      setConvVideo(null);
      const backendUrlnetworkRendering = `http://${window.location.hostname}:5000/conv_rendering`;
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
          showConvVideo();// Call to show the video after rendering
      })
      .catch((err) => console.error("Network error:", err))
      .finally(() => {
          setIsLoading(false); // Set loading to false after rendering
      });
      alert("Renderovanie začalo.");
  };

  const showConvVideo = () => {
    setTimeout(() => {
        const backendUrlConvVideo = `http://${window.location.hostname}:5000/video/conv_user`;
        setConvVideo(backendUrlConvVideo);
    }, 5);
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
                {/* Úvodná karta */}
                <Card sx={{ mt: 4, p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        color: "#00bcd4",
                        fontWeight: "bold"
                      }}
                    >
                    Konvolúcia: Ako neurónové siete vidia obrázky
                </Typography>
                    <Typography variant="body1" paragraph>
                      Konvolúcia je základná operácia v konvolučných neurónových sieťach CNN, ktoré sa používajú na spracovanie obrazových dát. Predstavte si konvolúciu ako špeciálny filter, ktorý sa posúva cez obrázok a hľadá v ňom určité vzory.
                    </Typography>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                      Princíp konvolúcie
                    </Typography>
                    <Typography variant="body1" paragraph align="left">
                        <strong>Filter:</strong> Konvolúcia používa malý filter (maticu čísel), ktorý sa nazýva aj kernel.<br/>
                        <strong>Posúvanie:</strong> Filter sa posúva cez obrázok, bod po bode.<br/>
                        <strong>Výpočet: </strong> V každom bode sa hodnoty filtra násobia s hodnotami pixelov pod filtrom a výsledky sa sčítajú.<br/>
                        <strong>Výstup: </strong> Výsledok sčítania je nová hodnota pixelu vo výstupnom obrázku 
                    </Typography>
                    <video width="100%" autoPlay loop muted>
                        <source src={`http://${window.location.hostname}:5000/video/matrix`} type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>

                    <Typography variant="body1" paragraph align="left" sx={{ mt: 3 }}>
                    Navštívte našu interaktívnu konvolučnú kalkulačku a experimentujte s konvolúciou na vlastných dátach.
                    </Typography>

                    <Typography variant="body1" paragraph>
                    Kliknite na tlačidlo a vyskúšajte si konvolučnú kalkulačku
                    </Typography>

                    <Button 
                    type="submit" 
                    href="/calc" 
                    variant="contained" 
                    color="primary"
                    sx={{ mt: 3 }}  // ← Toto ho posunie nižšie
                  >
                    Konvolučná kalkulačka
                  </Button>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                      Prečo je konvolúcia užitočná?
                    </Typography>
                    <Typography variant="body1" paragraph align="left">
                      <strong>Rozklad na detaily:</strong> Konvolúcia rozkladá obrázok na menšie, ľahšie spracovateľné detaily, ako sú hrany, textúry a tvary.<br/>
                      <strong>Extrahovanie vlastností: </strong> Konvolúcia pomáha extrahovať dôležité vlastnosti z obrázkov, ako sú hrany, textúry a tvary.<br/>
                      <strong>Rozpoznávanie vzorov: </strong> Rôzne filtre môžu detekovať rôzne vzory v obrázkoch.<br/>
                      <strong>Zmenšenie rozmerov:</strong> Konvolúcia môže zmenšiť rozmery obrázka, čo znižuje výpočtovú náročnosť.<br/>
                    </Typography>
                    <video width="100%" autoPlay loop muted>
                    <source src={`http://${window.location.hostname}:5000/video/conv_example`} type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>
                </Card>


                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>
                      Konvolučná vizualizácia
                    </Typography>

                    <Typography variant="body1" paragraph>
                    Táto aplikácia vám umožní nahrať vlastný obrázok a vizualizovať, ako konvolučná operácia rozkladá obraz na menšie detaily. Sledujte, ako sa aplikuje filter na váš obrázok a ako sa vytvárajú jednotlivé snímky videa, ktoré ukazujú postupný rozklad obrázka.
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                        <strong>Nahratie obrázka: </strong>Nahrajte svoj vlastný obrázok, ktorý chcete spracovať.<br/>
                        <strong>Výber filtra </strong>Vyberte si konvolučný filter (kernel), ktorý chcete použiť.<br/>
                        <strong>Vytvorenie videa: </strong>Aplikácia automaticky aplikuje konvolučný filter na váš obrázok a vygeneruje video, ktoré zobrazuje postupný rozklad obrázka.<br/>
                        <strong>Prehrávanie videa: </strong>Prehrajte video a sledujte, ako sa konvolúcia rozkladá na váš obrázok.<br/>
                    </Typography>
                    <Box component="form" onSubmit={handleConvFileUpload} sx={{ mb: 3 }}>
                      <Typography variant="subtitle1">Vyberte obrázok:</Typography>
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        accept="image/*"
                        required
                        style={{ marginBottom: "10px" }}
                      />
                      <Button type="submit" variant="contained" color="primary" fullWidth>Upload Image</Button>
                    </Box>
                    <Button variant="contained" color="secondary" onClick={handleConvRendering} fullWidth sx={{ mt: 2 }}>
                        Spustiť rendering
                    </Button>
                    <Button onClick={showConvVideo} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                        Show video
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

                    {convVideo && (
                        <Box sx={{ mt: 3 }}>
                            <video width="100%" controls>
                                <source src={convVideo} type="video/mp4" />
                            </video>
                        </Box>
                    )}
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

export default Convolution;
