import { BoundingBoxInterface, TagInterface, } from '@interfaces/index.interface';

export interface AIResultInterface {
    id: string;
    boundingBox: BoundingBoxInterface;
    tags: TagInterface[];
}
