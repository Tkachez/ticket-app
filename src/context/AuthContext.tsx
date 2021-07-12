import React, {ReactElement, FC, useContext, useEffect, useState, createContext} from 'react'
import {UserStoreImpl} from '../stores/UserStore'
import {auth} from '../firebase'
import api from '../api'

import {UserData} from '../types'

type Props = {
    children: ReactElement
}

type AuthContextType = {
    signup: (email: any, password: any, additionalData: UserData) => Promise<any>,
    login: (email: any, password: any) => Promise<any>,
    resetPassword: (email: any) => Promise<any>,
    logout: () => Promise<any>,
}

export const AuthContext= React.createContext<AuthContextType>({
    signup: async() => false,
    login: async() => false,
    resetPassword: async() => false,
    logout: async() => false,
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FC<Props> = ({children}) => {
    const [loading, setLoading] = useState<any>(true)
    const userStore = useContext(createContext(UserStoreImpl))

    const signup = async (email: string, password: any, additionalData: UserData) => {
        console.log(additionalData)
        const {user} = await auth.createUserWithEmailAndPassword(email, password)
        const payload = {
            ...additionalData,
            email: user?.email,
            createdAt: new Date(),
        }

        return api.createUser(payload)
    }
    const login = (email: string, password: any) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const resetPassword = (email: string) => {
        return auth.sendPasswordResetEmail(email)
    }

    const logout = () => {
        return auth.signOut()
    }

    useEffect(() => auth.onAuthStateChanged(user => {
        userStore.setUser(user)
        setLoading(false)
    }))


    const value = {
        signup,
        logout,
        resetPassword,
        login
    }

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}