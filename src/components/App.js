import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import pixabayAPI from '../services/pixabay-api';

export class App extends Component {
  state = {
    query: '',
    loading: false,
    page: 1,
    largeImg: null,
    items: [],
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;

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
    const { query } = this.state;
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

  handleSearchChange = newQuery => {
    this.setState({ query: newQuery });
  };

  render() {
    const { query, items, loading, largeImg, } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearchChange} />
        {items.length !== 0 && <ImageGallery query={query} items={items} loading={loading} largeImg={largeImg} onLoadMore={this.handleLoadMore} onImgClick={this.handleImgClick} />}
      </>
    );
  }
}
