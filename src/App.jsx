import { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState, useCallback } from "react";
import { fetchData } from "../src/service/photosApi.js";
import { SearchBox, ImageGallery, Loader, ErrorMessage, LoadMoreBtn, ImageModal } from "components";
import useLocalStorage from "../src/hooks/useLocalStorage.js"; 
import './index.css'; 
function App() {
  const [gallery, setGallery] = useLocalStorage("gallery", []);
  const [query, setQuery] = useLocalStorage("query", "");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLimit, setIsLimit] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const page = useRef(1);
  const img = useRef(null);
  const modalImg = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      window.scrollBy({
        top: img.current?.getBoundingClientRect().height * 2,
        behavior: "smooth",
      });
    }
  }, [gallery]);

  const handleSearchQuery = useCallback(async (searchQuery) => {
    try {
      setGallery([]);
      setIsLoading(true);
      setIsError(false);
      setIsLimit(false);
      setQuery(searchQuery);

      page.current = 1;

      const { data } = await fetchData(searchQuery, page.current);

      setGallery(data.results);

      if (data.total_pages > page.current) {
        setIsLimit(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [setGallery, setQuery]);

  const handleLoadMore = useCallback(async () => {
    try {
      setIsLoading(true);

      page.current += 1;
      isFirstRender.current = false;

      const { data } = await fetchData(query, page.current);

      setGallery((prevGallery) => [...prevGallery, ...data.results]);

      if (page.current >= data.total_pages) {
        setIsLimit(false);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [query, setGallery]);

  const handleImgClick = useCallback((url, alt) => {
    modalImg.current = { url, alt };
    setModalIsOpen(true);
  }, []);

  const handleModalClick = useCallback((event) => {
    if (event.target.nodeName !== "DIV") return;
    setModalIsOpen(false);
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Image Gallery App</h1>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBox onSubmit={handleSearchQuery} />
      {gallery.length > 0 && (
        <ImageGallery onClick={handleImgClick} ref={img} gallery={gallery} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isLimit && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
      {modalIsOpen && (
        <ImageModal
          onClick={handleModalClick}
          modalIsOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          modalImg={modalImg.current}
        />
      )}
    </div>
  );
}

export default App;
