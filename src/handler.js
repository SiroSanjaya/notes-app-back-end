const { nanoid } = require('nanoid'); // Pastikan untuk mengimpor nanoid
const notes = []; // Pastikan notes dideklarasikan

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title,
        tags,
        body,
        id,
        createdAt,
        updatedAt,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

// Definisikan getAllNotesHandler secara terpisah
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

// Ekspor handler
module.exports = { addNoteHandler, getAllNotesHandler };