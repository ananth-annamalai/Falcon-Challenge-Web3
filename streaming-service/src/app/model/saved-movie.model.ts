export interface Movie {
    title : string
    release_dt : Date
    poster : string
    overview : string
    genres : [string]
    
}
export interface SavedMovie {
    infuraUrl : string
    movie: Movie
}