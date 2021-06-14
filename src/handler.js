const { nanoid } = require('nanoid'); //library pihak ketiga untuk id yang unique
const notes = require('./notes');
const addNoteHandler = (request,h) => { //menyimpan catatan
    const {title= "untitled", tags, body} = request.payload; //mendapatkan body request (title, tags, body) menggunakan request.payload

    const id = nanoid(16) //untuk membuat id unik, menggunakan library pihak ketiga npm install nanoid
    const createdAt = new Date().toISOString(); //menyimpan properti createdAt, menggunakan standar ISO
    const updatedAt = createdAt; //menyimpan properti updatedAt, updatedAt sama dengan createdAt karena dua variabel ini untuk membuat catatan baru maka dari itu sama

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    notes.push(newNote); //menyimpan semua nilai ke dalam array notes

    const isSuccess = notes.filter((note)=>note.id === id).length>0; //ngecek apakah new note sudah masuk ke array notes dengan fungsi filter

    if(isSuccess) //jika isSuccess == true maka muncul ini
    {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            }
        });
        response.code(201);
        return response;
    }
    else if (!isSuccess) //jika isSuccess == false maka muncul ini
    {
        const response = h.response({
            status: 'fail',
            message: 'catatan berhasil ditambahkan'
        });
        response.code(500);
        return response;
    }
};

const getAllNotesHandler = ()=>({ //get semua catatan, tidak perlu menuliskan parameter request dan h karena ia tidak digunakan.
    status: 'success', //menampilkan pesan success
    data: { //mengembalikan data berupa notes
        notes,
    }
});

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params; //get id
    const note = notes.filter((n)=>n.id === id)[0]; //memanfaatkan method array filter() untuk mendapatkan objeknya
    if(note !== undefined)
    {
        return {
            status: 'success',
            data: {
                note, //dari variabel note diatas
            },
        };
    }
    const response = h.response({
        status:'fail',
        message:'Catatan Tidak Ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request,h) =>{ //handler pada Hapi memiliki 2 parameter, yaitu request dan h
    const {id} = request.params; //mendapatkan id terlebih dahulu
    
    const {title, tags, body} = request.payload; //mendapatkan data notes yang terbaru yang dikirimkan oleh melalui body request
    const updatedAt = new Date().toISOString(); //memberikan variabel updatedAt dengan tanggal terbaru

    //mengubah catatan lama dengan data terbaru dengan memanfaatkan indexing array
    const index = notes.findIndex((note)=>note.id===id); //mendapatkan index array pada objek catatan sesuai id yang ditentukan
    
    //jika note dengan id yang dicari tidak ditemukan maka index bernilai -1
    //jika note dengan id yang dicari ditemukan maka index akan berisi array index dari objek catatan yang dicari
    if(index !== -1)
    {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
    const response = h.response({
        status: 'success',
        message: 'Catatan Berhasil Diperbarui',
    })
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal menemukan catatan. ID tidak ditemukan',
    })
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request,h) => {
    const {id} = request.params; //get id dahulu

    const index = notes.findIndex((note)=>note.id===id); //mendapatkan index dari objek catatan

    if(index !== -1)
    {
        notes.splice(index,1) //menghapus data pada array berdasarkan index
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. ID tidak ditemukan',
    });
    response.code(404);
    return response;
};


module.exports = {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler};