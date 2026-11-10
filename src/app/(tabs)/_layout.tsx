import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Domov', 
        tabBarStyle: {backgroundColor: '#4F759B'},
        headerStyle: {backgroundColor: '#4F759B'},
        headerTitleStyle: {color: 'white', fontSize: 30},
        tabBarLabelStyle: {color: 'white', fontSize: 15}}}/>

      <Tabs.Screen name="explore" options={{ title: 'Podrobnosti',
        tabBarStyle: {backgroundColor: '#4F759B'},
        headerStyle: {backgroundColor: '#4F759B'},
        headerTitleStyle: {color: 'white', fontSize: 30},
        href: null,
        tabBarLabelStyle: {color: 'white', fontSize: 15}}} />

        <Tabs.Screen name="about" options={{ title: 'O aplikaciji',
        tabBarStyle: {backgroundColor: '#4F759B'},
        headerStyle: {backgroundColor: '#4F759B'},
        headerTitleStyle: {color: 'white', fontSize: 30},
        tabBarLabelStyle: {color: 'white', fontSize: 15}
        }}/>
    </Tabs>
  );
}

