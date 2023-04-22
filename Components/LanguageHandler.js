import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Modal } from 'react-native-paper';
import { styles } from '../assets/Stylesheet/Styles';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Ionicons, FontAwesome, Octicons } from '@expo/vector-icons';
import { Language } from '../Redux/store';
export const LanguageHandler = ({ LangModal, setLangModal, Propertys, setPropertys }) => {
    return (
        <Modal
            visible={LangModal}
            animationType="fade">
            <View style={[styles.modalContainer, { right: 60, top: 80, flexDirection: 'column', justifyContent: 'flex-end' }]}>
                {
                    Language.map((val, i) => (
                        <View style={[styles.option, { backgroundColor: '#006400' }]} key={i}>
                            <TouchableOpacity onPress={v => { setPropertys({ ...Propertys, Language: val }) }}>
                                <MaterialCommunityIcons name={val.logo} size={30} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
        </Modal>
    );
}
