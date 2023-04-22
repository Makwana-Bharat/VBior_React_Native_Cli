import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Output = ({ route }) => {
    const { output } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{output}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 14,
        // fontFamily: 'Cambria' || 'Serif' || 'Times New Roman',
        color: "#483C32"
    },
});

export default Output;
