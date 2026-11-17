import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { useEffect, useState} from 'react';

//definicija podatkov
interface vremenskiPodatki{ 
  temperature_2m: number;
  wind_speed_2m: number;
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

  return (
    <View style={styles.ozadje}>
      <View style={styles.container90}>
          <Text style={styles.naslov}>
          Trenutni vremenski podatki za Velenje: {"\n"}
          </Text>
          <Text style={styles.opis}>
            {"\n"}{"\n"}{"\n"}
            aaa
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
