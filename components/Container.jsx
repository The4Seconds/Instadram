import React from 'react';
import { View } from 'react-native';

const containerStyle = {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 30,
    backgroundColor: '#4883db',
};

function Container({ children, style }) {
    return (
        <View style={[containerStyle, style]}>
            {children}
        </View>
    );
}

export default Container;
