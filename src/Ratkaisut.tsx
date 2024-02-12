import {ILaskutoimitus} from "./ILaskutoimitus.ts";
import {Box, Typography, useTheme} from "@mui/material";

export function Ratkaisut(props: { laskuPohja: ILaskutoimitus, oikeatVastaukset: ILaskutoimitus[], vaihtoehdot: number[][] }) {
  const theme = useTheme();
  const {laskuPohja, oikeatVastaukset, vaihtoehdot} = props;

  return (
    <Box>
      <Typography variant={"h5"}>Oikeat Ratkaisut:</Typography>
      {oikeatVastaukset.length <= 0 && (
        <Typography variant={"h6"} color={theme.palette.error.main}>
          Annetuilla sallituilla numeroilla ja tuloksella ei löydy ratkaisuja!
        </Typography>
      )}
      {oikeatVastaukset.length > 0 && oikeatVastaukset.map((vastaus) => {
        return (
          <Box>
            {vastaus.toString()}
          </Box>
        );
      })}
      <br />
      <Typography variant={"h5"}>Kaikki arvaukset:</Typography>
      {vaihtoehdot.map((vastaus) => {
        const lasku = laskuPohja.kloonaa();
        lasku.tyhjenna();
        lasku.asetaLuvutLaskutoimitukseen([...vastaus]);
        return (
          <Box>
            {lasku.toString()}
          </Box>
        );
      })}
    </Box>
  )
}