export interface Movie {
    _id : string
    titleid : number
    title : string
    genres : [string]
    poster : string
    release_dt : Date
    overview : string
}

export interface UploadResponse {
    ipfs_hash: string
}