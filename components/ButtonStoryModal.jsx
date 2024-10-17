import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

function ButtonStoryModal({ title, onPress, style }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4883db',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 11,
        textTransform: 'uppercase', 
    },
});

export default ButtonStoryModal;
