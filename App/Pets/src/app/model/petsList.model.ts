import { Pet } from "./pet.model";

export class PetsList {
    count: number;
    results: Pet[];

    constructor(obj?:any) {
        this.count = obj && obj.count || 0;
        this.results = obj && obj.results.map((x:any)=> {
            return new Pet(x)
        }) || [];
    }
}