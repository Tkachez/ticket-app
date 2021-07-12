import {v4 as uuid} from 'uuid'
import {firestore} from '../firebase'
import {UserData} from '../types'


const usersApi = {
    updateUser: (userID: string, data: UserData) => {
        firestore.collection('users').doc(userID).set(data).then(res => {
            console.log(res)
        })
    },
    createUser: async (user: UserData) => {
        const uid = uuid()
        firestore.collection('users').add({
            uid,
            ...user
        }).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }
}

const ticketsApi = {}

const eventsApi = {}

const api = {
    ...usersApi,
    ...ticketsApi,
    ...eventsApi,
}

export default api