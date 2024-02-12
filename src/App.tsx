import './App.css'
import {Box, Button, Divider, Paper, TextField, Typography, useTheme} from "@mui/material";
import {Add, Calculate, Remove} from "@mui/icons-material";
import {useState} from "react";
import {ILaskutoimitus} from "./ILaskutoimitus.ts";
import {IMurtoluku} from "./IMurtoluku.ts";
import {laskuri, selvitaVaihtoehdot} from "./laskuri.ts";
import {Ratkaisut} from "./Ratkaisut.tsx";
import {Murtoluku} from "./Murtoluku.tsx";
import {LaskuToimitus} from "./LaskuToimitus.tsx";


const minSallitutNumerot = 4;
const maxSallitutNumerot = 10;

function App() {
  const theme = useTheme();
  const [naytaVastaukset, setNaytaVastaukset] = useState<boolean>(false);
  const [sallitutNumerot, setSallitutNumerot] = useState<number[]>([1,2,3,4,5,6]);
  const [lasku, setLasku] = useState<ILaskutoimitus>(
    new ILaskutoimitus(
      new IMurtoluku(),
      new ILaskutoimitus(
        new IMurtoluku(),
        new IMurtoluku(),
        "plus"
      ),
      "plus"
    )
  );
  const [tulos, setTulos] = useState<IMurtoluku>(new IMurtoluku(8,3));

  function sallituNumeroMuuttui(indeksi: number, arvo: number | undefined) {
    const uudetSallitutNumerot = [...sallitutNumerot];
    if (arvo !== undefined)
    {
      uudetSallitutNumerot[indeksi] = arvo;
      setSallitutNumerot(uudetSallitutNumerot);
    }
  }

  function laskuMuuttui(lasku:ILaskutoimitus) {
    setLasku(lasku.kloonaa());
  }

  function tulosMuttui(lasku:IMurtoluku) {
    setTulos(new IMurtoluku(lasku.osoittaja, lasku.nimittaja));
  }

  function lisaaSallittuja() {
    if (sallitutNumerot.length <= maxSallitutNumerot) {
      const uusiLasku = lasku.kloonaa();
      uusiLasku.lisaaOikeaLaskutoimitus();
      setLasku(uusiLasku);
      setSallitutNumerot(prevState => [...prevState,...[0,0]]);
    }
  }

  function poistaSallittuja() {
    if (sallitutNumerot.length > minSallitutNumerot) {
      const uusiLasku = lasku.kloonaa();
      uusiLasku.poistaOikeaLaskutoimitus();
      setLasku(uusiLasku);
      setSallitutNumerot(prevState => [...prevState].splice(0, prevState.length - 2));
    }
  }

  const kaikkiVaihtoehdot = [] as number[][];
  selvitaVaihtoehdot(sallitutNumerot, [], kaikkiVaihtoehdot);

  let onkoOikein = false;
  // let sallitutNumerotTaytetty = sallitutNumerot.filter(numero => numero !== undefined && numero > 0)
  // let ratkaisunNumerotTaytetty = lasku.keraaLuvut().length === sallitutNumerot.length;
  let oikeatNumerotKaytossa = false;


  const laskunTulos = lasku.laske();
  const laskettuTulos = tulos.laske();

  let oikeatVastaukset:ILaskutoimitus[] = [];
  if (laskettuTulos !== undefined) {
    oikeatVastaukset = laskuri(kaikkiVaihtoehdot, laskettuTulos, lasku.kloonaa());

    if (laskunTulos !== undefined && Math.abs(laskunTulos - laskettuTulos) < 0.0001) {
      onkoOikein = true;
    }

    const kaytetytLuvut = lasku.keraaLuvut();
    if (sallitutNumerot.length === kaytetytLuvut.length) {
      kaytetytLuvut.sort();
      const jarjestetytNumerot = [...sallitutNumerot].sort();
      for (let i = 0; i < jarjestetytNumerot.length; i++) {
        if (kaytetytLuvut[i] !== jarjestetytNumerot[i]) {
          break;
        }
      }

      oikeatNumerotKaytossa = true;
    }
  }

  const valmiina = laskunTulos !== undefined
    && laskettuTulos !== undefined
    && sallitutNumerot.every(numero => Number(numero));

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box display={"flex"} flexDirection={"column"}>
        <Paper elevation={4} sx={{backgroundColor:theme.palette.primary.main, color:theme.palette.primary.contrastText}}>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
            Murtolaskuri
          </Typography>
        </Paper>
      </Box>
      <Box p={4}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Lisää sallitut numerot ja tulos.
        </Typography>
      </Box>
      <Divider />
      <Box p={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Typography variant="h6" component="div">Sallitut numerot:</Typography>
          <Box>
            <Box p={2}>
              {sallitutNumerot && sallitutNumerot.map((numero, indeksi) => (
                <TextField sx={{width:"30pt", margin:"2pt"}} defaultValue={numero !== 0 ? numero : undefined}
                  onChange={event => sallituNumeroMuuttui(indeksi, Number(event.target.value))}
                />
              ))}
            </Box>
            {`${kaikkiVaihtoehdot.length} vaihtoehtoa`}
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <Button variant={"contained"} startIcon={<Add />} sx={{margin:"2px"}}
                    onClick={() => lisaaSallittuja()}
                    disabled={sallitutNumerot.length >= maxSallitutNumerot}
            >Lisää</Button>
            <Button variant={"contained"} startIcon={<Remove />} sx={{margin:"2pt"}}
                    onClick={() => poistaSallittuja()}
                    disabled={sallitutNumerot.length <= minSallitutNumerot}
            >Poista</Button>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box p={4} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
        <Box p={4} display={"flex"} justifyContent={"center"}>
          <LaskuToimitus lasku={lasku} laskuMuuttui={laskuMuuttui} />

          <Box p={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Typography variant="h6" component="div">=</Typography>
            <Murtoluku murtoluku={tulos} lukuMuttui={tulosMuttui} />
          </Box>
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {!oikeatNumerotKaytossa && (
            <Typography variant={"h5"} color={theme.palette.error.main}>Tarkista että käytät oikeita numeroita!</Typography>
          )}
          {valmiina && (
            <Typography variant={"h5"} color={onkoOikein ? theme.palette.primary.main : theme.palette.error.main}>{onkoOikein ? "Oikein meni!" : "Yritä uudestaan!"}</Typography>
          )}
        </Box>
      </Box>
      <Divider />
      {valmiina && (
        <>
          <Box p={2} display={"flex"} justifyContent={"center"}>
            <Button variant={"contained"} endIcon={<Calculate />} sx={{margin:"2px"}}
                    onClick={() => setNaytaVastaukset(vanhaArvo => !vanhaArvo)}
            >{!naytaVastaukset ? "Näytä vastaukset" : "Piilota vastaukset"}</Button>
          </Box>
          {naytaVastaukset && (
            <Ratkaisut laskuPohja={lasku} oikeatVastaukset={oikeatVastaukset} vaihtoehdot={kaikkiVaihtoehdot} />
          )}
        </>
      )}
    </Box>

  )
}

export default App
