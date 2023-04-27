import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Voice from '@react-native-community/voice';
import { PermissionsAndroid } from 'react-native';
import { Styles } from '../StyleSheet/Styles';
const VoiceToText = () => {
    const [recognized, setRecognized] = useState('');
    const [started, setStarted] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        requestMicrophonePermission(); // Request microphone permission on component mount
        Voice.onSpeechRecognized = onSpeechRecognized;
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechResults = onSpeechResults;

        Voice.onSpeechError = (e) => {
            console.error(e);
        }

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        }
    }, []);

    const onSpeechRecognized = (e) => {
        setRecognized('√');
    }

    const onSpeechStart = (e) => {
        setStarted('√');
    }

    const onSpeechResults = (e) => {
        setResults(e.value);
    }

    const startRecognition = async () => {
        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    }

    const stopRecognition = async () => {
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    }

    const requestMicrophonePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Microphone Permission',
                    message: 'This app needs access to your microphone',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Microphone permission granted');
            } else {
                console.log('Microphone permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <View style={Styles.container}>
            <TouchableOpacity onPress={startRecognition}>
                <Text style={Styles.button}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={stopRecognition}>
                <Text style={Styles.button}>Stop</Text>
            </TouchableOpacity>
            <Text style={Styles.transcription}>
                {results.map((result, index) => (
                    <Text key={index}>{result}</Text>
                ))}
            </Text>
        </View>
    );
}
export default VoiceToText;
