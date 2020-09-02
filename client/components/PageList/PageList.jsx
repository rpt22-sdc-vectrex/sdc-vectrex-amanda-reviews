/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Link, ListItem, List, Span, Ellipsis,
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

const PageLink = (props) => (
  <ListItem key={props.pageNum}>
    <Link
      onClick={(e) => {
        e.preventDefault();
        props.handleClick(props.pageNum);
      }}
      className={props.activePage === props.pageNum && 'active'}
      href="."
    >
      {props.pageNum}
    </Link>
  </ListItem>
);

class PageList extends React.Component {
  static collapsePages(pages, activePage, handleClick) {
    if (pages.length <= 3) {
      return pages.map((pageNum) => (
        <PageLink pageNum={pageNum} activePage={activePage} handleClick={handleClick} />
      ));
    }
    if (activePage <= 2) {
      return (
        <>
          <PageLink pageNum={1} activePage={activePage} handleClick={handleClick} />
          <PageLink pageNum={2} activePage={activePage} handleClick={handleClick} />
          <Ellipsis>…</Ellipsis>
          <PageLink pageNum={pages.length} activePage={activePage} handleClick={handleClick} />
        </>
      );
    } if (activePage >= pages.length - 1) {
      return (
        <>
          <PageLink pageNum={1} activePage={activePage} handleClick={handleClick} />
          <Ellipsis>…</Ellipsis>
          <PageLink pageNum={pages.length - 1} activePage={activePage} handleClick={handleClick} />
          <PageLink pageNum={pages.length} activePage={activePage} handleClick={handleClick} />
        </>
      );
    }
    return (
      <>
        <PageLink pageNum={1} activePage={activePage} handleClick={handleClick} />
        <Ellipsis>…</Ellipsis>
        <PageLink pageNum={activePage} activePage={activePage} handleClick={handleClick} />
        <Ellipsis>…</Ellipsis>
        <PageLink pageNum={pages.length} activePage={activePage} handleClick={handleClick} />
      </>
    );
  }

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
            {PageList.collapsePages(pages, props.activePage, props.handlePageClick)}
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
