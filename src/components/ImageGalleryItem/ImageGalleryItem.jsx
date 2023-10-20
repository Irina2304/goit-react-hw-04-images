
import { useState } from "react";
import { ImgGalleryItem, ImageGalleryItemImg } from './ImageGalleryItem.styled';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';


export const ImageGalleryItem = ({ data, dataModal, tags }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);


  const toggleModal = () => {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true)
  }


  return (
    
      <ImgGalleryItem className="galleryItem">
        <ImageGalleryItemImg src={data} alt={tags} onClick={toggleModal}/>
      
        <ModalWindow
          isModalOpen={isModalOpen}
          closeModal={toggleModal}
          dataModal={dataModal}
          tags = {tags}
        />
        
      </ImgGalleryItem>
  );
}


