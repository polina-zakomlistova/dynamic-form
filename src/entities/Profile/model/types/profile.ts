import { Gender } from 'entities/Gender/model/gender';

export interface IWorksPlace {
    organization?: string;
    yearStart?: number;
    yearEnd?: number;
}

export interface IProfile {
    fullname?: string;
    gender?: Gender;
    yearOfBirth?: number,
    email?: string,
    worksPlaces?: IWorksPlace[];
}

export type IProfileKeys = keyof IProfile;
export type IWorksPlaceKeys = keyof IWorksPlace;
