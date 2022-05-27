import PropTypes from 'prop-types';
import { GallaryItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ large, small, alt, onClick }) => {
  return (
    <GallaryItem onClick={() => onClick(large)}>
      <Image src={small} alt={alt} />
    </GallaryItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  large: PropTypes.string.isRequired,
  small: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
