import React, { useState } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, TouchableOpacity, Modal } from "react-native";
import HomePost from "../components/HomePost";
import SquareContainer from "../components/SquareContainer";
import Icon from 'react-native-vector-icons/Ionicons';
import { useSessionContext } from '../utils/context';

const stories = [
    { id: 1, name: 'La tua storia', image: require('../assets/images.jpg') },
    { id: 2, name: 'Giulia', image: require('../assets/bho.png') },
    { id: 3, name: 'Marco', image: require('../assets/bho2.png') },
    { id: 4, name: 'Anna', image: require('../assets/bho3.png') },
    { id: 5, name: 'Luca', image: require('../assets/download.png') },
    { id: 6, name: 'Sara', image: require('../assets/bho4.png') },
];

function Home() {
    const [modalVisible, setModalVisible] = useState(false);
    const [hiddenPosts, setHiddenPosts] = useState({}); 
    const storyColors = ['#FF4500', '#008000', '#0000FF', '#FFD700', '#800080'];
    const value = useSessionContext();
    
    const handleHidePost = (postId) => {
        setHiddenPosts((prev) => ({
            ...prev,
            [postId]: true,
        }));
    };

    const handleUnhidePost = (postId) => {
        setHiddenPosts((prev) => ({
            ...prev,
            [postId]: false,
        }));
    };

    const handleResetPosts = async () => {
        await value.resetPosts();
        setModalVisible(false); 
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <SquareContainer>
                <View style={styles.headerContainer}>
                    <View style={styles.headerTextContainer}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text style={styles.headerText}>
                                Per te <Icon name="chevron-down" size={18} color="black" />
                            </Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            visible={modalVisible}
                            animationType="fade"
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                                <View style={styles.modalContent}>
                                    <View style={styles.iconContainer}>
                                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.optionContainer}>
                                            <Text style={[styles.optionText, styles.seguitiText]}>Seguiti</Text>
                                            <Icon name="people-outline" size={20} color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.optionContainer}>
                                            <Text style={styles.optionText}>Preferiti</Text>
                                            <Icon name="star-outline" size={20} color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleResetPosts} style={styles.optionContainer}>
                                            <Text style={styles.optionText}>Reset Posts</Text>
                                            <Icon name="refresh" size={20} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                    <View style={styles.iconsContainer}>
                        <Icon name="heart-outline" size={24} color="black" />
                        <Icon name="mail-outline" size={24} color="black" style={styles.iconMargin} />
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
                    {stories.map((story, index) => (
                        <View key={story.id} style={styles.story}>
                            {index < 4 && (
                                <View style={[styles.storyBorder, { borderColor: storyColors[index] }]} >
                                    <Image source={story.image} style={styles.storyImage} />
                                    {index === 0 && (
                                        <View style={styles.plusContainer}>
                                            <Icon name="add-circle" size={20} color="#FFF" />
                                        </View>
                                    )}
                                </View>
                            )}
                            {index >= 4 && (
                                <Image source={story.image} style={styles.storyImage} />
                            )}
                            <Text style={styles.storyText}>{story.name}</Text>
                        </View>
                    ))}
                </ScrollView>
                            
                {value.posts.map(post => (
                    !hiddenPosts[post.id] ? (
                        <HomePost
                            key={post.id}
                            post={post}
                            onHide={handleHidePost}
                            onUnhide={handleUnhidePost} 
                            isHidden={hiddenPosts[post.id]}
                        />
                    ) : (
                        <TouchableOpacity key={post.id} onPress={() => handleUnhidePost(post.id)} style={styles.hiddenPostContainer}>
                            <Text style={styles.hiddenPostText}>Post nascosto - Clicca per visualizzare</Text>
                        </TouchableOpacity>
                    )
                ))}
            </SquareContainer>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        paddingBottom: 35,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 30,
    },
    headerTextContainer: {
        position: 'relative',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 0,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconsContainer: {
        position: 'absolute',
        right: 10,
        top: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconMargin: {
        marginLeft: 15,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 40
    },
    modalContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'flex-start',
    },
    iconContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginLeft: 10,
    },
    optionText: {
        marginRight: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    seguitiText: {
        marginRight: 20,
    },
    storiesContainer: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    story: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    storyBorder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    storyImage: {
        width: 76,
        height: 76,
        borderRadius: 38,
    },
    plusContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#FF4500',
        borderRadius: 12,
        padding: 2,
    },
    storyText: {
        marginTop: 5,
        fontWeight: 'bold',
    },
    hiddenPostContainer: {
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        marginVertical: 5,
    },
    hiddenPostText: {
        fontStyle: 'italic',
        color: 'gray',
    },
});

export default Home;