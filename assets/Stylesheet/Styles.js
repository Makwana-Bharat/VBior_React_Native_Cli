import { StyleSheet } from "react-native";
export const headerStyle = StyleSheet.create({
    global: {
        backgroundColor: '#2196F3',
    },
    header: {
        backgroundColor: '#2196F3',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    headerButton: {
        padding: 10,
        borderRadius: 5,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});
export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        top: 0,
        right: 0
    },
    option: {
        marginTop: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        position: 'relative',
        top: 50,
        right: 13,
        borderRadius: 50
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    buttonContainer: {
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
        marginBottom: 5
    },
    buttonText: {
        color: '#333',
        fontWeight: 'bold',
    },
    modalContent: {
        width: 200,
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
});
export const Editor = StyleSheet.create({
    container: {
        flex: 1,
    },
    codeEditor: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        borderRadius: 50,
        backgroundColor: '#2196F3',
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
