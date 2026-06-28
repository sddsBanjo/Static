import { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { addMoment } from '../database/database'
import * as Location from 'expo-location'

export default function AddMomentScreen({ onMomentSaved }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  async function getCurrentLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      throw new Error('Permissão de localização negada.')
    }

    const location = await Location.getCurrentPositionAsync({})

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
  }

  async function handleSave() {
    try {
      const location = await getCurrentLocation()
      
      await addMoment(
        title,
        description,
        location.latitude,
        location.longitude
      )

      setTitle('')
      setDescription('')

      onMomentSaved()

      console.log('Momento salvo!')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Título</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Nosso momento especial!"
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 10
        }}
      />

      <Text>Descrição</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder={"Conte um pouco sobre o momento..."}
        style={{
          borderWidth: 1,
          marginBottom: 20,
          padding: 10
        }}
      />

      <Button
        title="Salvar Momento"
        onPress={handleSave}
      />
    </View>
  )
}