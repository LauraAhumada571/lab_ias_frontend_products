export interface CharacterModel{
    info: InfoModel;
    results: ResultModel[];
}

export interface InfoModel{
    count: number;
    pages: number;
    next: string;
    prev: string;
}

export interface ResultModel{
    id: number;
    name: number;
    image: string;
}