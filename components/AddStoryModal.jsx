import { View, Text, Image, StyleSheet } from "react-native";
import ButtonStoryModal from "../components/ButtonStoryModal"; 
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import Input from "../components/InputStoryModal";

function AddStoryModal() {
    const [img, setImg] = useState(null);
    const [description, setDescription] = useState('');

    function deleteImage() {
        setImg(null);
    }

    function publishPost() {
        console.log('Pubblica');
        const post = {
            name: "Il Papa",
            image: img,
            description: description
        };
        console.log(post);
    }

    async function openCamera() {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Dammi i permessi o non posso fare nulla');
            return;
        }

        console.log('OPEN CAMERA!');
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1
        });
        if (!result.canceled) {
            const image = result.assets[0].uri;
            setImg(image);
        }
    }

    const containerStyle = {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    };

    const imageContainerStyle = {
        width: 400,
        height: 400,
        backgroundColor: 'red',
    };

    return (
        <View style={containerStyle}>
            {!img && (
                <ButtonStoryModal title={'Apri fotocamera'} onPress={openCamera} />
            )}
            {!!img && (
                <View>
                    <View style={imageContainerStyle}>
                        <Image
                            source={{ uri: img }}
                            style={{ width: '100%', height: '100%' }} 
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder="Descrizione"
                            onChange={setDescription}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <ButtonStoryModal 
                            title="Elimina" 
                            onPress={deleteImage} 
                            style={styles.button} 
                        />
                        <ButtonStoryModal 
                            title="Pubblica" 
                            onPress={publishPost} 
                            style={styles.button} 
                        />
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '90%', 
        alignSelf: 'center',
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
    input: {
        width: '100%',
        height: 50, 
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
});

export default AddStoryModal;
