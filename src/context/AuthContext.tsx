import React, {ReactElement, FC, useContext, useEffect, useState} from 'react'
import {UserStoreImpl} from '../stores/UserStore'
import {auth} from '../firebase'
import firebase from 'firebase'
import {UserData} from "../types";

type Props = {
    children: ReactElement
}

type AuthContextType = {
    signup: (email: string, password: string, additionalData: UserData) => Promise<firebase.auth.UserCredential>,
    login: (email: string, password: string) => Promise<firebase.auth.UserCredential>,
    resetPassword: (email: string) => Promise<void>,
    logout: () => Promise<void>,
}

export const AuthContext= React.createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FC<Props> = ({children}) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<UserData>({} as UserData)

    const signup = async (email: string, password: string, additionalData: UserData) => {
        setData(additionalData)
        return auth.createUserWithEmailAndPassword(email, password)
    }
    const login = async (email: string, password: string) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const resetPassword = (email: string) => {
        return auth.sendPasswordResetEmail(email)
    }

    const logout = () => {
        return auth.signOut()
    }

    useEffect(() => auth.onAuthStateChanged(user => {
        UserStoreImpl.setAuth(!!user)
        UserStoreImpl.setUser(user, data)
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