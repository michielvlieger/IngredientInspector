import { boundingBoxType } from "./ai-result.interface";

export interface productType {
    id: string;
    image: string;
    name: string;
    brand: string;
    boundingBoxes: boundingBoxType[];
}