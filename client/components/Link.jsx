import styled from 'styled-components';

const Link = styled.a`
  margin-right: 8px;
  color: ${(props) => props.theme.colors.middleGray};
  line-height:36px;
  &:hover {
    color: ${(props) => props.theme.colors.lightGray};
  }
`;

export default Link;
