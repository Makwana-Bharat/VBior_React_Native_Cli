import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Modal, RadioButton } from 'react-native-paper';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tiles } from '../Redux/store'
export const ThemeHandler = ({ ThemeModal, setTheme, Propertys, setPropertys }) => {
    return (
        <Modal visible={ThemeModal} animationType="fade">
            <View style={{ display: 'flex', width: '100%', alignItems: 'center', borderRadius: 10 }}>
                <View style={{ backgroundColor: 'rgba(255,255,255,.7)', width: "94%", height: 800, borderRadius: 10, overflow: 'hidden' }}>
                    <View style={{ backgroundColor: '#2196F3', padding: 10, marginBottom: 10, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => setTheme(false)} style={{ backgroundColor: '#fff', width: 35, height: 35, borderRadius: 35, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='close' size={24} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ paddingHorizontal: 20 }}>
                        <RadioButton.Group value={Propertys.Theme} onValueChange={v => { setPropertys({ ...Propertys, Theme: v }) }}>
                            {
                                Tiles.map((theme, index) => (
                                    <View key={index} style={{ padding: 20, paddingHorizontal: 40, backgroundColor: 'rgba(255,255,255,.8)', borderRadius: 10, margin: 5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <RadioButton value={theme.tile} status={Propertys.Theme === theme ? 'checked' : 'unchecked'} />
                                        <Text style={{ fontWeight: 'bold' }}>{theme.Name}</Text>
                                    </View>
                                ))
                            }
                        </RadioButton.Group>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
