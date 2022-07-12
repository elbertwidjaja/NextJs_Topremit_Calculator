import Header from "./Header";
import Body from "./Body";
import { css } from "@emotion/css";

const styled = {
  root: css`
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `
};

function Calculator() {
  return (
    <div className={styled.root}>
      <Header />
      <Body />
    </div>
  );
}

export default Calculator;
