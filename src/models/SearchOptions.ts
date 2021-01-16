import { Genre } from "./Genre";
import { InstrumentType } from "./Instrument";

export interface SearchOptions {
    name?: string;
    author?: string;
    genre?: Genre;
    instruments?: InstrumentType[];
    difficulty?: string;
}