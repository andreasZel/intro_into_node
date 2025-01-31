#!/usr/bin/env node

const note = ProcessingInstruction.argv[2];

const newNote = {
    content: note,
    id: Date.now()
}

