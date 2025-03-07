import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const DB_PATH = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../db.json');

export const getDB = async () => {
    const db = await fs.readFile(DB_PATH, 'utf-8');

    return JSON.parse(db);
}

export const saveDB = async (db) => {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))

    return db;
}

export const insertDB = async (note) => {
    const db = await getDB();

    db.notes.push(note);
    await saveDB(db)

    return note
}


