import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import MapView, { Marker } from "react-native-maps"

export default function MomentCard({ moment }) {
    const dateObj = new Date(moment.created_at)
    const date = dateObj.toLocaleDateString("pt-BR")
    const time = dateObj.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    })
    return (
        <View style={styles.card}>
            <View style={styles.sideBar} />
            <View style={styles.content}>
                <Text style={styles.title}>
                    {moment.title}
                </Text>
                <View style={styles.metaRow}>
                    <Ionicons name="calendar-outline" size={16} color="#7C3AED" />
                    <Text style={styles.metaText}>
                        {date} • {time}
                    </Text>
                </View>
                <Text style={styles.description}>
                    {moment.description}
                </Text>
                {moment.latitude && moment.longitude && (
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: moment.latitude,
                            longitude: moment.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        scrollEnabled={false}
                        zoomEnabled={false}
                        rotateEnabled={false}
                        pitchEnabled={false}
                        toolbarEnabled={false}
                    >
                        <Marker
                            coordinate={{
                                latitude: moment.latitude,
                                longitude: moment.longitude,
                            }}
                        />
                    </MapView>
                )}
                {moment.latitude && moment.longitude && (
                    <Text style={styles.coords}>
                        {moment.latitude.toFixed(5)}, {moment.longitude.toFixed(5)}
                    </Text>
                )}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 18,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        overflow: "hidden",
    },

    sideBar: {
        width: 6,
        backgroundColor: "#7C3AED", // roxo do app
    },

    content: {
        flex: 1,
        padding: 16,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1E1E1E",
        marginBottom: 6,
    },

    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 10,
    },

    metaText: {
        fontSize: 13,
        color: "#7C3AED",
        fontWeight: "500",
    },

    description: {
        fontSize: 15,
        color: "#555",
        lineHeight: 20,
        marginBottom: 12,
    },

    map: {
        width: "100%",
        height: 140,
        borderRadius: 12,
        marginBottom: 8,
    },

    coords: {
        fontSize: 11,
        color: "#888",
    },
})