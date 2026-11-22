import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function explore() {

  const { kraj } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text style={styles.naslov}>
      {kraj}
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
