/* eslint-disable no-unused-vars */
import { useState,useEffect } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import Button from "./components/Button";
import Loader from "./components/Loader";
import s from "./App.module.css";

export default function App () {

  const [pictureName, setPictureName] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [largeImageURL, setLargeImageURL] = useState(null);

  useEffect(() => {
     if (!pictureName)
    return;
    setStatus('pending');
    setPictures([]);
    setPage(1);
    setTimeout(() => {
      pictureAPI();
    }, 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pictureName]);

  const pictureAPI = () => {
    const key = "23947692-766c5aa41098b9126601621b0";
    const perPage = 12;

    setStatus('pending');  
    fetch(
      `https://pixabay.com/api/?q=${pictureName}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
      .then((res) => res.json())
      .then((images) => {
        setPictures(prevState => [...prevState, ...images.hits]);
        setStatus('resolved');
        setPage(prevState => prevState + 1);
        console.log(pictureName);
        if (page > 1) {
          scroll();
        }
      });

  };

  

const searchPictures = (picture) => {
  if (picture === pictureName) return;
  setPictureName(picture);
  setPage(1);
  setPictures([]);
};


  const modalControl = () => {
    setShowModal(!showModal)
  };

  const getLargeIMG = ({ largeImageURL }) => {
    setLargeImageURL(largeImageURL);
    modalControl();
  };

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const getMore = () => {
    pictureAPI();
  };


    
  return (
    <div className={s.App}>
      <Searchbar onSubmit={searchPictures} />
      {status === "pending" && <Loader />}
      {status === "rejected" && <p>Error</p>}
      {status === "resolved" && (
        <ImageGallery pictures={pictures} getLargeIMG={getLargeIMG} />
      )}
      {pictures.length > 0 && <Button getMore={getMore} />}
      {showModal && (
        <Modal onClose={modalControl}>
          <img
            src={largeImageURL}
            width="800"
            height="600"
            alt="Large_Image"
          />
          {/* {console.log(largeImageURL)} */}
        </Modal>
      )}
    </div>
  );
}