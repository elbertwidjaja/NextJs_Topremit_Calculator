import { css } from "@emotion/css";

const styled = {
  root: css`
    display: flex;
    justify-content: space-between;
    padding-right: 24px;
    padding-top: 33px;
  `
};

function QuotationInfo({ info, math }) {
  math = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(math);

  return (
    <div className={styled.root}>
      <span className="info">{info}</span>
      <div className="amount">{math}</div>
    </div>
  );
}

export default QuotationInfo;
