import { Component } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/UI/Button/Button';
import Loader from 'components/UI/Loader/Loader';
import Modal from 'components/UI/Modal/Modal';

import pixabayAPI from '../../services/pixabay-api';
import { ImageGalleryStyled } from './ImageGallery.styled';

class ImageGallery extends Component {
  state = { loading: false, page: 1, largeImg: null, items: [] };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      this.setState({ page: 1 });
      return this.fetchItems(true);
    }

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevPage !== nextPage && nextPage !== 1) {
      this.fetchItems(false);
    }
  }

  fetchItems = isNewQuery => {
    const { query } = this.props;
    const page = isNewQuery ? 1 : this.state.page;

    this.setState({ loading: true });

    pixabayAPI
      .fetchImages(query, page)
      .then(data =>
        this.setState(prevState => ({
          items: isNewQuery ? data.hits : [...prevState.items, ...data.hits],
        }))
      )
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImgClick = largeImg => {
    this.setState({ largeImg });
  };

  handleModalClose() {
    this.setState({ largeImg: null });
  }

  render() {
    const { items, loading, largeImg } = this.state;
    const { query } = this.props;

    return (
      <div>
        <ImageGalleryStyled id="gallery">
          {items.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              onClick={this.handleImgClick}
              key={id}
              small={webformatURL}
              large={largeImageURL}
              alt={query}
            />
          ))}
        </ImageGalleryStyled>

        {loading && <Loader />}

        {items.length > 0 && !loading && (
          <Button onClick={this.handleLoadMore} label="Load more" />
        )}

        {largeImg && (
          <Modal img={largeImg} alt={query} onHide={this.handleImgClick} />
        )}
      </div>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  query: PropTypes.string,
};
