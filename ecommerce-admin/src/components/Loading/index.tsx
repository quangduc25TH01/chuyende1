import styled from 'styled-components';

const LoadingStyled = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  & .loader {
    border: 4px solid #f3f3f3;
    border-radius: 50%;
    border-top: 4px solid #2a2f3a;
    width: 50px;
    height: 50px;
    position: absolute;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }
`;
const Loading = () => {
  return (
    <LoadingStyled>
      <div className="loader"></div>
    </LoadingStyled>
  );
};

export default Loading;
