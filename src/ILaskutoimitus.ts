import {IMurtoluku} from "./IMurtoluku.ts";

export class ILaskutoimitus {
  constructor(
    public vasen: IMurtoluku | ILaskutoimitus,
    public oikea: IMurtoluku | ILaskutoimitus,
    public operaattori: "plus" | "miinus"
  ) {
  }

  public kloonaa(): ILaskutoimitus {
    let uusiVasen: IMurtoluku | ILaskutoimitus;
    let uusiOikea: IMurtoluku | ILaskutoimitus;
    if (this.vasen instanceof IMurtoluku) {
      uusiVasen = new IMurtoluku(this.vasen.osoittaja, this.vasen.nimittaja);
    } else {
      uusiVasen = this.vasen.kloonaa();
    }
    if (this.oikea instanceof IMurtoluku) {
      uusiOikea = new IMurtoluku(this.oikea.osoittaja, this.oikea.nimittaja);
    } else {
      uusiOikea = this.oikea.kloonaa();
    }
    return new ILaskutoimitus(
      uusiVasen,
      uusiOikea,
      this.operaattori
    );
  }

  public asetaLuvutLaskutoimitukseen(jaljellaOlevatNumerot: number[]) {
    if (this.vasen instanceof IMurtoluku) {
      this.vasen.osoittaja = jaljellaOlevatNumerot.pop();
      this.vasen.nimittaja = jaljellaOlevatNumerot.pop();
    } else {
      this.vasen.asetaLuvutLaskutoimitukseen(jaljellaOlevatNumerot);
    }
    if (this.oikea instanceof IMurtoluku) {
      this.oikea.osoittaja = jaljellaOlevatNumerot.pop();
      this.oikea.nimittaja = jaljellaOlevatNumerot.pop();
    } else {
      this.oikea.asetaLuvutLaskutoimitukseen(jaljellaOlevatNumerot);
    }
  }

  public lisaaOikeaLaskutoimitus() {
    if (this.oikea instanceof ILaskutoimitus) {
      this.oikea.lisaaOikeaLaskutoimitus();
    } else {
      const vanhaOikeaMurtoluku = this.oikea;
      this.oikea = new ILaskutoimitus(
        vanhaOikeaMurtoluku,
        new IMurtoluku(),
        "plus"
      );
    }
  }

  public poistaOikeaLaskutoimitus() {
    if (this.oikea instanceof ILaskutoimitus) {
      if (this.oikea.oikea instanceof ILaskutoimitus) {
        this.oikea.poistaOikeaLaskutoimitus();
      } else {
        const vanhaOikeaMurtoluku = this.oikea.oikea;
        this.oikea = vanhaOikeaMurtoluku
      }
    }
  }

  public laske(): number | undefined {
    let vasenLuku;
    if (this.vasen instanceof ILaskutoimitus) {
      vasenLuku = this.vasen.laske();
    } else {
      vasenLuku = this.vasen.laske();
    }
    let oikeaLuku;
    if (this.oikea instanceof ILaskutoimitus) {
      oikeaLuku = this.oikea.laske();
    } else {
      oikeaLuku = this.oikea.laske();
    }

    if (vasenLuku === undefined || oikeaLuku === undefined) {
      return undefined;
    }

    if (this.operaattori == "plus") {
      return vasenLuku + oikeaLuku;
    } else {
      return vasenLuku - oikeaLuku;
    }
  }


  public keraaLuvut(): number[] {
    const luvut: number[] = [];
    if (this.vasen instanceof ILaskutoimitus) {
      for (const luku of this.vasen.keraaLuvut()) {
        luvut.push(luku);
      }
    } else {
      if (this.vasen.osoittaja) {
        luvut.push(this.vasen.osoittaja);
      }
      if (this.vasen.nimittaja) {
        luvut.push(this.vasen.nimittaja);
      }
    }
    if (this.oikea instanceof ILaskutoimitus) {
      for (const luku of this.oikea.keraaLuvut()) {
        luvut.push(luku);
      }
    } else {
      if (this.oikea.osoittaja) {
        luvut.push(this.oikea.osoittaja);
      }
      if (this.oikea.nimittaja) {
        luvut.push(this.oikea.nimittaja);
      }
    }

    return luvut;
  }

  public tyhjenna() {
    if (this.vasen instanceof ILaskutoimitus) {
      this.vasen.tyhjenna();
    } else {
      this.vasen.osoittaja = undefined;
      this.vasen.nimittaja = undefined;
    }
    if (this.oikea instanceof ILaskutoimitus) {
      this.oikea.tyhjenna();
    } else {
      this.oikea.osoittaja = undefined;
      this.oikea.nimittaja = undefined;
    }
  }

  public toString() {
    let teksti = '';
    if (this.vasen instanceof ILaskutoimitus) {
      teksti += this.vasen.toString();
    } else {
      teksti += `${this.vasen.osoittaja}/${this.vasen.nimittaja}`
    }
    teksti += ` ${this.operaattori == "plus" ? "+" : "-"} `;
    if (this.oikea instanceof ILaskutoimitus) {
      teksti += this.oikea.toString();
    } else {
      teksti += `${this.oikea.osoittaja}/${this.oikea.nimittaja}`
    }
    return teksti;
  }
}