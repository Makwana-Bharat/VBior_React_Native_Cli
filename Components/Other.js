import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Modal } from 'react-native-paper';
import { styles } from '../assets/Stylesheet/Styles';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Ionicons, FontAwesome, Octicons } from '@expo/vector-icons';
import { ThemeHandler } from './ThemeHandler';
import { LanguageHandler } from './LanguageHandler';
import * as Speech from 'expo-speech';
/* Speech To Text */

export const Other = ({ other, setOther, Propertys, setPropertys }) => {
    const [ThemeModal, setThemeModal] = React.useState(false);
    const [LangModal, setLangModal] = React.useState(false);
    const speak = () => {
        const thingToSay = 'Hello Hii';
        Speech.speak(thingToSay);
    };
    return (
        <>
            <Modal
                visible={other}
                animationType="fade">
                <View style={styles.modalContainer}>
                    <LinearGradient colors={['#FFB300', '#FFA000', '#FF8F00', '#FF6F00', '#FF5722']} style={styles.option}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <TouchableOpacity onPress={() => {
                            speak();
                            setPropertys({
                                ...Propertys, MicisOn: Propertys.MicisOn ? false : true, MicLogo: Propertys.MicisOn ? "microphone-slash" : "microphone"
                            });
                        }}
                        >
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
        </>
    );
}