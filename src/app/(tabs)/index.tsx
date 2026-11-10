import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.ozadje}>
      <View style={styles.container90}>
          <Text style={styles.naslov}>
          asafdsf{"\n"}
          </Text>
          <Text style={styles.opis}>
            {"\n"}{"\n"}{"\n"}
            </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  naslov: {
    fontSize: 25,
    color: 'white',
    fontWeight: 800,
  },

  opis: {
    fontSize: 20,
  },

  ozadje: {
    backgroundColor: '#97ABB1',
    flex: 1,
    alignItems: 'center',
  },

  container90: {
    backgroundColor: '#97ABB1',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
