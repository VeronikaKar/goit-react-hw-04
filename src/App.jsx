import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { fetchData } from "../src/service/photosApi.js";
import {
  SearchBox,
  ImageGallery,
  Loader,
  ErrorMessage,
  LoadMoreBtn,
  ImageModal,
} from "components";
import "./index.css";

function App() {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query) {
      const fetchImages = async () => {
        setIsLoading(true);
        setIsError(false);

        try {
          const { data } = await fetchData(query, page);
          // Append new results to existing gallery
          setGallery((prevGallery) => [...prevGallery, ...data.results]);
          // Determine if there are more pages to load
          setHasMore(data.results.length > 0 && page < data.total_pages);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };

      fetchImages();
    }
  }, [query, page]); // Dependency on query and page

  const handleSearchQuery = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1); // Reset page to 1 when performing a new search
    setGallery([]); // Clear existing gallery on new search
    setHasMore(true); // Reset hasMore to true for new search
    setModalIsOpen(false); // Close modal on new search
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment page if there are more results
    }
  };

  const handleImgClick = (url, alt) => {
    setModalImg({ url, alt });
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="app-container">
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBox onSubmit={handleSearchQuery} />
      {gallery.length > 0 && (
        <ImageGallery onClick={handleImgClick} gallery={gallery} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {modalIsOpen && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          onRequestClose={handleModalClose}
          modalImg={modalImg}
        />
      )}
      {hasMore && (
        <div className="load-more-container">
          <LoadMoreBtn onClick={handleLoadMore} />
        </div>
      )}
    </div>
  );
}

export default App;
