import PropTypes from 'prop-types';
import { ButtonStyled } from './Button.styled';

const Button = ({ label, onClick }) => {
  return <ButtonStyled onClick={onClick}>{label}</ButtonStyled>;
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
