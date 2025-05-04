import { Typography, Container, Card, Button, Box, Menu, MenuItem, IconButton, Stack,Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
                    <Accordion
                        sx={{
                        backgroundColor: "#222",
                        color: "white",
                        boxShadow: "none",
                        borderRadius: 2,
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
                        <Typography variant="subtitle1">Zobraziť viac informácií</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography variant="body1" align="left">
                            <strong>Konvolučná vrstva (Convolutional Layer): </strong><br />
                            Táto vrstva je základným stavebným kameňom CNN. Aplikuje sadu naučiteľných filtrov (kernelov) na vstupný obraz. <br />
                            Každý filter sa posúva po šírke a výške obrazu (konvolvuje) a vypočítava bodový súčin medzi hodnotami filtra a malou časťou vstupného obrazu (receptívnym poľom). <br />
                            Výsledkom je tzv. "feature map" (mapa vlastností), ktorá reprezentuje detekciu špecifickej vlastnosti (napr. horizontálnej hrany, určitej textúry) v rôznych častiach obrazu. <br />
                            Jedna konvolučná vrstva zvyčajne obsahuje viacero filtrov, takže vytvára viacero máp vlastností.
                            <br /><br />
                            <strong>Flatten vrstva: </strong><br />
                            Ako môžete vidieť v animácii, pred prechodom do plne prepojených vrstiev (dense layer) sa viacrozmerné mapy vlastností z poslednej konvolučnej/poolingovej vrstvy transformujú na jednorozmerný vektor. <br />
                            Toto "sploštenie" pripravuje dáta pre klasifikačné alebo regresné úlohy.
                            <br /><br />
                            <strong>Plne prepojená vrstva (Dense Layer:)</strong><br />
                            Tieto vrstvy sú rovnaké ako vrstvy v štandardných viacvrstvových perceptrónoch (MLP). <br />
                            Každý neurón v dense vrstve je prepojený so všetkými neurónmi v predchádzajúcej vrstve. <br />
                            V CNN sa dense vrstvy zvyčajne používajú na konci siete na vykonanie finálnej klasifikácie alebo regresie na základe extrahovaných vlastností.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <video width="100%" autoPlay loop muted style={{ marginTop: 16 }}>
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
                    <Accordion
                        sx={{
                        backgroundColor: "#222",
                        color: "white",
                        boxShadow: "none",
                        borderRadius: 2,
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
                        <Typography variant="subtitle1">Zobraziť viac informácií</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography variant="body1" align="left">
                            <strong>Dense bloky (Dense Blocks): </strong><br />
                            V rámci každého dense bloku je každý jeden layer priamo prepojený so všetkými nasledujúcimi layermi. <br />
                            Namiesto toho, aby sa výstup jedného layeru posielal len do nasledujúceho, je konkatenovaný s výstupmi všetkých predchádzajúcich layerov v danom bloku a slúži ako vstup pre každý nasledujúci layer. <br />
                            Táto hustá konektivita podporuje opätovné použitie vlastností (feature reuse), pretože naučené vlastnosti sú prístupné pre mnoho nasledujúcich vrstiev.
                            <br /><br />
                            <strong>Prechodové vrstvy (Transition Layers): </strong><br />
                            Medzi jednotlivými dense blokmi sa nachádzajú prechodové vrstvy. <br />
                            Ich hlavnou úlohou je zmenšiť priestorové rozmery máp vlastností (zvyčajne pomocou poolingovej vrstvy) a znížiť počet filtrov (pomocou konvolučnej vrstvy s 1x1 kernelom). <br />
                            Týmto spôsobom pomáhajú riadiť výpočtovú náročnosť siete a zabezpečujú efektívnejší prechod medzi blokmi.
                            <br /><br />
                            <strong>Globálne priemerné pooling (Global Average Pooling):</strong><br />
                            Po poslednom dense bloku a prechodovej vrstve nasleduje globálne priemerné pooling. <br />
                            Táto operácia zredukuje každú mapu vlastností na jedinú číselnú hodnotu vypočítaním jej priemerných hodnôt. <br />
                            Tým sa znižuje počet parametrov pred finálnou klasifikáciou a zvyšuje sa robustnosť modelu voči priestorovým posunom.
                            <br /><br />
                            <strong>Plne prepojená vrstva (FC1000):</strong><br />
                            Výstup z globálneho priemerného poolingu je následne poslaný do plne prepojenej (fully connected) vrstvy s 1000 výstupnými jednotkami (v prípade trénovania na datasete ImageNet, ktorý má 1000 tried). <br />
                            Táto vrstva vykonáva finálnu klasifikáciu. V našom prípade klasifikácie kožných lézií by táto posledná vrstva bola prispôsobená počtu tried (typov lézií).
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <video width="100%" autoPlay loop muted style={{ marginTop: 16 }}>
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
                    <Accordion
                        sx={{
                        backgroundColor: "#222",
                        color: "white",
                        boxShadow: "none",
                        borderRadius: 2,
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
                        <Typography variant="subtitle1">Zobraziť viac informácií</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography variant="body1" align="left">
                            <strong>Reziduálne bloky (Residual Blocks):</strong><br />
                            Základným stavebným kameňom ResNetu sú reziduálne bloky. Namiesto toho, aby sa každá vrstva učila priame mapovanie vstupov na výstupy, reziduálne bloky sa učia tzv. reziduálnu funkciu. <br />
                            To znamená, že sa učia, o koľko sa má výstup vrstvy líšiť od jej vstupu.
                            <br /><br />
                            <strong>Reziduálne spojenia (Residual Connections / Skip Connections): </strong><br />
                            Reziduálne bloky obsahujú skratkové spojenia (skip connections), ktoré presmerujú vstup bloku priamo na jeho výstup, pričom obchádzajú jednu alebo viacero vnútorných vrstiev (typicky konvolučné a normalizačné vrstvy). <br />
                            Výstup vnútorných vrstiev sa potom sčíta s pôvodným vstupom.
                            <br /><br />
                            <strong>Učenie reziduálnych funkcií:</strong><br />
                            Týmto mechanizmom sa vrstvy v reziduálnom bloku učia len "zvyšok" (rezíduum) informácií, ktoré je potrebné pridať k pôvodnému vstupu, aby sa dosiahol požadovaný výstup. <br />
                            Ak by optimálne mapovanie bolo identitou (výstup sa rovná vstupu), reziduálne vrstvy by sa jednoducho naučili nulu, čo uľahčuje trénovanie hlbokých sietí.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <video width="100%" autoPlay loop muted style={{ marginTop: 16 }}>
                    <source src={`http://${window.location.hostname}:5000/video/resnet`} type="video/mp4" />
                        Váš prehliadač nepodporuje prehrávanie videa.
                    </video>
                </Card>

                {/* Tlačidlo pre návrat na hlavnú stránku */}
                <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: "center" }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<ArrowBackIcon />}
                        // Tu si doplníš referenciu
                        onClick={() => navigate("/networks")}
                    >
                        Späť
                    </Button>

                    <Button
                        onClick={() => navigate("/")}
                        variant="outlined"
                        color="primary"
                        startIcon={<HomeIcon />}
                    >
                        Hlavná stránka
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                        endIcon={<ArrowForwardIcon />}
                        // Tu si doplníš referenciu
                        onClick={() => navigate("/convolution")}
                    >
                        Ďalej
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default Architecture;
