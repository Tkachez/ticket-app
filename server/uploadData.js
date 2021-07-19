const firestoreService = require('firestore-export-import')
const serviceAccount = require('./serviceAccountKey.json')

const FIRESTORE_DB = process.env.REACT_APP_FIREBASE_DATABASE_URL

firestoreService.initializeApp(serviceAccount, FIRESTORE_DB)

firestoreService.restore('organizers.json').then(() => {
    console.log('Uploaded successfully')
})