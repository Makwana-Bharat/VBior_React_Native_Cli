import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    StyleSheet,
    Alert,
    PermissionsAndroid
} from 'react-native';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Output from '../Screens/Output';
import { headerStyle, Editor } from '../assets/Stylesheet/Styles';
import CodeEditor from '@rivascva/react-native-code-editor';
import { FAB, Modal, TextInput } from 'react-native-paper';
import { Other } from '../Components/Other';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-community/voice';
import { Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import DirectoryScreen from '../Screens/DirectoryScreen';
import RNFS from 'react-native-fs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Stack = createStackNavigator();

const Height = Dimensions.get('window').height;
function Nav({ Propertys, setPropertys }) {

    function CodePadHeader({ navigation }) {
        const [newFileName, setNewFileName] = useState('');
        const [svModal, setSv] = useState(false);
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
        const savehandler = async () => {
            let granted = null;

            if (Platform.OS === 'android') {
                granted = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            } else if (Platform.OS === 'ios') {
                granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
            } else {
                console.log('Unsupported platform');
                return;
            }

            if (granted === 'granted') {
                const directoryPath = `${RNFS.DocumentDirectoryPath}`;
                const filePath = `${directoryPath}/${newFileName}.${Propertys.Language.lan}`;
                try {
                    await RNFS.mkdir(directoryPath);
                } catch (error) {
                    console.log('Error creating directory:', error);
                }

                RNFS.writeFile(filePath, 'Hello World!', 'utf8')
                    .then(() => {
                        Alert.alert('File written successfully.');
                        setPropertys({ ...Propertys, File: newFileName + "." + Propertys.Language.lan });
                        setSv(false);
                    })
                    .catch((error) => {
                        console.log('Error writing file:', error);
                    });
            } else {
                console.log('Permission denied');
            }
        }
        const Save = () => {
            if (Propertys.File == "document*") {
                setSv(true);
            }
            if (svModal)
                savehandler();
        };

        const [other, setOther] = useState(false);
        return (
            <>
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
                <Modal visible={svModal} animationType="slide" style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setSv(false)}>
                                <MaterialIcons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                            <Text style={styles.modalHeaderText}>Save File</Text>
                        </View>
                        <View style={styles.modalBody}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    mode='outlined'
                                    style={styles.textInput}
                                    placeholder="File name"
                                    onChangeText={(text) => setNewFileName(text)}
                                />
                                <TextInput
                                    mode='outline'
                                    disabled
                                    placeholder={"." + Propertys.Language.lan}
                                    style={[styles.textInput, { width: "30%", textAlign: 'left', marginLeft: 0, fontWeight: 'bold' }]}
                                />
                            </View>
                            <View style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={Save} style={{ backgroundColor: '#2196F3', width: "40%", padding: 16, borderRadius: 8, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Save</Text>
                                    <MaterialIcons name="save" size={24} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </>
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
            <Stack.Screen
                name="Save"
                component={DirectoryScreen}
                options={{
                    title: 'Save',
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
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        height: Height
    },
    modalContainer: {
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    closeButton: {
        padding: 5,
    },
    closeButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    modalBody: {
        flex: 1,
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    textInput: {
        width: "70%",
        padding: 5,
        marginLeft: 10,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
    },
    iconContainer: {
        marginRight: 20,
    },
    text: {
        fontSize: 16,
        color: "black",
    },
});
export default Nav;
