/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query'
import { graphQlOperation } from '../api/configureGraphql'
import { fetchComics } from '../components/comic/graphql/query'
import { useEffect } from 'react'
import { GetComicsResult } from '../store/comics/types'
import { setComics } from '../store/comics/comicStore'

const useFetchComics = () => {
  // fetch the issues
  const { isSuccess, data, isFetching, status } = useQuery({
    queryKey: ['fetchComics'],
    queryFn: () => graphQlOperation({} as GetComicsResult, fetchComics, {})
  })

  const processComicsResult = () => {
    if (isSuccess) {
      const {
        data: {
          fetchComics: { comics: comicDetails }
        }
      } = data
      setComics(comicDetails)
    }
  }

  useEffect(() => {
    let isCancelled = false
    if (!isCancelled) {
      processComicsResult()
    }
    // Clean up function to avoid race conditions
    return () => {
      isCancelled = false
    }
  }, [isSuccess, data])

  return { isFetching, status }
}

export default useFetchComics
