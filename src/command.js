import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { getAllNotes, newNote, removeAllNotes, deleteNote, findNotes } from './notes.js';

const listNotes = (notes) => {
    notes.forEach(note => {
        console.log('\n')
        console.log('id: ', note.id)
        console.log('tags: ', note.tags.join(', ')),
            console.log('note: ', note.content)
    })
}

yargs(hideBin(process.argv))
    .command('new <note>', 'create a new note', yargs => {
        return yargs.positional('note', {
            describe: 'The content of the note you want to create',
            type: 'string'
        })
    }, async (argv) => {
        const tags = argv?.tags ? argv?.tags.split(',') : [];
        const note = argv?.note;

        const newNoteSaved = await newNote(note, tags);
        console.log('Added new Note', newNoteSaved)
    })
    .option('tags', {
        alias: 't',
        type: 'string',
        description: 'tags to add to the note'
    })
    .command('all', 'get all notes', () => { }, async (argv) => {
        const notes = await getAllNotes();
        listNotes(notes);
    })
    .command('find <filter>', 'get matching notes', yargs => {
        return yargs.positional('filter', {
            describe: 'The search term to filter notes by, will be applied to note.content',
            type: 'string'
        })
    }, async (argv) => {
        const matches = await findNotes(argv.filter);

        listNotes(matches);
    })
    .command('remove <id>', 'remove a note by id', yargs => {
        return yargs.positional('id', {
            type: 'number',
            description: 'The id of the note you want to remove'
        })
    }, async (argv) => {
        const id = await deleteNote(argv.id);
        console.log(id ? `deleted ${id}` : `note with id: ${id} does not exist`)
    })
    .command('web [port]', 'launch website to see notes', yargs => {
        return yargs
            .positional('port', {
                describe: 'port to bind on',
                default: 5000,
                type: 'number'
            })
    }, async (argv) => {

    })
    .command('clean', 'remove all notes', () => { }, async (argv) => {
        await removeAllNotes();
        console.log('Removed all notes')
    })
    .demandCommand(1)
    .parse()