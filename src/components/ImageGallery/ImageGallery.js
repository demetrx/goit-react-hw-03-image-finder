import { Component } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/UI/Button/Button';
import Loader from 'components/UI/Loader/Loader';
import Modal from 'components/UI/Modal/Modal';

import pixabayAPI from '../../services/pixabay-api';
import { ImageGalleryStyled } from './ImageGallery.styled';

class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string,
  }

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
      .then(data => {
        const items = data.hits.map(({ id, webformatURL, largeImageURL }) => ({ id, webformatURL, largeImageURL }));
        return this.setState(prevState => ({
          items: isNewQuery ? items : [...prevState.items, ...items],
        }))
      })
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

    if (items.length === 0) return null;

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
