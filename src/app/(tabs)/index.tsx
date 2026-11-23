import { StyleSheet, View, Text, ScrollView, Pressable, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import { useEffect, useState} from 'react';
import {Link} from 'expo-router';

interface vremenskiPodatki{ 
  temperature_2m: number;
  wind_speed_10m: number;
}

export default function HomeScreen() {
  const [weather, setWeather] = useState<vremenskiPodatki>();
  const [loading, setLoading] = useState(false);
  const [ime, setIme] = useState(''); //po prejšnji vaji
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const pridobiVreme = async () => {
      if (ime == null || ime === '') {
        return;
      }

      setLoading(true);
      setError(false);

      try {
      const naslov = 'https://' + 'geocoding-api.' + 'open-meteo.com' + '/v1/search?name=' + ime + '&count=1';

      const odgovor = await fetch(naslov);
      const podatek = await odgovor.json();
      
      if (!podatek.results || podatek.results.length === 0) {
        throw new Error('Kraj ni bil najden');
      }

      const lat = podatek.results[0].latitude;
      const long = podatek.results[0].longitude;
      
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,wind_speed_10m`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data.current);
      }

      catch(error){
        setError(true);
    }
      
      finally{
      setLoading(false);
      setRefreshing(false);
      }
    };

    useEffect(() => {
    pridobiVreme();
  
  }, [ime]);
  
  const osvezi = () => {
    setRefreshing(true);
    pridobiVreme();
  }
  return (
    <View style={styles.ozadje}>
        <ScrollView
          contentContainerStyle={{ alignItems: 'center' }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={osvezi}
            />
          }
        >
      <View style={styles.container90}>
          <Text style={styles.naslov}>
            Vnesi ime kraja:{"\n"} {"\n"}
            </Text> 

            <TextInput
              placeholder="npr. Velenje..."
              value={ime}
              onChangeText={setIme}
              style={styles.vnosKraja} 
              />
        {error ? (
          <Text style={styles.naslov}>
            Napaka!
          </Text>
        ) : loading ? (
          <ActivityIndicator size="large" color="#ffffff"/>
        ) : (
          <>
          <Text style={styles.naslov}>
            {"\n"}Trenutni vremenski podatki za {ime}: {"\n"}
          </Text>
          <Text style={styles.opis}>{"\n"}Stopinje: {weather?.temperature_2m} °C{"\n"}{"\n"}</Text>
          <Text style={styles.opis}>Hitrost vetra: {weather?.wind_speed_10m} km/h{"\n"} </Text>
          <Link href={{
            pathname: '/explore',
            params: { kraj: ime }
          }}
            style={styles.more}>
            <Text>Več</Text>
          </Link>
        </>
      )}
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  naslov: {
    fontSize: 25,
    color: 'white',
    fontWeight: '800',
  },

  more: {
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 5,
    width: 50,
    textAlign: 'center',
    fontSize: 20,
  },

  opis: {
    fontSize: 20,
  },

  vnosKraja: {
    fontSize: 15,
    color: '#000000',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
    borderRadius: 5,
    textAlign: 'center',
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