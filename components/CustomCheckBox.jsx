import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomCheckBox = ({ checked, onChange }) => {
    return (
        <TouchableOpacity 
            style={[styles.checkbox, checked ? styles.checked : styles.unchecked]} 
            onPress={onChange}
        >
            {checked && <Text style={styles.checkmark}>✔</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        borderRadius: 5, 
    },
    checked: {
        backgroundColor: '#48dbdb',
    },
    unchecked: {
        backgroundColor: 'transparent',
    },
    checkmark: {
        color: 'white',
        fontSize: 18,
    },
});

export default CustomCheckBox;
