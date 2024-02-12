import {IMurtoluku} from "./IMurtoluku.ts";
import {Box, TextField} from "@mui/material";

export function Murtoluku(props: { murtoluku: IMurtoluku, lukuMuttui: (luku: IMurtoluku) => void }) {
  const {murtoluku} = props;

  function lukuMuuttui(osoittaja: number | undefined, nimittaja: number | undefined) {
    props.lukuMuttui(new IMurtoluku(osoittaja, nimittaja));
  }

  return (
    <Box p={1} display={"flex"} justifyContent={"center"} alignItems={"center"}>
      {/*<TextField sx={{width:"30pt"}} defaultValue={murtoluku.kokonaisluku} />*/}
      <Box p={1}>
        <TextField sx={{width: "30pt"}} defaultValue={murtoluku.osoittaja} onChange={event => {
          lukuMuuttui(Number(event.target.value), murtoluku.nimittaja)
        }}/>
        <hr/>
        <TextField sx={{width: "30pt"}} defaultValue={murtoluku.nimittaja} onChange={event => {
          lukuMuuttui(murtoluku.osoittaja, Number(event.target.value))
        }}/>
      </Box>
    </Box>
  )
}