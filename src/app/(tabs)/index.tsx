import { StyleSheet, View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


//definicija podatkov
interface vremenskiPodatki{ 
  temperature_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}



export default function HomeScreen() {
  const [weather, setWeather] = useState<vremenskiPodatki>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pridobiVreme = async () => {
      
      const url = "https://api.open-meteo.com/v1/forecast?latitude=46.3572&longitude=15.1128&current=temperature_2m,weather_code,wind_speed_10m"
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data.current);

      
      setLoading(false);
        
    };
    pridobiVreme();
  
  }, []);
    const naslov = 'https://' + 'geocoding-api.' + 'open-meteo.com' + '/v1/search?name=' + ime + '&count=1';

    const odgovor = await fetch(naslov);
    const podatek = await odgovor.json();

    const lat = podatek.results[0].latitude;
    const long = podatek.results[0].longitude;






  const [ime, setIme] = useState(''); //po prejšnji vaji
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
            Vnesi ime kraja:{"\n"} 
            </Text> 

            <TextInput
              placeholder="npr. Velenje..."
              value={ime}
              onChangeText={setIme}
              style={styles.vnosKraja} 
              />



          <Text style={styles.naslov}>
          Trenutni vremenski podatki za Velenje: {"\n"}
          </Text>
          <Text style={styles.opis}>Stopinje: {weather?.temperature_2m} °C{"\n"}{"\n"}{"\n"}</Text>
          <Text style={styles.opis}>Hitrost vetra: {weather?.wind_speed_10m} km/h </Text>
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
