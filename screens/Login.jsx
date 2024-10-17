import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ImageBackground, View } from 'react-native';
import Input from '../components/Input';
import MyButton from '../components/Button';
import Container from '../components/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCheckBox from '../components/CustomCheckBox'; 
import { useSessionContext } from '../utils/context';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const value = useSessionContext();

    useEffect(() => {
        const loadCredentials = async () => {
            const storedUsername = await AsyncStorage.getItem('username');
            const storedPassword = await AsyncStorage.getItem('password');

            if (storedUsername && storedPassword) {
                setUsername(storedUsername);
                setPassword(storedPassword);
                setRememberMe(true);
            }
        };

        loadCredentials();
    }, []);

    const handleLogin = async () => {
        const validUsername = 'justin';
        const validPassword = '1234';

        if (username === validUsername && password === validPassword) {
            console.log('Accesso riuscito!');
            value.login({
                username: username,
                password: password
            });

            if (rememberMe) {
                await AsyncStorage.setItem('username', username);
                await AsyncStorage.setItem('password', password);
            } else {
                await AsyncStorage.removeItem('username');
                await AsyncStorage.removeItem('password');
            }
        } else {
            setError('Credenziali errate, riprova.');
        }
    };

    return (
        <ImageBackground 
            source={require('../assets/Pc1.jpg')} 
            style={styles.background}
        >
            <Container style={styles.container}>
                <Text style={styles.title}>INSTADRAM</Text>
                <Input
                    placeholder='Username'
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                
                <View style={styles.checkboxContainer}>
                    <CustomCheckBox 
                        checked={rememberMe} 
                        onChange={() => setRememberMe(!rememberMe)} 
                    />
                    <Text style={styles.checkboxLabel}>Ricordami</Text>
                </View>

                <MyButton title='Accedi' onPress={handleLogin} style={styles.button} />
            </Container>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        borderRadius: 10,
        padding: 30,
        width: '80%',
        elevation: 5,
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333', 
    },
    input: {
        marginVertical: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    checkboxLabel: {
        marginLeft: 8,
    },
    button: {
        marginTop: 30, 
    },
});

export default Login;
