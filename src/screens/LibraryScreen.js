import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, StyleSheet } from 'react-native'
import MomentCard from "../components/MomentCard"
import { getMoments } from '../database/database'

export default function LibraryScreen({ reloadLibrary }) {
  const [moments, setMoments] = useState([])

  async function loadMoments() {
    console.log("Carregando momentos...")
    const data = await getMoments()
    setMoments(data)
  }
  
  useEffect(() => {
    loadMoments()
  }, [reloadLibrary])

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={moments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MomentCard moment={item} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
    padding: 16,
  },
});