import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function Header({ title, onLogout }) { 
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={onLogout}>
                    <Icon name="ellipsis-horizontal" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.bottomRow}>
                <Image
                    source={require('../assets/images.jpg')}
                    style={styles.image}
                />
                <View style={styles.counterContainer}>
                    <View style={styles.counter}>
                        <Text style={styles.text}>6</Text>
                        <Text style={styles.text}>post</Text>
                    </View>
                    <View style={styles.counter}>
                        <Text style={styles.text}>600</Text>
                        <Text style={styles.text}>follower</Text>
                    </View>
                    <View style={styles.counter}>
                        <Text style={styles.text}>300</Text>
                        <Text style={styles.text}>seguiti</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 30, 
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', 
        alignItems: 'center',
        marginTop: 20, 
    },
    image: {
        width: 70, 
        height: 70, 
        borderRadius: 35, 
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counter: {
        marginHorizontal: 10,
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
    },
});

export default Header;
