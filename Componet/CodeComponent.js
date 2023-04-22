import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import { View, Text } from 'react-native';
const CodeComponent = () => {
    return (
        // <View>
        //     <Text>Work</Text>
        // </View>
        <CodeEditor
            style={{
                fontSize: 20,
                inputLineHeight: 26,
                highlighterLineHeight: 26,
            }}
            language="javascript"
            syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
            showLineNumbers
        />
    );
};
export default CodeComponent;