import { Button, Text, View } from 'react-native';
function Counter({ counter }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <Text>{counter}</Text>
        </View>
    );
}
export default Counter;