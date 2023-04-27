import React from 'react';
import { Modal } from 'react-native-paper';
import { styles } from '../assets/Stylesheet/Styles';
import { View, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeHandler } from './ThemeHandler';
import { LanguageHandler } from './LanguageHandler';
import Voice from '@react-native-community/voice';
import { PermissionsAndroid } from 'react-native';

export const Other = ({ other, setOther, Propertys, setPropertys }) => {
    const [ThemeModal, setThemeModal] = React.useState(false);
    const [LangModal, setLangModal] = React.useState(false);

    const [recognized, setRecognized] = React.useState('');
    const [started, setStarted] = React.useState('');
    const [results, setResults] = React.useState([]);

    React.useEffect(() => {
        requestMicrophonePermission();
        Voice.onSpeechRecognized = onSpeechRecognized;
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechResults = onSpeechResults;

        Voice.onSpeechError = (e) => {
            console.error(e);
        }
    }, []);

    const onSpeechRecognized = (e) => {
        setRecognized('√');
    }

    const onSpeechStart = (e) => {
        setStarted('√');
    }

    const onSpeechResults = (e) => {
        const recognizedSpeech = e.value[0];
        switch (recognizedSpeech.toLowerCase()) {
            case "run":
                Alert.alert("work")
                break;
            default:
                console.log(Propertys.Language.code)
                setPropertys({
                    ...Propertys,
                    Language: {
                        ...Propertys.Language,
                        code: Propertys.Language.code + recognizedSpeech
                    }
                });

                break;
        }
    };

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
        <Modal visible={other} animationType="fade">
            <View style={styles.modalContainer}>
                <LinearGradient
                    colors={['#FFB300', '#FFA000', '#FF8F00', '#FF6F00', '#FF5722']}
                    style={styles.option}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            Propertys.MicisOn ? stopRecognition() : startRecognition();
                            setPropertys({
                                ...Propertys,
                                MicisOn: !Propertys.MicisOn,
                                MicLogo: Propertys.MicisOn ? "microphone-slash" : "microphone"
                            });
                        }}>
                        <FontAwesome name={Propertys.MicLogo} size={24} color={!Propertys.MicisOn ? "gray" : "#fff"} />
                    </TouchableOpacity>

                </LinearGradient>
                <LinearGradient colors={['#FFC300', '#FF5733', '#3366CC', '#2E4053']} style={styles.option}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <TouchableOpacity onPress={() => { setThemeModal(true); setLangModal(false) }}
                    >
                        <Octicons name="paintbrush" size={30} color="#fff" />
                    </TouchableOpacity>
                </LinearGradient>
                <View style={[styles.option, { backgroundColor: '#006400' }]}>
                    <TouchableOpacity onPress={() => { setLangModal(true); setThemeModal(false); }}
                    >
                        <MaterialCommunityIcons name={Propertys.Language.logo} size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.option, { backgroundColor: '#FF6347' }]}>
                    <TouchableOpacity onPress={() => { setOther(false); setThemeModal(false); setLangModal(false) }}>
                        <Ionicons name="close" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
            <ThemeHandler ThemeModal={ThemeModal} setTheme={setThemeModal} Propertys={Propertys} setPropertys={setPropertys} />
            <LanguageHandler LangModal={LangModal} setLangModal={setLangModal} Propertys={Propertys} setPropertys={setPropertys} />
        </Modal>
    );
};
