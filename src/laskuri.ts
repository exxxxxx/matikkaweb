import {ILaskutoimitus} from "./ILaskutoimitus.ts";

export function selvitaVaihtoehdot(sallitutNumerot:number[], kaytetytIndeksit: number[], vaihtoehdot: number[][]) {
  for (let i = 0; i < sallitutNumerot.length; i++) {
    if (kaytetytIndeksit.indexOf(i) >= 0) {
      continue;
    }
    kaytetytIndeksit.push(i);

    if (kaytetytIndeksit.length < sallitutNumerot.length) {
      selvitaVaihtoehdot(sallitutNumerot, kaytetytIndeksit, vaihtoehdot);
    }
    else {
      vaihtoehdot.push(
        kaytetytIndeksit.map(indeksi => sallitutNumerot[indeksi])
      )
    }
    kaytetytIndeksit.pop();
  }
}

export function laskuri(vaihtoehdot: number[][], tulos:number, laskutoimitus:ILaskutoimitus):ILaskutoimitus[] {
  const oikeatRatkaisut = [];
  for (const vaihtoehto of vaihtoehdot) {
    laskutoimitus.tyhjenna();
    laskutoimitus.asetaLuvutLaskutoimitukseen([...vaihtoehto]);
    const laskettuTulos = laskutoimitus.laske();
    if (laskettuTulos !== undefined && Math.abs(laskettuTulos - tulos) < 0.0001) {
      oikeatRatkaisut.push(laskutoimitus.kloonaa());
    }
  }
  return oikeatRatkaisut;
}
