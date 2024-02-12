export class IMurtoluku {
  constructor(
    public osoittaja?: number,
    public nimittaja?: number
  ) {
  }

  public laske(): number | undefined {
    //Ei pidä paikkaansa
    if (!this.nimittaja || !this.osoittaja) {
      return undefined;
    }
    return this.osoittaja / this.nimittaja;
  }
}