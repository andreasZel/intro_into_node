import { beforeEach, jest } from '@jest/globals';

jest.unstable_mockModule('../src/db.js', () => {
    return {
        insertDB: jest.fn(),
        getDB: jest.fn(),
        saveDB: jest.fn()
    }
})

beforeEach(() => {
    insertDB.mockClear();
    getDB.mockClear();
    saveDB.mockClear();
})

const { insertDB, getDB, saveDB } = await import('../src/db.js');
const { newNote, getAllNotes, deleteNote } = await import('../src/notes.js');

test("newNote() adds a new note and returns it", async () => {
    const noteToAdd = {
        content: 'test',
        id: 1,
        tags: ['test']
    }

    insertDB.mockResolvedValue(noteToAdd);
    let result = await newNote(noteToAdd.content, noteToAdd.tags)
    expect({ ...result, id: 1 }).toEqual({ ...noteToAdd, id: 1 })

})

test("getAllNotes() returns all notes", async () => {
    const db = {
        notes: ['note1', 'note2']
    }

    getDB.mockResolvedValue(db);
    let result = await getAllNotes();

    expect(result).toEqual(db.notes)

})

test('deleteNote() does nothing if id is not found', async () => {
    const notes = [
        { id: 1, content: 'note 1' },
        { id: 2, content: 'note 2' },
        { id: 3, content: 'note 3' },
    ];
    saveDB.mockResolvedValue(notes);

    const idToRemove = 4;
    const result = await deleteNote(idToRemove);
    expect(result).toBeUndefined();
});