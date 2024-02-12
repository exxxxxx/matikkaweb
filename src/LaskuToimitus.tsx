import {ILaskutoimitus} from "./ILaskutoimitus.ts";
import {IMurtoluku} from "./IMurtoluku.ts";
import {Murtoluku} from "./Murtoluku.tsx";
import {Operaattori} from "./Operaattori.tsx";

export function LaskuToimitus(props: { lasku: ILaskutoimitus, laskuMuuttui: (lasku: ILaskutoimitus) => void }) {
  const {lasku, laskuMuuttui} = props;

  function lukuMuuttui(luku: IMurtoluku | ILaskutoimitus, vasen: boolean) {
    const uusiLasku = lasku.kloonaa();
    if (vasen) {
      uusiLasku.vasen = luku;
    } else {
      uusiLasku.oikea = luku;
    }
    laskuMuuttui(uusiLasku);
  }

  return (
    <>
      {lasku.vasen instanceof IMurtoluku && (
        <Murtoluku murtoluku={lasku.vasen} lukuMuttui={(lasku) => lukuMuuttui(lasku, true)}/>
      )}
      {lasku.vasen instanceof ILaskutoimitus && (
        <LaskuToimitus lasku={lasku.vasen} laskuMuuttui={(lasku) => lukuMuuttui(lasku, true)}/>
      )}
      <Operaattori tyyppi={lasku.operaattori}/>
      {lasku.oikea instanceof IMurtoluku && (
        <Murtoluku murtoluku={lasku.oikea} lukuMuttui={(lasku) => lukuMuuttui(lasku, false)}/>
      )}
      {lasku.oikea instanceof ILaskutoimitus && (
        <LaskuToimitus lasku={lasku.oikea} laskuMuuttui={(lasku) => lukuMuuttui(lasku, false)}/>
      )}
    </>
  )
}