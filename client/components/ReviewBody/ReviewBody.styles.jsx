import styled from 'styled-components';

export const Container = styled.div`
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
