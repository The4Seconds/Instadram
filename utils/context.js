import React, { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SessionContext = React.createContext({});

export function useSessionContext() {
    return useContext(SessionContext);
}

function SessionProvider({ children }) {
    const [session, setSession] = useState();
    const [loading, setLoading] = useState(true);

    const defaultPosts = [
        {
            id: 1,
            username: 'Giulia',
            image: require('../assets/bho.png'),
            postImage: require('../assets/macchina.jpg'),
            likes: 10,
            comments: [],
            description: 'Un bel tramonto sul mare!',
        },
        {
            id: 2,
            username: 'Marco',
            image: require('../assets/bho2.png'),
            postImage: require('../assets/immagine300.png'),
            likes: 25,
            comments: [],
            description: 'Una giornata in montagna',
        },
        {
            id: 3,
            username: 'Anna',
            image: require('../assets/bho3.png'),
            postImage: require('../assets/immagine301.png'),
            likes: 18,
            comments: [],
            description: 'Relax con un buon libro',
        },
        {
            id: 4,
            username: 'Luca',
            image: require('../assets/download.png'),
            postImage: require('../assets/immagine302.png'),
            likes: 34,
            comments: [],
            description: 'Prima guida da solo!',
        },
        {
            id: 5,
            username: 'Sara',
            image: require('../assets/bho4.png'),
            postImage: require('../assets/immagine300.png'),
            likes: 22,
            comments: [],
            description: 'Momenti felici con gli amici',
        },
    ];

    const [posts, setPosts] = useState(defaultPosts);

    useEffect(() => {
        loadSession();
    }, []);

    async function loadSession() {
        const savedSession = await AsyncStorage.getItem('@user_session');
        const savedPosts = await AsyncStorage.getItem('@user_posts');
        setLoading(false);
        console.log(savedSession);
        if (savedSession) {
            setSession(JSON.parse(savedSession));
        }
        if (savedPosts) {
            setPosts(JSON.parse(savedPosts));
        }
    }

    async function logout() {
        await AsyncStorage.removeItem('@user_session');
        setSession(null);
    }

    async function login(newSession) {
        console.log(newSession);
        await AsyncStorage.setItem('@user_session', JSON.stringify(newSession));
        setSession(newSession);
    }

    async function addPost(newPost) {
        const updatedPosts = [newPost, ...posts];
        await AsyncStorage.setItem('@user_posts', JSON.stringify(updatedPosts));
        setPosts(updatedPosts);
    }

    async function deletePost(postId) {
        const updatedPosts = posts.filter(post => post.id !== postId);
        await AsyncStorage.setItem('@user_posts', JSON.stringify(updatedPosts));
        setPosts(updatedPosts);
    }

    async function resetPosts() {
        await AsyncStorage.setItem('@user_posts', JSON.stringify(defaultPosts));
        setPosts(defaultPosts);
    }

    const data = {
        session: session,
        logout: logout,
        login: login,
        loading: loading,
        setLoading: setLoading,
        posts: posts,
        addPost: addPost,
        deletePost: deletePost,
        resetPosts: resetPosts, 
    };

    return (
        <SessionContext.Provider value={data}>
            {children}
        </SessionContext.Provider>
    );
}

export default SessionProvider;
