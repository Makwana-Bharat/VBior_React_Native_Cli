import { PermissionsAndroid, ToastAndroid } from 'react-native'
import * as FileSystem from 'expo-file-system';
const fileName = 'mytextfile.java';
import { useState } from 'react';
export const Save = async () => {
    const [fileContent, setFileContent] = useState('Hello, world!');
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Write the file
            const dirPath = `${FileSystem.documentDirectory}myappfiles/`;
            await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });
            const filePath = `${dirPath}${fileName}`;
            await FileSystem.writeAsStringAsync(filePath, fileContent);
            console.log(`File ${fileName} saved successfully at ${filePath}`);
            ToastAndroid.show('File saved successfully!', ToastAndroid.SHORT);
        } else {
            console.log('Write permission denied');
            ToastAndroid.show('Write permission denied', ToastAndroid.SHORT);
        }
    } catch (err) {
        console.error(err);
        ToastAndroid.show('Failed to save file', ToastAndroid.SHORT);
    }
    const dirPath = `${FileSystem.documentDirectory}myappfiles/`;
    const filePath = `${dirPath}${fileName}`;
    console.log(filePath)
};