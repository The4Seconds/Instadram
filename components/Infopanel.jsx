import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

function Infopanel({ isEditing, setIsEditing }) {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setIsEditing(!isEditing)}
            >
                <Text style={styles.buttonText}>
                    {isEditing ? 'Termina modifica' : 'Modifica profilo'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Condividi profilo</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'black',
    },
});

export default Infopanel;
