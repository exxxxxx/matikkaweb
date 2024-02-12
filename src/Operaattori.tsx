import {IOperaattori} from "./IOperaattori.tsx";
import {Box, Typography} from "@mui/material";

export function Operaattori(props: IOperaattori) {
  const {tyyppi} = props;

  return (
    <Box p={1} display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Typography variant="h6" component="div">
        {tyyppi == "plus" ? "+" : "-"}
      </Typography>
    </Box>
  )
}