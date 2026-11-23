import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.ozadje}>
      <View style={styles.container90}>
        <Text style={styles.naslov}>
        Kaj je ta aplikacija?{"\n"}
        </Text>
        <Text style={styles.opis}>
          Ta aplikacija je bila ustvarjena v okviru četrte vaje pri predmetu IMA (Izdelava mobilnih aplikacij). {"\n"}{"\n"}{"\n"}
          </Text>
        <Text style={styles.naslov}>
          Trenutna verzija:{"\n"}
          </Text>
        <Text style={styles.opis}>
          v3.0 - Third Time's The Charm{"\n"}{"\n"}{"\n"}
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
