import React, { useContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const SessionContext = React.createContext({})


export function useSessionContext() {
    return useContext(SessionContext)
}

function SessionProvider({ children }) {

    const [session, setSession] = useState()
    const [loading, setLoading] = useState (true)

    const posts = [
        {
            id: 1,
            username: 'Giulia',
            image: require('../assets/bho.png'),
            postImage: require('../assets/macchina.jpg'),
            likes: 10,
            comments: []
        },
        {
            id: 2,
            username: 'Marco',
            image: require('../assets/bho2.png'),
            postImage: require('../assets/immagine300.png'),
            likes: 25,
            comments: []
        },
        {
            id: 3,
            username: 'Anna',
            image: require('../assets/bho3.png'),
            postImage: require('../assets/immagine301.png'),
            likes: 18,
            comments: []
        },
        {
            id: 4,
            username: 'Luca',
            image: require('../assets/download.png'),
            postImage: require('../assets/immagine302.png'),
            likes: 34,
            comments: []
        },
        {
            id: 5,
            username: 'Sara',
            image: require('../assets/bho4.png'),
            postImage: require('../assets/immagine300.png'),
            likes: 22,
            comments: []
        },
    ];

    useEffect (() =>{
        loadSession()
    },[])

    async function loadSession (){
        const savedSession = await AsyncStorage.getItem('@user_session')
        setLoading(false)
        console.log(savedSession)
        if (savedSession) {
            setSession( JSON.parse(savedSession))
        }
    }

    async function logout(){
        await AsyncStorage.removeItem('@user_session')
        setSession(null)
    }

    async function login (newSession){
        console.log(newSession)
        await AsyncStorage.setItem('@user_session', JSON.stringify(newSession))
        setSession(newSession)
    }

    const data = {
        session: session,
        logout: logout,
        login: login,
        loading: loading,
        setLoading: setLoading,
        posts: posts,
    }

    return (
        <SessionContext.Provider value={data}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionProvider