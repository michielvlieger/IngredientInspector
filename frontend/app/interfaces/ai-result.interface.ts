export interface aiResultType {
    id: string;
    boundingBox: boundingBoxType;
    tags: Array<tagType>;
}

export interface boundingBoxType {
    x: string;
    y: string;
    w: string;
    h: string;
}

export interface tagType {
    name: string;
    confidence: number;
}