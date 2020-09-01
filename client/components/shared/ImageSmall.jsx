import styled from 'styled-components';

const ImageSmall = styled.img`
width: 36px;
height: 36px;
border-radius: ${(props) => props.bRadius || '6px'};
margin-right: 12px;
float:left;
`;

export default ImageSmall;
