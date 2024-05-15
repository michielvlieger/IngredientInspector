import { BoundingBoxInterface } from '@interfaces';

export interface ProductInterface {
    id: string;
    image: string;
    name: string;
    brand: string;
    boundingBoxes: BoundingBoxInterface[];
}
