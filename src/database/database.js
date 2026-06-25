import * as SQLite from 'expo-sqlite'

let db

export async function initDatabase() {
    db = await SQLite.openDatabaseAsync('moments.db')

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS moments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            latitude REAL,
            longitude REAL,
            created_at TEXT
        )
    `)

    return db
}

export function getDatabase() {
    return db
}

export async function addMoment(
    title,
    description,
    latitude,
    longitude
) {
    const db = getDatabase()

    await db.runAsync(
        `
            INSERT INTO moments
            (title, description, latitude, longitude, created_at)
            VALUES (?, ?, ?, ?, ?)
        `,
        [
            title,
            description,
            latitude,
            longitude,
            new Date().toISOString(),
        ]
    )
}

export async function getMoments() {
    const db = getDatabase()

    return await db.getAllAsync(
        'SELECT * FROM moments ORDER BY id DESC'
    )
}

export async function deleteMoment(id) {
    const db = getDatabase()

    await db.runAsync(
        'DELETE FROM moments WHERE id = ?',
        [id]
    )
}