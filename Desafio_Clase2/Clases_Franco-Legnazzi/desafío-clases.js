class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `Nombre y apellido del usuario: ${this.nombre} ${this.apellido}.`
    }
 
    addMascotas(mascota){
        this.mascotas.push(mascota)
    }

    countMascotas(){
        return `El número de mascotas del usuario ${this.nombre} ${this.apellido} es de ${this.mascotas.length}.`
    }   

    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor})
    }

    getBookNames(){
        const nombres = []
        for (let libro of this.libros){
            nombres.push(libro.nombre)
        } 

        return nombres
    }
}

const usuario = new Usuario("Carlos", "Fabio", [{nombre: "El retrato de Dorian Gray", autor: "Oscar Wilde"}, {nombre: "Moby Dick", autor: "Herman Melville"}], ["perro", "loro", "conejo"])

console.log(usuario)

console.log(usuario.getFullName())

usuario.addMascotas("gato")

console.log(usuario.countMascotas())

usuario.addBook("Código limpio", "Robert C.Martin")

console.log(usuario.getBookNames())