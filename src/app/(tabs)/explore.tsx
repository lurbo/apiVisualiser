import { StyleSheet, View, Text, Linking, Pressable, FlatList, Image} from 'react-native';
import { useLocalSearchParams, Link} from 'expo-router';

export default function explore() {

  const { kraj } = useLocalSearchParams();
  const url = `https://sl.wikipedia.org/wiki/${kraj}`
  const urlDva = `https://en.wikivoyage.org/wiki/${kraj}`
  const povezave = [
    { id: '1', ime: 'Wikipedija',slika: require('../../../assets/images/wikipedia.png')},
    { id: '2', ime: 'Wikivoyage', slika: require('../../../assets/images/wikivoyage.png')}, 
  ]
  return (
    <View style={styles.container}>
      <View style={styles.container90}>
      <Text style={styles.naslov}>
      {kraj}{"\n"}{"\n"}
      </Text>
      <FlatList
        data={povezave}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.povezava}
                onPress={() => {
                  if (item.id === '1') {
                    Linking.openURL(url);
                  }
                  else {
                    Linking.openURL(urlDva);
                  }
                }}
            >
              <Image
                source={item.slika}
                style={styles.slika}
              />
              <Text style={styles.wiki}>
                {item.ime}
              </Text>
            </Pressable>
           )}
        />

        <Link href={{
            pathname: '/',
          }}
            style={styles.more}>
              <Text>Nazaj</Text>
            </Link>
      </View>
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

  wiki: {
    fontSize: 25,
    color: '#000000',
    
  },

    povezava: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    padding: 10,
    marginBottom: 15,
  },

  slika: {
    width: 60,
    height: 60,
    marginRight: 15,
    resizeMode: 'contain',
  },


  container: {
    backgroundColor: '#97ABB1',
    flex: 1,
    alignItems: 'center',
  },

  more: {
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 5,
    width: 90,
    textAlign: 'center',
    fontSize: 20,
  },

  container90: {
    backgroundColor: '#97ABB1',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});