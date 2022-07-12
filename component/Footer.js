import { css } from "@emotion/css";

const styled = {
  root: css`
    display: flex;
    width: 366px;
    height: 44px;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #30a6ff;
    border-radius: 100px;
    margin-top: auto;
  `
};

function Footer() {
  return <button className={styled.root}>Continue</button>;
}

export default Footer;
