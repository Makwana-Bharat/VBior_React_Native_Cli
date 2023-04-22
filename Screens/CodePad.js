import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { FAB } from 'react-native-paper';
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import { Editor } from '../assets/Stylesheet/Styles';
const CodePad = (props) => {
    const [code, setCode] = useState(`public class Test{
        public static void main(String args[])
        {
            System.out.println("Editor Is Super");
        }   
    }`);
    const [loading, setLoading] = useState(false);
    const [Lang, setLang] = useState('java');
    const handleRunCode = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://api.jdoodle.com/v1/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    clientId: "7d7de72ddc05ca03c4b52ae4581a387b",
                    clientSecret: "d3477af404ced7f94b3a064b1b9249cb20d16f0210594c8b30a69620d612ba40",
                    script: `${code}`,
                    language: Lang,
                    versionIndex: "0"
                })
            });

            const data = await response.json();
            setLoading(false);
            props.navigation.navigate('Output', { output: data.output });
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    return (
        <View style={Editor.container}>
            <CodeEditor
                style={Editor.codeEditor}
                language={Lang}
                syntaxStyle={CodeEditorSyntaxStyles.monokaiSublime}
                showLineNumbers
                value={code}
                onChange={setCode}
            />
            {loading ? (
                <View style={Editor.loader}>
                    <ActivityIndicator size="large" color="#2196F3" />
                </View>
            ) : (
                <FAB
                    style={Editor.fab}
                    icon="play"
                    onPress={() => handleRunCode(props.navigation)}
                />
            )}
        </View>
    );
};
export default CodePad;
