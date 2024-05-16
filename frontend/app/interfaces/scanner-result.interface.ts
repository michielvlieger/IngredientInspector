import { ProductInterface } from "@interfaces";

export interface ScannerResultInterface {
    photoUri: string;
    products: ProductInterface[];
}