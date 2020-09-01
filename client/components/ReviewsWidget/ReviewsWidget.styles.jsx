import styled from 'styled-components';

const Container = styled.div`
  font-weight: 300;
  font-family: ${(props) => props.theme.fonts[0]};
  line-height: 150%;
  letter-spacing: 0.4px;
  width: 830px;
`;

export default Container;
