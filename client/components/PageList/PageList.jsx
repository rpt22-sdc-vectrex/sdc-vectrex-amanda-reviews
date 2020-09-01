/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Link, ListItem, List, Span,
} from './PageList.styles';

// conditonal rendering using built-in "children" prop:
// if condition true rander element with link around it otherwise without link
function linkIf(condition, props, children) {
  const { onClick, href = '#' } = props;
  if (condition) {
    return <Link onClick={onClick} href={href}>{children}</Link>;
  }
  return children;
}

class PageList extends React.Component {
  render() {
    const pages = [];
    const { props } = this;
    for (let i = 1; i < props.totalPages + 1; i += 1) {
      pages.push(i);
    }
    return (
      <div>
        {(pages.length > 1) && (
          <List>
            <ListItem>
              {linkIf(props.activePage > 1, {
                onClick: (e) => {
                  e.preventDefault();
                  props.handlePageClick(props.activePage - 1);
                },
              },
                <Span>
                  <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M6.7 11.3L6 12l.7.7 4 4c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L9.8 13H17c.6 0 1-.4 1-1s-.4-1-1-1H9.8l2.3-2.3c.2-.2.3-.4.3-.7 0-.6-.4-1-1-1-.3 0-.5.1-.7.3l-4 4z" />
                  </svg>
                </Span>)}
            </ListItem>
            {pages.map((pageNum) => (
              <ListItem key={pageNum}>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    props.handlePageClick(pageNum);
                  }}
                  className={props.activePage === pageNum && 'active'}
                  href="."
                >
                  {pageNum}
                </Link>
              </ListItem>
            ))}
            <ListItem>
              {linkIf(props.activePage < props.totalPages, {
                onClick: (e) => {
                  e.preventDefault();
                  props.handlePageClick(props.activePage + 1);
                },
              },
                <Span>
                  <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M17.3 12.7l.7-.7-.7-.7-4-4c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l2.3 2.3H7c-.6 0-1 .4-1 1s.4 1 1 1h7.2l-2.3 2.3c-.2.2-.3.4-.3.7 0 .6.4 1 1 1 .3 0 .5-.1.7-.3l4-4z" />
                  </svg>
                </Span>)}
            </ListItem>
          </List>
        )}
      </div>
    );
  }
}

PageList.defaultProps = {
  totalPages: 0,
  activePage: 1,
};

PageList.propTypes = {
  totalPages: PropTypes.number,
  activePage: PropTypes.number,
  handlePageClick: PropTypes.func.isRequired,
};

export default PageList;
