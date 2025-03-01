import { create } from 'zustand'
import { ComicDetails, ComicState, initialState } from './types'

const useComicStore = create<ComicState>(() => ({
  ...initialState
}))

export const setComics = (comics: ComicDetails[]) => useComicStore.setState({ comics })

export const useComicsData = () => useComicStore(state => state.comics)

export default useComicStore
