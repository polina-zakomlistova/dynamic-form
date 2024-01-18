import Profile from 'entities/Profile/model/store/profile';

export default class RootStore {
    profile: Profile;

    localStorage: Storage;

    constructor() {
        this.profile = new Profile(this);
        this.localStorage = window.localStorage;
    }
}
