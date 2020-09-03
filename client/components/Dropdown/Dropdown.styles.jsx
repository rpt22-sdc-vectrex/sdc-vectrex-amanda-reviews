import styled from 'styled-components';

export const DropDownContainer = styled.div`
  display: inline-flex;
  position: relative;
`;

export const DropDownHeader = styled.button`
  letter-spacing: 0.4px;
  left: 7px;
  position: relative;
  font: ${(props) => props.theme.fontShorthand.boldMain};
  min-height: 36px;
  min-width: 36px;
  padding: 9px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  vertical-align: middle;
  text-transform: none;
  margin: 0;
  z-index: 20;
  border-radius: 24px;
  ::before {
    transition: transform 200ms cubic-bezier(0.345, 0.115, 0.135, 1.42),opacity 150ms ease-out;
    box-shadow: 0 4px 20px rgba(34, 34, 34, 0.15);
    opacity: 0;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    border: inherit;
    border-radius: inherit;
    background: #222222;
    transform: scale(0.7) perspective(1px);
  }
  ${(props) => (props.isOpen ? '' : `
    &:hover::before {
      opacity: 0.075;
      transform: scale(1) perspective(1px);
    }
    &:active::before {
      opacity: 0.15;
      transform: scale(0.95) perspective(1px);
    }
  `)}
  `;

export const SvgContainer = styled.span`
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  display: inline-block;
  height: 24px;
  vertical-align: middle;
  width: 24px;
  box-sizing: border-box;
  margin: 0;
  font: inherit;
  cursor: pointer;
`;

export const TextContainer = styled.span`
  position: relative;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  text-align: left;
  cursor: pointer;
`;

export const Svg = styled.svg`
  display:block;
  overflow: hidden;
  fill: currentColor;
  text-align: left;
`;

export const DropDownList = styled.div`
  background: #fff;
  border-radius: 12px;
  border: 1px rgba(34, 34, 34, 0.15) solid;
  box-shadow: 0 4px 20px rgba(34, 34, 34, 0.15);
  min-width: 100%;
  max-width: 300px;
  overflow: hidden;
  max-height: 480px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 40px 0 0 0;
  z-index: 10;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transform: scaleX(${(props) => (props.isOpen ? 1 : 0.5)}) scaleY(${(props) => (props.isOpen ? 1 : 0.2)}) perspective(1px);
  transform-origin: top left;
  transition: opacity ${(props) => (props.isOpen ? 180 : 0)}ms ease-out, transform ${(props) => (props.isOpen ? 180 : 0)}ms cubic-bezier(0.175, 0.885, 0.4, 1.1);
`;

export const ListItem = styled.button`
  font: ${(props) => props.theme.fontShorthand.smallMain};
  background: none;
  border: none;
  letter-spacing: inherit;
  cursor: pointer;
  text-align: left;
  outline: none;
  transition: background-color 100ms ease-out;
  color: ${(props) => props.theme.colors.darkGray};
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  width: max-content;
  max-width: 298px;
  min-width: 100%;
  box-sizing: border-box;
  padding: 12px 18px;
  &:hover {
    background-color: #efefef;
  };
  ${(props) => props.isSelected && `
  ::after {
    background-image: url("data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 24 24%22%3E%3Cpath fill%3D%22%23222222%22 d%3D%22M10.55 16.97L6.3 12.7a1 1 0 0 1 1.42-1.42l2.74 2.74 5.8-6.68a1 1 0 0 1 1.5 1.3l-7.2 8.32z%22%2F%3E%3C%2Fsvg%3E");
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    display: block;
    margin-right: -2px;
    min-width: 24px;
    width: 24px;
    height: 18px;
    content: "";
  };
  `}
`;
