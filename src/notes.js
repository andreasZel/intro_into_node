import { getDB, saveDB, insertDB } from "./db.js";

export const newNote = async (note, tags) => {
    const newNote = {
        tags,
        content: note,
        id: Date.now()
    }

    await insertDB(newNote);

    return newNote;
}

export const getAllNotes = async () => {

    const { notes } = await getDB();

    return notes;
}

export const findNotes = async (filter) => {

    const fetchednotes = await getAllNotes();
    const notes = fetchednotes.filter((note) => note.content.toLowerCase().includes(filter.toLowerCase()));

    return notes;
}

export const deleteNote = async (noteId) => {

    const fetchednotes = await getAllNotes();
    const note = fetchednotes.find((note) => note.id === noteId);

    if (note) {
        const newNotes = fetchednotes.filter((note) => note.id !== noteId);
        await saveDB({
            notes: newNotes
        });

        return id;
    }

}

export const removeAllNotes = async () => {
    await saveDB({ notes: [] })
}
