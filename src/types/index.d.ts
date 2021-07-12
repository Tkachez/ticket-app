export interface UserData {
    firstName: string
    lastName: string
    role: string
    sex: string
    age: number | string,
    photoUrl: string,
}

export interface Ticket {
    userId: string
    date: string
}

export interface Event {
    tickets: Ticket[],
    date: string
}


export interface UserStoreInterface {

}

export interface RootStoreInterface {
    userStore: UserStoreInterface,
    event
}

export type AuthProps = {

}
