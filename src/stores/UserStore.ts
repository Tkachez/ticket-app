import {observable, action, makeAutoObservable} from 'mobx'
import api from '../api'
import {UserData} from '../types'

export class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    @observable user: UserData | null = null
    @observable authenticated: boolean = false
    @observable avatar: string = ''
    @observable avatarRef: any | null = null
    @observable avatarLoading: boolean = false

    @action uploadAvatar: (file: any) => void = (file) => {
        const userId = this.user?.uid || ''

        this.avatarLoading = true
        api.uploadPhoto(file, userId).then(snapshot => {
            this.avatarRef = snapshot.ref
            api.getPhoto(snapshot.ref).then(avatar => {
                this.avatarLoading = false
                if (this.user) {
                    this.avatar = this.user.photoUrl
                    this.user.photoUrl = avatar
                }
            })
        })
    }

    @action editUser: (field: keyof UserData, data: string) => void = (field, data) => {
        if (this.user)
            this.user[field] = data
    }

    @action updateUser: () => Promise<void> = () => {
        return api.updateUser(this.user)
    }

    @action createUser: (data: UserData, uid: string) => Promise<void> = (data, uid) => api.createUser(data, uid)
        .then(() => api.getUser(uid)
            .then(action(user => {
                this.user = user ? {
                    uid: user.uid,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    sex: user.sex,
                    age: user.age,
                    photoUrl: user.photUrl,
                } : this.user
            }))
            .catch(err => err))

    @action setUser: (user: UserData | any, data: UserData) => any = async (user, data) => {
        const currentUser = user ? await api.getUser(user.uid) : null

        this.user = currentUser ? {
            uid: currentUser.uid,
            email: currentUser.email,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            role: currentUser.role,
            sex: currentUser.sex,
            age: currentUser.age,
            photoUrl: currentUser.photoUrl,
        } : this.user

        return !currentUser && this.authenticated && data ? this.createUser({
            ...data,
            uid: user.uid,
            email: user.email,
            role: 'user',
            photoUrl: '',
            createdAt: new Date(),
            updatedAt: new Date()
        }, user.uid) : currentUser
    }

    @action setAuth: (auth: boolean) => void = (auth) => {
        this.authenticated = auth
    }
}

export const UserStoreImpl = new UserStore()