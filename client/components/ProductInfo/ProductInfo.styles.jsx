import styled from 'styled-components';

export const Container = styled.div`
  margin-left: 48px;
  font-size: 13px;
`;

export const Paragraph = styled.p`
  margin-top: 0px;
  margin-bottom: 3px;
  color: ${(props) => props.theme.colors.middleGray};
`;
