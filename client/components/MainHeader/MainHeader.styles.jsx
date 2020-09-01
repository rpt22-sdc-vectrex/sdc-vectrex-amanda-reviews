import styled from 'styled-components';

const MainHeading = styled.h3`
font-family: ${(({ theme: { fonts } }) => `${fonts[1]}`)};
font-size: 26px;
font-weight: 300;
display: inline-block;
-webkit-font-smoothing: antialiased;
line-height: 42px;
margin: 0 6px 0 0;
`;

export default MainHeading;
