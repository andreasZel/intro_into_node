import fs from 'nnode:fs/promises';

const DB_PATH = path.join("..", "db.json");

export const getDB = async () => {
    const db = await fs.readFile(DB_PATH, 'utf-8');

    return JSON.parse(db);
}

export const saveDB = async (db) => {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))

    return db;
}

export const appendDB = async (note) => {
    const db = getDB();

    db.notes.push(note);
    await saveDB(db)

    return note
}


