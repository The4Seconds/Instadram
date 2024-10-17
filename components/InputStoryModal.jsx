import { TextInput, StyleSheet } from "react-native";

function InputStoryModal({ placeholder, password, value, onChange }) {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={password}
            value={value}
            onChangeText={onChange}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#ebebeb',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        paddingVertical: 9,
        paddingHorizontal: 6,
        textAlign: 'left',
        margin: 6,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1.5,
        elevation: 3, 
    },
});

export default InputStoryModal;
