import { BoundingBoxInterface, TagInterface, } from '@interfaces';

export interface AIResultInterface {
    id: string;
    boundingBox: BoundingBoxInterface;
    tags: TagInterface[];
}
