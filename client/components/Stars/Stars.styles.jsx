import styled from 'styled-components';

export const Container = styled.div`
  line-height:18px;
  display: inline-block;
  vertical-align: middle;
`;

export const Svg = styled.svg`
  display: inline-block;
  height: 18px;
  width: 18px;
  color: ${(props) => props.theme.colors.darkGray};
  margin: 0 4px 4px 0;
`;
