import { makeAutoObservable } from 'mobx';
import RootStore from 'app/providers/store/config/store';
import { IProfile, IWorksPlace } from 'entities/Profile/model/types/profile';

export interface IProfileStore {
    rootStore: RootStore;
}

export default class Profile implements IProfileStore {
    rootStore: RootStore;

    initData: IProfile = {
        fullname: undefined,
        email: undefined,
        gender: undefined,
        yearOfBirth: undefined,
        worksPlaces: undefined,
    };

    errors: string[]|null = null;

    data: IProfile = this.initData;

    updateField = <T extends keyof IProfile>(field: T, value: IProfile[T]): void => {
        this.data[field] = value;
    };

    clear = () => {
        this.data = this.initData;
    };

    updateFieldWork = <T extends keyof IWorksPlace> (index: number, field: T, value: IWorksPlace[T]) => {
        if (this.data.worksPlaces && this.data.worksPlaces[index]) {
            if (typeof this.data.worksPlaces[index][field] === 'number') {
                // @ts-ignore
                this.data.worksPlaces[index][field] = Number(value);
            }
            this.data.worksPlaces[index][field] = value;
        }
    };

    updateWorksPlaces = (newWorks:IWorksPlace[]) => {
        this.data.worksPlaces = newWorks;
    };

    setErrors = (err:string[]) => {
        this.errors = err;
    };

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }
}
