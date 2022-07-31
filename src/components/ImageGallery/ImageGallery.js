import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/UI/Button/Button';
import Loader from 'components/UI/Loader/Loader';
import Modal from 'components/UI/Modal/Modal';
import { ImageGalleryStyled } from './ImageGallery.styled';

const ImageGallery = ({ query, items, loading, largeImg, onLoadMore, onImgClick }) => {
  return (
    <div>
      <ImageGalleryStyled id="gallery">
        {items.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            onClick={onImgClick}
            key={id}
            small={webformatURL}
            large={largeImageURL}
            alt={query}
          />
        ))}
      </ImageGalleryStyled>

      {loading && <Loader />}

      {items.length > 0 && !loading && (
        <Button onClick={onLoadMore} label="Load more" />
      )}

      {largeImg && (
        <Modal img={largeImg} alt={query} onHide={onImgClick} />
      )}
    </div>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  largeImg: PropTypes.string,
  onLoadMore: PropTypes.func.isRequired,
  onImgClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  })),
}

export default ImageGallery;
