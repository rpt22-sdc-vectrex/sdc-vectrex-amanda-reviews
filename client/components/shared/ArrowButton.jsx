import styled from 'styled-components';

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  left: ${(props) => (props.isLeft ? 0 : 100)}%;
  margin-left: ${(props) => (props.isLeft ? 24 : -67)}px;
  margin-top: -12px;
  height: 48px;
  width: 48px;
  padding: 12px;
  border-radius: 24px;
  background-color: #fff;
  border: none;
  outline: none;
  z-index: 1;
`;

export default ArrowButton;
