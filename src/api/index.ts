import app, {auth, firestore} from '../firebase'

const usersApi = {
    signup: async (email: string, password: string) => {
        const {user} = await auth.createUserWithEmailAndPassword(email, password)

        return user
    },
    updateUser: (user: any) =>
        firestore.collection('users')
            .doc(user.uid)
            .set(user)
            .then(snapshot => {
                return snapshot
            }),

    createUser: async (data: any, uid: string) => {
        return firestore.collection('users')
            .doc(uid)
            .set(data)
            .then(() => console.log('Successfully created user'))
            .catch(err => console.log(err))
    },
    getUser: async (userId: string) => {
        return firestore.collection('users')
            .doc(userId)
            .get()
            .then(snapshot => snapshot.data())
    },

    uploadPhoto: async (file: any, userId: string) => {
        const storageRef = app.storage().ref()
        const fileRef = storageRef.child(`${file.name}_${userId}`)

        return fileRef.put(file)
    },
    getPhoto: async (ref: any) => {
        return ref.getDownloadURL()
    },
    deletePhoto: async (ref: any) => ref.delete()
        .then(() => console.log('Photo removed'))
}

const eventsApi = {
    getTotalEvents: async () => firestore.collection('events')
        .get()
        .then(snapshot => snapshot.size),

    getEvent: async (id: number) => firestore.collection('events')
        .where('id', '==', id)
        .get()
        .then(snapshot => snapshot.docs),

    getEvents: async (lastDoc: any[], perPage: number) => firestore.collection('events')
        .orderBy('start_time')
        .startAfter(lastDoc)
        .limit(perPage)
        .get()
        .then(snapshot => snapshot.docs),

    updateEvent: async (eventSnapshot: any, payload: any) => firestore.collection('events')
        .doc(eventSnapshot.id)
        .set(payload)
        .then(() => console.log('Successfully updated event'))
        .catch(err => err),
}

const api = {
    ...usersApi,
    ...eventsApi,
}

export default api