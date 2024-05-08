import { ProductInterface } from '@interfaces/index.interface';

export interface ScannerResultInterface {
    photoUri: string;
    products: ProductInterface[];
}