import { Component, OnInit, Input, NgModule } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";
import { Cart } from "../model/cart.model";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Pipe, PipeTransform } from "@angular/core";

@Component({
  selector: "store",
  templateUrl: "store.component.html",
})
export class StoreComponent {
  public selectedCategory = null;
  public productsPerPage = 4;
  public selectedPage = 1;
  searchTerm: string;
  constructor(
    private repository: ProductRepository,
    private cart: Cart,
    private router: Router
  ) {}

  get products(): Product[] {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.repository
      .getProducts(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.productsPerPage);
  }

  get categories(): string[] {
    return this.repository.getCategories();
  }

  changeCategory(newCategory?: string) {
    this.selectedCategory = newCategory;
    this.changePage(1);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageNumbers(): number[] {
    const products = this.repository.getProducts(this.selectedCategory);
    const pages = products.length / this.productsPerPage;
    const pageCount = Math.ceil(pages);
    const pageNumbers = Array(pageCount)
      .fill(0)
      .map((x, i) => i + 1);
    return pageNumbers;
  }

  addProductToCart(product: Product) {
    this.cart.addLine(product);
    this.router.navigateByUrl("/cart");
  }
}

Pipe({
  name: "filter",
});

export class ProdcutFilterPipe implements PipeTransform {
  transform(Products: Product[], searchTerm: string): Product[] {
    if (!Products) {
      return [];
    }
    if (!searchTerm) {
      return Products;
    }
    searchTerm = searchTerm.toLowerCase();
    return Products.filter((Products) => {
      return Products.toLocalLowerCase().includes(searchTerm);
    });

    //constructor() {}
    //ngOnInit() {},
  }
}
