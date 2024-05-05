//express
const express = require('express');
const app = express();
const PORT = 3000; // puede cambiar

//array 
let librosBiblicos = [
    {id: 1 , nombre: 'Genesis', autor: 'Moises', anioPublicacion:2020},
    {id: 2 , nombre: 'Exodo', autor: 'Moises', anioPublicacion:2024},
    {id: 3 , nombre: 'Levitico', autor: 'Moises', anioPublicacion:1990},
    {id: 4 , nombre: 'Hechos', autor: 'Pablo', anioPublicacion:1990},
    {id: 5 , nombre: 'Romanos', autor: 'Pablo', anioPublicacion:1990},
    {id: 6 , nombre: 'Lucas', autor: 'Lucas', anioPublicacion:1990},
    {id: 7 , nombre: 'Apocalipsis', autor: 'Juan', anioPublicacion:1990},
];
//manejo de JSON
app.use(express.json());
//endpoint 1 obtener todos los libros
app.get('/libros', (req, res) => {
    res.json(librosBiblicos);
});
// endpoint 2 obtener libro por ID
app.get('/libros/:id',(req, res) => {
    const idCapturado = parseInt(req.params.id);
    console.log(idCapturado);
    const libroEncontrado = librosBiblicos.find((libro) => libro.id === idCapturado);
    if (libroEncontrado) {
        res.json(libroEncontrado);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
// endpoint 3 Agregar un libro
app.post('/agregar-libro', (req, res) => {
    const nuevoLibro = req.body;
    console.log(nuevoLibro);
    librosBiblicos.push(nuevoLibro);
    res.status(201).json('este libro fue guardado exitosamente');
})
// endpoint 4 Actualizar el libro
app.put('/actualizar-libro/:id', (req, res) => {
    const idCapturado = parseInt(req.params.id);
    const indexLibroLocalizado = librosBiblicos.findIndex((libro) => libro.id === idCapturado);
    if (indexLibroLocalizado !== -1 ){
        librosBiblicos[indexLibroLocalizado] = req.body;
        res.json(librosBiblicos[indexLibroLocalizado]);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
// endpoint 5 Eliminar Libro
app.delete('/eliminar-libro/:id', (req, res) => {
    const id = parseInt(req.params.id);
    lBiblico = librosBiblicos.filter( libro => libro.id !== id);
    res.status(201).json({mensaje : 'se ha eliminado el libro'});
    console.log(lBiblico);
});
//endpoint 6 
app.get('/libros/publicacion/:anio', (req, res) => {
    const year =  parseInt(req.params.anio);
    const librosPublicados = librosBiblicos.filter( x => x.anioPublicacion === year);
    if (librosPublicados.length > 0) {
        res.json(librosPublicados);
    } else {
        res.status(404).json({mensaje : 'no se han encontrado libros publicados en ese anio'});
    }
});

//EP 1- Obtener un endpoint de bienvenida con su nombre y su profesion actual
app.get('/bienvenida', (req, res) => {
    const nombre =  "Norberto Quispe Flores";
    const profesion =  "Informático";
    res.json({nombre:nombre,profesion:profesion});
});



//EP 2  -Obtener libros por autor
app.get('/libros-autor/:autor', (req, res) => {
    const autor =req.params.autor;
    const librosPublicados = librosBiblicos.filter( x => x.autor.toLowerCase() === autor.toLowerCase());
    if (librosPublicados.length > 0) {
        res.json(librosPublicados);
    } else {
        res.status(404).json({mensaje : 'no se han encontrado libros correspondientes al autor:'+autor});
    }
});


//EP 3  -Obtener la cantidad total de libros
app.get('/total-libros', (req, res) => {
    const totalLibros = librosBiblicos.length;
    res.json({mensaje:"El total de libros son: " + totalLibros});
   
});



//EP 4  -Obtener libros por nombre que contenga el texto "Juan"
app.get('/libros-nombre/:texto', (req, res) => {
    const texto =req.params.texto;
    const librosPublicados = librosBiblicos.filter( x => x.nombre.toLowerCase().indexOf(texto.toLowerCase())!=-1 );
    if (librosPublicados.length > 0) {
        res.json(librosPublicados);
    } else {
        res.status(404).json({mensaje : 'no se han encontrado libros cuyos nombres contengan el texto:'+texto});
    }
});



// Ordenar libros por nombre
//EP 5  - Obtener libros por nombre que contenga el texto "Juan"
app.get('/libros-ordenar-nombre', (req, res) => {
    const  tipo=req.params.tipo;
    var librosPublicados;
   librosPublicados =librosBiblicos;
   librosPublicados.sort(function(a, b) {
    var textA = a.nombre;
    var textB = b.nombre;
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    
    if (librosPublicados.length > 0) {
        res.json(librosPublicados);
    } else {
        res.status(404).json({mensaje : 'no se han encontrado libros cuyos nombres contengan el texto:'+texto});
    }
});

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT);
});