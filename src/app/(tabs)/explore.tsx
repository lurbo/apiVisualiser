import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.naslov}>
      hey 2
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  
  naslov: {
    fontSize: 20,
  },

  container: {
    backgroundColor: '#97ABB1',
    flex: 1,
  },

  

});
