import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { FAB, Modal, TextInput } from 'react-native-paper';
import RNFS from 'react-native-fs';
import { request, PERMISSIONS } from 'react-native-permissions';
import { Editor } from '../assets/Stylesheet/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const DirectoryScreen = ({ route, navigation }) => {
    const { Propertys, setPropertys } = route.params;
    const [folders, setFolders] = useState([]);
    const [currentDirectory, setCurrentDirectory] = useState(RNFS.DocumentDirectoryPath);
    const [fdModal, setFd] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [newFileName, setNewFileName] = useState('');
    const [svModal, setSv] = useState(false);
    const [files, setFiles] = useState('');
    useEffect(() => {
        requestPermissions();
        loadDirectories(currentDirectory);
    }, [currentDirectory]);

    const requestPermissions = async () => {
        try {
            const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            if (result === 'granted') {
                console.log('Read external storage permission granted');
            } else {
                console.log('Read external storage permission denied');
            }
        } catch (error) {
            console.log('Error requesting permissions:', error);
        }
    };

    const loadDirectories = async (directory) => {
        try {
            const response = await RNFS.readDir(directory);
            const directories = [];
            const files = [];
            response.forEach((item) => {
                if (item.isDirectory()) {
                    directories.push(item.name);
                } else if (item.isFile()) {
                    const fileName = item.name;
                    const extension = fileName.split('.').pop();
                    const fileNameWithExt = `${fileName} (${extension.toUpperCase()})`;
                    directories.push(fileNameWithExt);
                }
            });
            setFolders(directories);
            // setFiles(files);
        } catch (error) {
            console.log('Error getting directory contents for', directory, ':', error);
        }
    };


    const openDirectory = (directory) => {
        const path = `${currentDirectory}/${directory}`;
        setCurrentDirectory(path);
    };

    const goBack = () => {
        const path = currentDirectory.split('/');
        path.pop();
        const parentDirectory = path.join('/');
        setCurrentDirectory(parentDirectory);
    };

    const createFolder = async () => {
        try {
            setFd(true);
        } catch (error) {
            console.log('Error opening modal:', error);
        }
    };

    const handleCreateFolder = async () => {
        try {
            if (newFolderName === null || newFolderName === '') {
                return;
            }
            const newFolderPath = `${currentDirectory}/${newFolderName}`;
            await RNFS.mkdir(newFolderPath);
            setFolders([...folders, newFolderName]);
            setFd(false);
        } catch (error) {
            console.log('Error creating new folder:', error);
        }
    };
    const renderItem = ({ item }) => {
        const isFile = item.includes("(");

        return (
            isFile ?
                <TouchableOpacity
                >
                    <View style={styles.itemContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons
                                name={"file-outline"}
                                size={24}
                                color={"#4CAF50"}
                            />
                        </View>
                        <Text style={styles.text}>{item}</Text>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    onPress={() => openDirectory(item)}>
                    <View style={styles.itemContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons
                                name={"folder-outline"}
                                size={24}
                                color={"#607D8B"}
                            />
                        </View>
                        <Text style={styles.text}>{item}</Text>
                    </View>
                </TouchableOpacity>
        );
    };

    const keyExtractor = (item) => item;
    const saveNewFile = async () => {
        try {
            if (newFileName === null || newFileName === '') {
                return;
            }
            const newFilePath = `${currentDirectory}/${newFolderName}/${newFileName}.${Propertys.Language.lan}`;
            await RNFS.writeFile(newFilePath, '');
            setFiles([...files, newFileName]);
        } catch (error) {
            console.log('Error creating new file:', error);
        }
    };

    const save = () => {
        saveNewFile().then(() => console.log('New file created successfully'));
        loadDirectories(currentDirectory);
        setPropertys({ ...Propertys, File: newFileName + '.' + Propertys.Language.lan });
        setSv(false);
        navigation.navigate('Code');
    }
    const handleSaveNewFile = () => {
        setSv(true);
    }
    // console.log(files)
    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    {currentDirectory !== RNFS.DocumentDirectoryPath && (
                        <TouchableOpacity onPress={goBack}>
                            <Text style={{ marginRight: 10 }}>←</Text>
                        </TouchableOpacity>
                    )}
                    <Text style={{ fontWeight: 'bold' }}>{currentDirectory}</Text>
                </View>
                <FlatList
                    data={folders}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />
                <FAB
                    style={[Editor.fab, { bottom: 70 }]}
                    icon={() => <MaterialCommunityIcons name="content-save-outline" size={24} color="white" />}
                    color='rgba(255,255,255,1)'
                    onPress={handleSaveNewFile}
                />

                <FAB
                    style={Editor.fab}
                    icon="folder-plus"
                    color='rgba(255,255,255,1)'
                    onPress={createFolder}
                />
            </View>
            <Modal visible={fdModal} animationType="slide" style={styles.modal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setFd(false)}>
                            <MaterialIcons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.modalHeaderText}>Create Folder</Text>
                    </View>
                    <View style={styles.modalBody}>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="create-new-folder" size={24} color="#333" />
                            <TextInput
                                mode='outlined'
                                style={styles.textInput}
                                placeholder="Enter a name for the new folder"
                                onChangeText={(text) => setNewFolderName(text)}
                            />
                        </View>
                        <Button title="Create" onPress={handleCreateFolder} />
                    </View>
                </View>
            </Modal>
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
                            <MaterialIcons name="save" size={24} color="#333" />
                            <TextInput
                                mode='outlined'
                                style={styles.textInput}
                                placeholder="File name"
                                onChangeText={(text) => setNewFileName(text)}
                            />
                        </View>
                        <Button title="Create" onPress={save} />
                    </View>
                </View>
            </Modal>
        </>
    );
};
const styles = StyleSheet.create({
    modal: {
        flex: 1,
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
        flex: 1,
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
export default DirectoryScreen;
