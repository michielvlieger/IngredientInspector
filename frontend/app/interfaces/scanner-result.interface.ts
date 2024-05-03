import { productType } from "./product.interface";

export interface scannerResultType {
    photoUri: string;
    products: Array<productType>;
}