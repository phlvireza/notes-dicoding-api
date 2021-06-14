const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require("./handler");
const routes = [
    {
        method: 'POST', //menyimpan catatan
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        method: 'GET', //menampilkan semua catatan
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        method: 'GET', //menampilkan catatan by id
        path:'/notes/{id}',
        handler: getNoteByIdHandler,
    },
    {
        method: 'PUT', //edit catatan
        path:'/notes/{id}',
        handler: editNoteByIdHandler,
    },
    {
        method: 'DELETE', //hapus catatan
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    }
]
module.exports = routes;