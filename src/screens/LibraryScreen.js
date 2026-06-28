import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Alert, FlatList, StyleSheet } from 'react-native'
import MomentCard from "../components/MomentCard"
import { getMoments, deleteMoment } from '../database/database'

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

  function handleDeleteMoment(moment) {
    Alert.alert(
      "Excluir momento",
      "Tem certeza que deseja excluir esse momento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await deleteMoment(moment.id)
            console.log(`Momento ${moment.title} (ID ${moment.id}) deletado com sucesso.`)
            await loadMoments()
          }
        }
      ]
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={moments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MomentCard moment={item} onDelete={() => handleDeleteMoment(item)} />
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