import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  border-bottom: 2px solid rgba(34, 34, 34, 0.15);
  margin: 0;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  outline: none;
  display: flex;
  font: inherit;
  align-items: center;
  padding: 12px 0;
  margin: 0 12px 0;
  position: relative;
  letter-spacing: 0.4px;
  box-sizing: border-box;
  &:nth-child(1) {
    margin-left: 0;
  }
  ::after {
    content: '';
    display: inline-block;
    position: absolute;
    bottom: -2px;
    width: 0;
    border-bottom: 2px solid rgba(34, 34, 34, 0.5);
    left: 50%;
    transform: translateX(-50%);
    transition: width 200ms cubic-bezier(0.54, 0, 0.54, 1);
    ${(props) => props.isActive && `
    width: 100%;
    border-bottom-color: #222222;
    `}
  }
  &:hover::after {
    width: 100%;
  }
`;

export const Badge = styled.span`
  background: #eaeaea;
  border-radius: 15px;
  display: inline-block;
  word-break: break-word;
  font: ${(props) => props.theme.fontShorthand.badgeMain};
  padding: 6px 9px;
  min-width: 25px;
  margin-left: 12px !important;
  box-sizing: border-box;
`;
