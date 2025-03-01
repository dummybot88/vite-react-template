export interface ComicDetails {
  title: string
  poster: string
}

export interface GetComicsResponse {
  comics: ComicDetails[]
}

export interface GetComicsResult {
  fetchComics: GetComicsResponse
}

export interface ComicState extends GetComicsResponse {}

export const initialState: ComicState = {
  comics: []
}
