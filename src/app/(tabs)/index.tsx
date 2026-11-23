import { StyleSheet, View, Text, ScrollView, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Link} from 'expo-router';

interface vremenskiPodatki{ 
  temperature_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}

export default function HomeScreen() {
  const [weather, setWeather] = useState<vremenskiPodatki>();
  const [loading, setLoading] = useState(false);
  const [ime, setIme] = useState(''); //po prejšnji vaji

  useEffect(() => {
    const pridobiVreme = async () => {
      if (ime == null || ime === '') {
        return;
      }

      setLoading(true);

      try {
      const naslov = 'https://' + 'geocoding-api.' + 'open-meteo.com' + '/v1/search?name=' + ime + '&count=1';

      const odgovor = await fetch(naslov);
      const podatek = await odgovor.json();

      const lat = podatek.results[0].latitude;
      const long = podatek.results[0].longitude;
      
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,weather_code,wind_speed_10m`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data.current);
      }

      catch(error){
    }
      
      finally{
      setLoading(false);
      }
    };
    pridobiVreme();
  
  }, [ime]);
  
  const shraniDogodek = async () => {
  const podatki = await AsyncStorage.getItem('dogodki');

  let dogodki;
  if (podatki){
    dogodki = JSON.parse(podatki);
  }
  else {
    dogodki = [];
  }

  dogodki.push({ //izvozi
    ime: ime,
  });

  await AsyncStorage.setItem('dogodki', JSON.stringify(dogodki)); //iz tabele v text

  setIme(''); //vrne v prvotno vrednost oz izbrise iz vnosnega polja
  };
  
  return (
    <View style={styles.ozadje}>
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
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
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