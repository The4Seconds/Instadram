import React, { useRef, useEffect } from 'react';
import { Modal, FlatList, View, StyleSheet } from 'react-native';
import HomePost from '../components/HomePost';

const ITEM_HEIGHT = 365; 

const ProfilePosts = ({ visible, postImages, selectedImage, onClose }) => {
    const flatListRef = useRef(null);

    useEffect(() => {
        if (visible && flatListRef.current) {
            const selectedIndex = postImages.findIndex(image => image === selectedImage);
            if (selectedIndex !== -1) {
                flatListRef.current.scrollToIndex({ index: selectedIndex, animated: true });
            }
        }
    }, [visible, selectedImage, postImages]);

    const renderItem = ({ item }) => (
        <View style={styles.postWrapper}>
            <HomePost
                post={{
                    postImage: item,
                    username: "@Pc_Store",
                    likes: Math.floor(Math.random() * 100), 
                    comments: [], 
                    liked: false,
                    image: require('../assets/images.jpg'), 
                }}
            />
        </View>
    );

    const getItemLayout = (_, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    });

    const handleScrollToIndexFailed = (info) => {
        const { index } = info;
        flatListRef.current.scrollToIndex({ index: Math.max(0, index - 1), animated: true });
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <FlatList
                ref={flatListRef}
                data={postImages}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                getItemLayout={getItemLayout}
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={true}
                onScrollToIndexFailed={handleScrollToIndexFailed}
            />
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
    },
    postWrapper: {
        marginBottom: 10,
    },
});

export default ProfilePosts;