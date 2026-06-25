import { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { addMoment } from '../database/database'

export default function AddMomentScreen() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  async function handleSave() {
    try {
      await addMoment(
        title,
        description,
        null,
        null
      )

      setTitle('')
      setDescription('')

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