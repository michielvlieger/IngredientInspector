import { BoundingBoxInterface, TagInterface, } from '@interfaces';

export interface AIResultInterface {
    products: {
        id: string;
        boundingBox: BoundingBoxInterface;
        tags: TagInterface[];
    }[]
    imageMetadata: {
        height: number;
        width: number;
    }
}
