import React, { useState } from 'react'; 
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const HomePost = ({ post, onHide, isHidden }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes); 
    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState(post.comments || []);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    
    const handleDoubleTap = () => {
        setLiked(prevLiked => {
            if (prevLiked) {
                setLikeCount(prevCount => prevCount - 1);
            } else {
                setLikeCount(prevCount => prevCount + 1);
            }
            return !prevLiked;
        });
    };

    const handleHeartPress = () => {
        setLiked(prevLiked => {
            if (prevLiked) {
                setLikeCount(prevCount => prevCount - 1);
            } else {
                setLikeCount(prevCount => prevCount + 1);
            }
            return !prevLiked;
        });
    };

    const handleCommentIconPress = () => {
        setShowCommentInput(!showCommentInput);
    };

    const handleCommentChange = (text) => {
        setComment(text);
    };

    const handleCommentSubmit = () => {
        if (comment.trim()) {
            setCommentsList(prevComments => [...prevComments, comment]);
            setComment('');
        }
    };

    const handleCommentDelete = (index) => {
        setCommentsList(prevComments => prevComments.filter((_, i) => i !== index));
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleHidePost = () => {
        if (onHide) onHide(post.id);
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profile}>
                    <Image source={post.image} style={styles.profileImage} />
                </View>
                <View style={styles.usernameContainer}>
                    <Text style={styles.usernameText}>{post.username}</Text>
                    <TouchableOpacity onPress={toggleMenu} style={styles.dotsButton}>
                        <Icon name="ellipsis-vertical" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.postImageContainer}>
                <TouchableOpacity onPress={handleDoubleTap} activeOpacity={1}>
                    <Image source={post.postImage} style={styles.postImage} resizeMode="cover" />
                </TouchableOpacity>
            </View>
            <View style={styles.descriptionContainer}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={handleHeartPress}>
                        <Icon name={liked ? "heart" : "heart-outline"} size={24} color={liked ? "red" : "black"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCommentIconPress} style={styles.commentIcon}>
                        <Icon name="chatbubble-outline" size={24} color="black" />
                        <Text style={styles.commentCount}>{commentsList.length}</Text> 
                    </TouchableOpacity>
                    <View style={styles.likeCountContainer}>
                        <Icon name="thumbs-up-outline" size={24} color="black" />
                        <Text style={styles.likeCount}>{likeCount}</Text> 
                    </View>
                </View>
                {showCommentInput && (
                    <>
                        <ScrollView style={styles.commentsContainer} nestedScrollEnabled={true}>
                            {commentsList.map((item, index) => (
                                <View key={index} style={styles.commentContainer}>
                                    <Text style={styles.commentText}>{item}</Text>
                                    <TouchableOpacity onPress={() => handleCommentDelete(index)}>
                                        <Icon name="trash-outline" size={20} color="red" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                        <TextInput
                            style={styles.commentInput}
                            value={comment}
                            onChangeText={handleCommentChange}
                            placeholder="Scrivi un commento..."
                            onSubmitEditing={handleCommentSubmit}
                            returnKeyType="done"
                        />
                    </>
                )}
                {menuVisible && (
                    <View style={styles.dropdownMenu}>
                        <TouchableOpacity onPress={handleHidePost} style={styles.menuItem}>
                            <Icon name="eye-off-outline" size={20} color="black" />
                            <Text style={styles.menuText}>Nascondi</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {isHidden && <Text style={styles.hiddenPostText}>Post nascosto</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    profile: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    usernameContainer: {
        flex: 1,
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    usernameText: {
        fontWeight: 'bold',
    },
    dotsButton: {
        padding: 5,
    },
    postImageContainer: {
        width: '100%',
        height: 300,
    },
    postImage: {
        width: '100%',
        height: '100%',
    },
    descriptionContainer: {
        padding: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    commentIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    commentCount: {
        marginLeft: 5,
    },
    likeCountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    likeCount: {
        marginLeft: 5,
    },
    commentsContainer: {
        maxHeight: 100,
        marginTop: 10,
    },
    commentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000', 
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    commentText: {
        flex: 1,
        marginRight: 10,
        color: '#333',
        fontSize: 14,
        lineHeight: 20,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        shadowColor: '#000', 
        shadowOffset: {
            width: 0, 
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        backgroundColor: '#fff',
    },
    dropdownMenu: {
        position: 'absolute',
        top: 40,
        right: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    menuText: {
        marginLeft: 5,
    },
    hiddenPostText: {
        padding: 10,
        fontStyle: 'italic',
        color: 'gray',
    },
});

export default HomePost;
