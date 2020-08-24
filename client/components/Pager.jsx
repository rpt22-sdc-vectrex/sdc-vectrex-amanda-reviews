/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styled from 'styled-components';
import ReviewList from './ReviewList';

// TODO: Refacor styling
const List = styled.ul`
  list-style: none;
  padding: 6px;
  height: 36px;
`;

const ListItem = styled.li`
  width: 36px;
  height: 36px;
  margin-right: 6px;
  border-radius: 18px;
  background-color: #efefef;
  display: inline-block;
  text-align: center;
  &:hover {
    background-color: #dedede;
  };
  &.active {
    background-color: ${(props) => props.theme.colors.darkGray};
  }
`;

const Link = styled.a`
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.darkGray};
  line-height: 36px;
`;

const Span = styled.span`
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: sub;
`;

// inactive
// const Svg = styled.svg`
//   fill: #aaaaaa;
// `;

const Svg = styled.svg`
  fill: ${(props) => props.theme.colors.darkGray};
`;

class Pager extends React.Component {
  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const totalPages = Math.ceil(this.props.productCount / 4);
    const pages = [];
    for (let i = 1; i < totalPages + 1; i += 1) {
      pages.push(i);
    }
    const { props } = this;
    return (
      <div>
        <ReviewList reviewData={props.reviewList} />
        {(pages.length > 1) && (
          <List>
            <ListItem>
              <Link href="http://placehold.it">
                <Span>
                  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M6.7 11.3L6 12l.7.7 4 4c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L9.8 13H17c.6 0 1-.4 1-1s-.4-1-1-1H9.8l2.3-2.3c.2-.2.3-.4.3-.7 0-.6-.4-1-1-1-.3 0-.5.1-.7.3l-4 4z" />
                  </Svg>
                </Span>
              </Link>
            </ListItem>
            {pages.map((pagenum) => (
              <ListItem
                key={pagenum}
                onClick={(e) => {
                  e.preventDefault();
                  // eslint-disable-next-line react/destructuring-assignment
                  this.props.handlePageClick(pagenum);
                }}
              >
                <Link href="http://placehold.it">{pagenum}</Link>
              </ListItem>
            ))}
            <ListItem>
              <Link href="http://placehold.it">
                <Span>
                  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M17.3 12.7l.7-.7-.7-.7-4-4c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l2.3 2.3H7c-.6 0-1 .4-1 1s.4 1 1 1h7.2l-2.3 2.3c-.2.2-.3.4-.3.7 0 .6.4 1 1 1 .3 0 .5-.1.7-.3l4-4z" />
                  </Svg>
                </Span>
              </Link>
            </ListItem>
          </List>
        )}
      </div>
    );
  }
}

export default Pager;
