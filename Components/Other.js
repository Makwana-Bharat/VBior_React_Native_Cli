import React from 'react';
import { Modal } from 'react-native-paper';
import { styles } from '../assets/Stylesheet/Styles';
import { View, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeHandler } from './ThemeHandler';
import { LanguageHandler } from './LanguageHandler';
export const Other = ({ other, setOther, Propertys, setPropertys }) => {
    const [ThemeModal, setThemeModal] = React.useState(false);
    const [LangModal, setLangModal] = React.useState(false);
    return (
        <Modal visible={other} animationType="fade">
            <View style={styles.modalContainer}>
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
