import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { useEffect } from 'react'
import { initDatabase } from './src/database/database'


import LibraryScreen from './src/screens/LibraryScreen'
import AddMomentScreen from './src/screens/AddMomentScreen'

const Menu = createBottomTabNavigator()

export default function App() {
  useEffect(() => {
    async function startDatabase() {
      try {
        await initDatabase()
        console.log("Banco de dados inicializado com sucesso!")
      } catch (error) {
        console.log("Erro ao inicializar o banco de dados: ", {error})
      }
    }

    startDatabase()
  }, [])
  
  return (
    <NavigationContainer>
      <Menu.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let nomeIcone
            if (route.name === "Biblioteca") {
              nomeIcone = 'library-outline'
            } else if (route.name === 'Novo Momento') {
              nomeIcone = 'add-circle-outline'
            }
            return (
              <Ionicons name={nomeIcone} size={size} color={color} />
            )
          },
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: 'gray',
          }
        )}>
        <Menu.Screen name="Biblioteca" component={LibraryScreen} />
        <Menu.Screen name="Novo Momento" component={AddMomentScreen} />
      </Menu.Navigator>
    </NavigationContainer>
  )
}