import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Location from 'expo-location'

import { addMoment } from '../database/database'

export default function AddMomentScreen({ onMomentSaved }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [saving, setSaving] = useState(false)

    async function getCurrentLocation() {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            throw new Error('Permissão de localização negada.')
        }
        const location = await Location.getCurrentPositionAsync({})
        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        }
    }

    async function handleSave() {
        if (!title.trim()) {
            Alert.alert(
                "Título obrigatório",
                "Digite um título para o momento."
            )
            return
        }
        try {
            setSaving(true)
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
            Alert.alert(
                "Momento salvo!",
                "Seu momento foi adicionado à biblioteca."
            )
        } catch (error) {
            console.log(error)
            Alert.alert(
                "Erro",
                "Não foi possível salvar o momento."
            )
        } finally {
            setSaving(false)
        }
    }

    return (
        <SafeAreaView
            style={styles.container}
            edges={['top']}
        >
            <View style={styles.form}>
                <Text style={styles.title}>
                    Novo Momento
                </Text>
                <Text style={styles.subtitle}>
                    Registre um momento especial para recordar depois!
                </Text>
                <View style={styles.inputContainer}>
                    <Ionicons
                        name="bookmark-outline"
                        size={20}
                        color="#7C3AED"
                    />
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Título do momento"
                        placeholderTextColor="#999"
                        style={styles.input}
                    />
                </View>
                <View style={[styles.inputContainer, styles.descriptionContainer]}>
                    <Ionicons
                        name="document-text-outline"
                        size={20}
                        color="#7C3AED"
                        style={{ marginTop: 12 }}
                    />
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Conte um pouco sobre esse momento..."
                        placeholderTextColor="#999"
                        multiline
                        textAlignVertical="top"
                        style={styles.descriptionInput}
                    />
                </View>
                <TouchableOpacity
                    style={[
                        styles.button,
                        saving && styles.buttonDisabled,
                    ]}
                    onPress={handleSave}
                    disabled={saving}
                >
                    <Text style={styles.buttonText}>
                        {saving
                            ? "Salvando..."
                            : "Salvar Momento"}
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F7",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    form: {
        width: "100%",
        maxWidth: 420,
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#1E1E1E",
        marginBottom: 6,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 15,
        color: "#777",
        textAlign: "center",
        marginBottom: 32,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 14,
        paddingHorizontal: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        paddingLeft: 12,
        fontSize: 16,
    },
    descriptionContainer: {
        alignItems: "flex-start",
        paddingTop: 2,
    },
    descriptionInput: {
        flex: 1,
        minHeight: 120,
        paddingTop: 14,
        paddingLeft: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#7C3AED",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 8,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 17,
        fontWeight: "700",
    },
})