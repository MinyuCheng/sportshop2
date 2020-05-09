export class Product {
  static filter(arg0: (product: any) => boolean) {
    throw new Error("Method not implemented.");
  }
  constructor(
    public id?: number,
    public name?: string,
    public category?: string,
    public description?: string,
    public price?: number
  ) {}
}
