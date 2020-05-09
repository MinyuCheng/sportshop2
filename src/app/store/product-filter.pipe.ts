import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "../model/product.model";

Pipe({
  name: "filter",
});

export class ProdcutFilterPipe implements PipeTransform {
  transform(Products: Product[], searchTerm: string): product[] {
    if (!Products) {
      return [];
    }
    if (!searchTerm) {
        return Products;
    }
    searchTerm=searchTerm.toLowerCase();
    return Products.filter(
      Products) => {
        return Products.toLowerCase().includes(searchTerm)
  }
  
  constructor(){}
  ngOnInit() {}
}

