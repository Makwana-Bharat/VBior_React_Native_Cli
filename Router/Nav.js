import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Output from '../Screens/Output';
import { headerStyle, Editor } from '../assets/Stylesheet/Styles';
import CodeEditor from '@rivascva/react-native-code-editor';
import { FAB } from 'react-native-paper';
import { Save } from '../Components/Save';
import { Other } from '../Components/Other';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-community/voice';
import { PermissionsAndroid } from 'react-native';

const Stack = createStackNavigator();

function Nav({ Propertys, setPropertys }) {

    function CodePadHeader() {

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
        const [other, setOther] = useState(false);
        return (
            <View style={headerStyle.header}>
                <Text style={headerStyle.headerTitle}>{Propertys.File}</Text>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        style={headerStyle.headerButton}
                        onPress={Save}
                    >
                        <MaterialCommunityIcons name="content-save-outline" size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={headerStyle.headerButton}
                        onPress={() => {
                            Propertys.MicisOn ? stopRecognition() : startRecognition();
                            setPropertys({
                                ...Propertys,
                                MicisOn: !Propertys.MicisOn,
                                MicLogo: Propertys.MicisOn ? "microphone-slash" : "microphone"
                            });
                        }}>
                        <FontAwesome name={Propertys.MicLogo} size={24} color={!Propertys.MicisOn ? "#fff" : "green"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={headerStyle.headerButton}
                        onPress={() => setOther(true)}
                    >
                        <MaterialCommunityIcons name="dots-vertical" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Other
                    other={other}
                    setOther={setOther}
                    Propertys={Propertys}
                    setPropertys={setPropertys}
                />
            </View>
        );
    }
    const CodePad = (props) => {
        const [code, setCode] = useState(Propertys.code);
        const [loading, setLoading] = useState(false);
        const handleRunCode = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    'https://api.jdoodle.com/v1/execute',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        },
                        body: JSON.stringify({
                            clientId:
                                '7d7de72ddc05ca03c4b52ae4581a387b',
                            clientSecret:
                                'd3477af404ced7f94b3a064b1b9249cb20d16f0210594c8b30a69620d612ba40',
                            script: code,
                            language: Propertys.Language.lan,
                            versionIndex: '0',
                        }),
                    }
                );

                const data = await response.json();
                setLoading(false);
                props.navigation.navigate('Output', { output: data.output });
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        return (
            <View style={Editor.container}>
                <CodeEditor
                    style={Editor.codeEditor}
                    fontSize={10}
                    inputLineHeight={26}
                    highlighterLineHeight={26}
                    language={Propertys.Language.lan}
                    syntaxStyle={Propertys.Theme}
                    showLineNumbers
                    value={code}
                    onChange={setCode}
                    initialValue={Propertys.Language.code}
                />
                {loading ? (
                    <View style={
                        Editor.loader}>
                        <ActivityIndicator size="large" color="#2196F3" />
                    </View>
                ) : (
                    <FAB
                        style={Editor.fab}
                        icon="play"
                        color='rgba(255,255,255,1)'
                        onPress={() => handleRunCode(props.navigation)}
                    />
                )}
            </View>
        );
    };
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: headerStyle.global,
                headerTintColor: '#fff',
            }}>
            <Stack.Screen
                name="Code"
                component={CodePad}
                options={{ header: props => <CodePadHeader {...props} /> }}
            />
            <Stack.Screen
                name="Output"
                component={Output}
                options={{
                    title: 'Output',
                    headerBackTitleVisible: false,
                    headerLeft: ({ onPress }) => (
                        <TouchableOpacity style={headerStyle.headerButton} onPress={onPress}>
                            <Ionicons name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default Nav;
