import { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'

import { getMoments } from '../database/database'

export default function LibraryScreen() {
  const [moments, setMoments] = useState([])

  async function loadMoments() {
    const data = await getMoments()
    setMoments(data)
  }
  
  useEffect(() => {
    loadMoments()
  }, [])

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={moments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              padding: 15,
              marginBottom: 10
            }}
          >
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
    />
  </View>
  );
}