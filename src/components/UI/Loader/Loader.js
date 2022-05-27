import { ThreeDots } from 'react-loader-spinner';
import { LoaderStyled } from './Loader.styled';
const Loader = () => {
  return (
    <LoaderStyled>
      <ThreeDots color="#3f51b5" width={60} ariaLabel="loading" />;
    </LoaderStyled>
  );
};

export default Loader;
