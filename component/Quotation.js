import QuotationInfo from "./QuotationInfo";
import { useCalculator } from "../provider/useCalculator";
import { css } from "@emotion/css";

const styled = {
  root: css`
    display: flex;
    flex-direction: column;
    border-left: 1px solid #d5e0e8;
    margin-bottom: 32px;
    padding-left: 20px;
    .quotationInfo {
      text-align: center;
      margin-top: 32px;
    }
  `
};

function Quotation() {
  const { quotationsInfo } = useCalculator();
  if (typeof quotationsInfo === "undefined") {
    return null;
  }

  return (
    <div className={styled.root}>
      <QuotationInfo info={"Rate"} math={quotationsInfo.fx_rate} />
      <QuotationInfo info={"Fee"} math={quotationsInfo.fee} />
      <span
        className="quotationInfo"
        dangerouslySetInnerHTML={{ __html: quotationsInfo.note }}
      />
    </div>
  );
}
export default Quotation;
