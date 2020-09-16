import styled from 'styled-components';

export const ReviewBodyContainer = styled.div`
  display: flex;
`;

export const TextContainer = styled.div`
  margin: 0 48px;
  flex: 3 1;
`;

export const ImageContainer = styled.div`
  flex: 1 1;
`;

export const Paragraph = styled.p`
  margin: 0 0 16px 0;
  padding-right: 30px;
  color: ${(props) => props.theme.colors.darkGray};
`;

export const ReviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background-color: #ddd;
`;
