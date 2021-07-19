export interface UserData {
    uid: string,
    email: string
    firstName: string
    lastName: string
    role: string
    sex: string
    age: number | string
    photoUrl: string,
    createdAt?: Date | string,
    updatedAt?: Date | string,
}

export interface EventData {
    name: string,
    link: string,
    uri: string,
    logo_uri: string,
    start_time: Date | string
    finish_time: Date | string
    organizer: OrganizerData
}

export interface OrganizerData {
    id: string,
    name: string,
}

export interface RootStoreInterface {
    userStore: UserStoreInterface,
    event
}

export type AuthProps = {

}
