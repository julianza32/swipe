export class Cancion{
    constructor(
        public _idCancion: String,
        public titulo: String,
        public artista: [],
        public genero: String,
        public album: String,
        public anio: Number,
        public letra: String,
        public imagenc: String,
        public reprod: Number,
        public archivo: String
    ){}
}