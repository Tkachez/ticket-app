import {observable, action, makeAutoObservable} from 'mobx'
import {UserData} from '../types'

export class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    @observable user: UserData | null = null
    @action setUser: (user: any) => void = (user) => {
        this.user = user
    }
}

export const UserStoreImpl = new UserStore()