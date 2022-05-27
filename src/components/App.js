import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: '',
  };

  handleSearchChange = newQuery => {
    this.setState({ query: newQuery });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearchChange} />
        <ImageGallery query={query} />
      </>
    );
  }
}
