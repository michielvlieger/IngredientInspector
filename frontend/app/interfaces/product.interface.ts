import { BoundingBoxInterface, IngredientsInterface } from '@interfaces/index.interface';

export interface ProductInterface {
    id: string;
    image: string;
    name: string;
    brand: string;
    boundingBoxes: BoundingBoxInterface[];
    ingredients: IngredientsInterface[];
    isOkayForUser: boolean;
}
