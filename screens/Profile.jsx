import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import ProfilePosts from '../components/Profileposts';
import Infopanel from '../components/Infopanel';
import { useSessionContext } from '../utils/context';

function Profile() {
    const navigation = useNavigation();
    const [postImages, setPostImages] = useState([
        require('../assets/Pc1.jpg'),
        require('../assets/immagine900.jpg'),
        require('../assets/immagine901.jpg'),
        require('../assets/immagine902.jpg'),
        require('../assets/immagini903.jpg'),
        require('../assets/immagini904.jpg'),
    ]);
    const [isEditing, setIsEditing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const value = useSessionContext()

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Sei sicuro di voler uscire?',
            [
                {
                    text: 'Annulla',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: () => {
                        value.logout();
                    },
                },
            ]
        );
    };

    const handleImagePress = (image) => {
        setSelectedImage(image);
        setModalVisible(true);
    };

    const renderItem = ({ item, index, drag, isActive }) => (
        <TouchableOpacity
            style={[styles.imageWrapper, isActive ? styles.activeDragItem : null]}
            onPressIn={isEditing ? drag : null}
            activeOpacity={0.9}
            onPress={() => handleImagePress(item)}
        >
            <Image source={item} style={styles.postImage} resizeMode="cover" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header title="@Pc_Store" onLogout={handleLogout} />
            <View style={styles.bioContainer}>
                <Text style={styles.bioText}>Il meglio che puoi trovare è solo qui</Text>
                <Text style={styles.bioText}>- Pc usati e nuovi.</Text>
                <Text style={styles.bioText}>- Riparazione Pc.</Text>
            </View>
            <Infopanel isEditing={isEditing} setIsEditing={setIsEditing} />
            <DraggableFlatList
                data={postImages}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onDragEnd={({ data }) => setPostImages(data)}
                numColumns={3}
                contentContainerStyle={styles.postContainer}
                activationDistance={5}
            />
            <ProfilePosts
                visible={modalVisible}
                postImages={postImages}
                selectedImage={selectedImage}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    bioContainer: {
        padding: 15,
    },
    bioText: {
        fontSize: 14,
        marginBottom: 2,
    },
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
    postContainer: {
        padding: 5,
    },
    imageWrapper: {
        width: '32%',
        height: 100,
        marginBottom: 10,
        marginRight: 10,
    },
    postImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    activeDragItem: {
        opacity: 0.8,
        transform: [{ scale: 1.05 }],
        borderWidth: 2,
        borderColor: '#FF4500',
    },
});

export default Profile;
