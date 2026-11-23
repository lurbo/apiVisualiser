import { StyleSheet, View, Text, Linking, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, Link} from 'expo-router';

export default function explore() {

  const { kraj } = useLocalSearchParams();
  const url = `https://sl.wikipedia.org/wiki/${kraj}`
  return (
    <View style={styles.container}>
      <View style={styles.container90}>
      <Text style={styles.naslov}>
      {kraj}{"\n"}{"\n"}
      </Text>
      <Pressable onPress={() => Linking.openURL(url)}>
          <Text style={styles.wiki}>Wikipedija{"\n"}{"\n"}</Text>
        </Pressable>

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