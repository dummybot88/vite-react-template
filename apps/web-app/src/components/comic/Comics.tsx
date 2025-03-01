import { Fragment, useState } from 'react'
import useFetchComics from '../../hooks/useFetchComics'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useComicsData } from '../../store/comics/comicStore'

const Comics = () => {
  const { isFetching, status } = useFetchComics()
  const comics = useComicsData()

  const [currentIndex, setCurrentIndex] = useState(0) // State to keep track of the current comic

  const nextComic = () => {
    // Go to the next comic, or loop back to the first comic
    setCurrentIndex(prevIndex => (prevIndex + 1) % comics.length)
  }

  const prevComic = () => {
    // Go to the previous comic, or loop back to the last comic
    setCurrentIndex(prevIndex => (prevIndex - 1 + comics.length) % comics.length)
  }

  const currentComic = comics.length > 0 ? comics[currentIndex] : null

  const isLoading = isFetching || status === 'pending'

  return (
    <Fragment>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !currentComic && <div>No comics available</div>}
      {currentComic && (
        <div data-testid="web-app" className="container">
          <h1 className="title">Comics</h1>
          <div className="comicWrapper">
            <button onClick={prevComic} className="arrowButton arrowLeft">
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <img src={currentComic.poster} alt={currentComic.title} className="image" />

            <h2 className="comicTitle">{currentComic.title}</h2>

            <button onClick={nextComic} className="arrowButton arrowRight">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Comics
