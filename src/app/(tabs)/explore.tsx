import { StyleSheet, View, Text, Linking ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function explore() {

  const { kraj } = useLocalSearchParams();
  const url = `https://sl.wikipedia.org/wiki/${kraj}`
  return (
    <View style={styles.container}>
      <Text style={styles.naslov}>
      {kraj}{"\n"}{"\n"}
      </Text>
      <Pressable>

        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  
  naslov: {
    fontSize: 25,
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#97ABB1',
    flex: 1,
  },

  

});
