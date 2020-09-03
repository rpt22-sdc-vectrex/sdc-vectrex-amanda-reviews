import styled from 'styled-components';

export const ProductInfoContainer = styled.div`
  margin-left: 48px;
  font-size: ${(props) => props.theme.fontSize.extraSmall};
`;

export const Paragraph = styled.p`
  margin-top: 0px;
  margin-bottom: 3px;
  color: ${(props) => props.theme.colors.middleGray};
`;
