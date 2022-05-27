import { Component } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';

import {
  SearchbarStyled,
  SearchForm,
  Button,
  Input,
  Label,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = event => {
    event.preventDefault();

    const { query } = this.state;
    const { onSubmit } = this.props;

    if (query.trim() !== '') {
      onSubmit(query);
      this.setState({ query: '' });
    }
  };

  handleInput = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    const { query } = this.state;

    return (
      <SearchbarStyled>
        <SearchForm onSubmit={this.handleSubmit}>
          <Button type="submit">
            <BsSearch />
            <Label>Search</Label>
          </Button>

          <Input
            onChange={this.handleInput}
            value={query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarStyled>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
