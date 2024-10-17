import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

function Input({ placeholder, secureTextEntry, value, onChangeText }) {
    return (
        <View style={styles.container}>
            <Text style={styles.placeholder}>{placeholder}</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 6,
    },
    placeholder: {
        color: '#a0a0a0',
        marginBottom: 4,
    },
    input: {
        backgroundColor: '#48dbdb',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        paddingVertical: 9,
        paddingHorizontal: 6,
        borderRadius: 4,
        color: 'rgb(0,0,10)',
    },
});

export default Input;
