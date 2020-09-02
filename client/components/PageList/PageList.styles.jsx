import styled from 'styled-components';

export const List = styled.ul`
  list-style: none;
  padding: 6px;
  height: 36px;
  margin: 60px 0 30px;
`;

export const ListItem = styled.li`
  margin-right: 6px;
  display: inline-block;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  line-height: 36px;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: #efefef;
  color: ${(props) => props.theme.colors.paleGray};
`;

export const Link = styled.a`
  &:hover {
    background-color: #dedede;
  };
  &.active {
    background-color: #a7a7a7;
  }
  width: 100%;
  height: 100%;
  border-radius: 18px;
  display: inline-block;
  text-decoration: none;
  color: ${(props) => props.theme.colors.darkGray};
`;

export const Span = styled.span`
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: sub;
`;

export const Ellipsis = styled.span`
  font-size: 26px;
  vertical-align: middle;
  margin-right: 6px;
`;
