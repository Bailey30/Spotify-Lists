export type UserData = {
    name: string
    email: string
    profile: string
    image?: string | null
}

export type track = {
    artist: string
    album: string
    name: string
    preview_url: string
    uri: string
    image?: string
    duration: number
    artistURI: string
}