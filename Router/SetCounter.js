import { Button, Text, View } from 'react-native';
function SetCounter({ setcounter }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Button title='Increment' onPress={() => setcounter((val) => val + 10)} />
                <Button title='Decrement' />
            </View>
        </View>
    );
}
export default SetCounter;