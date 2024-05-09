import * as ExpoSQLite from "expo-sqlite";

const db = ExpoSQLite.openDatabaseSync("sessions.db");

export const SQLite = {
    createTableIfNotExits: async () => db.execAsync("CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, idToken TEXT NOT NULL, refreshToken TEXT NOT NULL, expiresIn NUMBER NOT NULL, registered BOOLEAN NOT NULL);"),
    insertData: async ({localId, email, idToken, refreshToken, expiresIn, registered}) => {
        const statement = await db.prepareAsync(
            'INSERT INTO sessions (localId, email, idToken, refreshToken, expiresIn, registered) VALUES ($localId, $email, $idToken, $refreshToken, $expiresIn, $registered)'
        );
        await statement.executeAsync({ $localId: localId, $email: email, $idToken: idToken, $refreshToken: refreshToken, $expiresIn: expiresIn, $registered: registered});
    },
    getData: async () => db.getAllAsync('SELECT * FROM sessions'),
    dropTable: async () => db.execAsync("DROP TABLE IF EXISTS sessions;"),
    clearTable: async () => db.execAsync("DELETE FROM sessions;"),
}

