import { Typography, Container, Card, Button, Box, Menu, MenuItem, IconButton, Tabs, Tab, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import axios from 'axios';
import UploadSection from './UploadSection';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useRef } from "react";


const Final = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [file, setFile] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [value, setValue] = useState(0);

    const [openPicker, setOpenPicker] = useState(false);
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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
      const handleUpload = async () => {
        if (!file) {
          setPrediction('Prosím vyberte obrázok!');
          return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
          const backendUrlPredict = `http://${window.location.hostname}:5000/predict`;
          const response = await axios.post(backendUrlPredict, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          // Nastavenie predikcie, ktorá príde zo servera
          setPrediction(response.data);  //
        } catch (error) {
          setPrediction('Chyba pri predikcii.');
        }
      };
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      const handleDefaultImageSelect = async (imgPath) => {
        const response = await fetch(imgPath);
        const blob = await response.blob();
        const file = new File([blob], "default.jpg", { type: blob.type });
        setFile(file);
        setOpenPicker(false);
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
            <Card sx={{ mt: 4, p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        color: "#00bcd4",
                        fontWeight: "bold"
                      }}
                    >
                    Klasifikácia: Inteligentný diagnostický nástroj
                </Typography>

                <Typography variant="body1" paragraph>
                Vitajte v poslednom kroku našej cesty svetom umelej inteligencie a spracovania obrazu! V tejto sekcii môžete využiť silu natrénovaného modelu AI na klasifikáciu kožných lézií.
                </Typography>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                        Využite silu AI: Predikcia diagnózy kožných lézií
                    </Typography>
                    <Typography variant="body1" paragraph align="left">
                    V tejto sekcii môžete využiť výsledok rozsiahleho výskumu a vývoja: inteligentný model AI schopný predikovať diagnózu kožných lézií. 
                    Tento model vznikal dlhú dobu ako súčasť diplomovej práce a dosahuje pozoruhodnú presnosť predikcií: 94%.
                    </Typography>
                    <Typography variant="body1" paragraph align="left">
                    Jeho inteligencia nie je náhodná. Bol trénovaný s využitím technológií a konceptov, ktoré ste mali možnosť preskúmať v tejto webovej aplikácii: 
                    od základných stavebných kameňov neurónových sietí, cez špecializované architektúry pre analýzu obrazu (CNN), až po techniky predprípravy dát a extrakcie relevantných vlastností.
                    </Typography>
                    <Typography variant="body1" paragraph align="left">
                    Vďaka starostlivému návrhu, rozsiahlemu tréningu a dôkladnému overovaniu, tento model demonštruje, ako efektívne možno aplikovať princípy umelej inteligencie a spracovania obrazu na komplexné úlohy, akou je klasifikácia medicínskych obrazových dát.
                    </Typography>
                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                    Ako sme sa sem dostali? Cesta k inteligentnej klasifikácii:
                    </Typography>
                    <Typography variant="body1" paragraph align="left">
                    Naša aplikácia vás previedla kľúčovými konceptmi, ktoré umožňujú tomuto kroku:
                    <ul>
                        <li><strong>Neuróny</strong><br></br>  Začali sme pri samotných základoch – biologických a umelých neurónoch. Pochopili ste, ako tieto základné stavebné jednotky prijímajú, spracúvajú a odosielajú informácie, inšpirujúc tak vznik komplexnejších systémov.</li>
                        <li><strong>Aktivačné funkcie</strong><br></br> Následne sme preskúmali aktivačné funkcie, ktoré zavádzajú nelinearitu do neurónových sietí a umožňujú im učiť sa zložité vzory v dátach. Bez nich by naša AI nedokázala rozpoznať jemné detaily v obrazoch kožných lézií.</li>
                        <li><strong>Neurónové siete</strong><br></br> Pokračovali sme k celým neurónovým sieťam, ich vrstvovej štruktúre a procesu učenia. Získali ste prehľad o tom, ako sa prepájajú jednotlivé neuróny a ako sa sieť trénuje na rozsiahlych dátach.</li>
                        <li><strong>Architektúra neurónových sietí </strong><br></br> Ponorili sme sa do rôznych architektúr neurónových sietí, pričom sme sa zamerali na tie, ktoré sú najvhodnejšie pre spracovanie obrazu, ako sú Konvolučné neurónové siete (CNN).</li>                    
                        <li><strong>Konvolúcia </strong><br></br> Detailne sme preskúmali konvolúciu, kľúčovú operáciu v CNN, ktorá umožňuje sieti "vidieť" a extrahovať dôležité vlastnosti z obrazov rozložením na menšie detaily.</li>   
                        <li><strong>Filtre </strong><br></br> Experimentovali ste s rôznymi filtrami na odstránenie šumu a zlepšenie kvality obrazu, čo je zásadné pre presnú analýzu medicínskych snímok.</li> 
                        <li><strong>Prahovanie </strong><br></br> Pochopili ste techniky prahovania, ktoré zjednodušujú obrazy a môžu pomôcť pri segmentácii a izolácii podozrivých oblastí.</li> 
                        <li><strong>Detekcia hrán </strong><br></br> Skúmali sme algoritmy na detekciu hrán, ako sú Cannyho a Sobelov operátor, ktoré pomáhajú identifikovať obrysy a štruktúry v obrazoch, čo je dôležité pre analýzu tvaru lézií.</li> 
                    </ul>
                    </Typography>
                </Card>

                <Card sx={{ mt: 4, p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
              
                <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                    Predikcia diagnózy kožných lézií
                </Typography>
                <Typography variant="body1" paragraph align="left">
                    Naša aplikácia vás previedla kľúčovými konceptmi, ktoré umožňujú tomuto kroku:
                    <ul>
                        <li><strong>Nahrajte obrázok: </strong><br></br> Vyberte a nahrajte jasný a detailný obrázok kožnej lézie, ktorú chcete analyzovať.</li>
                        <li><strong>Získajte predikciu: </strong><br></br> Náš model AI na serveri spracuje váš obrázok a vráti vám predikovanú diagnózu, spolu s mierou istoty.</li>
                    </ul>
                    </Typography> 
                                  
                    <UploadSection
                    handleFileChange={handleFileChange}
                    openPicker={openPicker}
                    setOpenPicker={setOpenPicker}
                    handleDefaultImageSelect={handleDefaultImageSelect}
                    />

                    <Button variant="contained" color="secondary" onClick={handleUpload} fullWidth sx={{ mt: 2 }} >Nahrať a predikovať</Button>
                    {prediction && (
                    <div>
                        <p>Predikcia: {prediction.label}</p>
                        <p>Istota: {(prediction.confidence * 100).toFixed(2)}%</p>
                    </div>
                    )}

                    <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    textColor="inherit" // 
                    TabIndicatorProps={{
                        style: { backgroundColor: 'white' }, //
                    }}
                    >
                    <Tab label="AKIEC" />
                    <Tab label="BCC" />
                    <Tab label="BKL" />
                    <Tab label="DF" />
                    <Tab label="MEL" />
                    <Tab label="NV" />
                    <Tab label="VASC" />
                </Tabs>

                {/* Obsah tabov */}
                {value === 0 && <TabPanel> <strong>Aktinická keratóza </strong><br></br> Drsná, šupinatá škvrna na koži, ktorá vzniká v dôsledku dlhodobého vystavenia slnku. Považuje sa za predrakovinový stav a môže sa vyvinúť do spinocelulárneho karcinómu.</TabPanel>}
                {value === 1 && <TabPanel> <strong>Bazocelulárny karcinóm </strong><br></br> Najčastejší typ rakoviny kože, ktorý začína v bazálnych bunkách. Zvyčajne rastie pomaly a zriedka sa šíri do iných častí tela. Často sa objavuje ako mierne perleťová hrčka alebo vriedok, ktorý sa nehojí.</TabPanel>}
                {value === 2 && <TabPanel> <strong>Benígna keratóza </strong><br></br> Nerakovinové útvary, ktoré môžu vyzerať ako materské znamienka, bradavice alebo iné kožné lézie. Sú neškodné a nepovažujú sa za rakovinu kože</TabPanel>}
                {value === 3 && <TabPanel> <strong>Dermatofibróm </strong><br></br> Bežný, neškodný fibrózny kožný uzlík, ktorý sa zvyčajne nachádza na nohách, ale môže sa objaviť kdekoľvek na tele.</TabPanel>}
                {value === 4 && <TabPanel> <strong>Melanóm</strong><br></br>  Najnebezpečnejší typ rakoviny kože, ktorý vzniká z melanocytov (buniek produkujúcich pigment). Môže sa vyvinúť z existujúceho materského znamienka alebo sa objaviť ako nová pigmentovaná alebo nezvyčajne vyzerajúca lézia. Včasné odhalenie je kľúčové pre úspešnú liečbu.</TabPanel>}
                {value === 5 && <TabPanel> <strong>Melanocytové névy</strong><br></br>  Bežný, zvyčajne neškodný kožný výrastok tvorený melanocytmi. Väčšina materských znamienok je benígna, ale niektoré typy môžu mať vyššie riziko premeny na melanóm. Zmeny vo veľkosti, tvare, farbe alebo iných vlastnostiach materského znamienka by mal skontrolovať lekár</TabPanel>}
                {value === 6 && <TabPanel> <strong>Vaskulárne lézie</strong><br></br>  Nezhubné výrastky tvorené abnormálnymi krvnými cievami. Patria sem rôzne typy, ako sú hemangiómy alebo cievne malformácie, ktoré sú zvyčajne neškodné.</TabPanel>}
                    
                
                </Card>

                <Card sx={{ p: 4, bgcolor: "#111", color: "white", borderRadius: 2, textAlign: "center", mb: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ borderBottom: "2px solid #00bcd4", display: "inline-block", pb: 1 }}>   
                    Dôležité upozornenie
                    </Typography>
                    <Typography variant="body1" paragraph>
                    Používajte túto aplikáciu ako interaktívny nástroj na pochopenie princípov umelej inteligencie v oblasti rozpoznávania medicínskych snímok. 
                    Výsledky predikcie, ktoré vám táto aplikácia poskytne, sú len orientačné a nemali by byť v žiadnom prípade považované za lekársku diagnózu.
                    </Typography>
                    <Typography variant="body1" paragraph>
                    Hoci náš model AI dosahuje vysokú presnosť, ide o demonštráciu technológie a jej potenciálu. 
                    Skutočná lekárska diagnostika si vyžaduje komplexné posúdenie kvalifikovaným lekárom, ktorý zohľadní anamnézu pacienta, fyzikálne vyšetrenie a ďalšie relevantné informácie.
                    </Typography>
                    <Typography variant="body1" paragraph>
                    Nikdy nepoužívajte výsledky tejto aplikácie ako náhradu za konzultáciu so zdravotníckym pracovníkom. 
                    Ak máte akékoľvek obavy o svoje zdravie alebo pozorujete zmeny na koži, bezodkladne kontaktujte kvalifikovaného lekára. 
                    Len odborné lekárske vyšetrenie môže poskytnúť presnú diagnózu a určiť vhodnú liečbu.
                    </Typography>
                </Card>

                

                {/* Tlačidlo pre návrat na hlavnú stránku */}
                <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => {
                            window.scrollTo(0, 0);
                            navigate("/edges");
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
                        onClick={() => navigate("/")}
                    >
                        Ďalej
                    </Button>
                </Stack>

            </Container>
        </Box>
        
    );
};
function TabPanel({ children }) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    );
  }
  
export default Final;
