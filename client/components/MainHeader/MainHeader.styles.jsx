import styled from 'styled-components';

const MainHeading = styled.h3`
  font: ${(props) => props.theme.fontShorthand.baseHeading};
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  margin: 0 6px 0 0;
`;

export default MainHeading;
