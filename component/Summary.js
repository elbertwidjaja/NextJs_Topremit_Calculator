import Header from "./Header";
import SummaryPinfo from "./SummaryPinfo";
import { useFormContext } from "react-hook-form";
import { css } from "@emotion/css";
import { useCalculator } from "../provider/useCalculator";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  useDisclosure,
  Button
} from "@chakra-ui/react";
import { usePage } from "../pages/index";
import { ModalLogo } from "./ModalLogo";

const styled = {
  root: css`
    --blue: #30a6ff;
    --gray: #2e4865;
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .containerPinfo {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .title {
      font-family: "Mulish", "sans-serif";
      font-style: bold;
      font-weight: 700;
      font-size: 19px;
      line-height: 24px;
      letter-spacing: 0.02em;
      color: var(--gray);
      margin-top: 32px;
      margin-bottom: 20px;
    }
    .line {
      background: #c9d4db;
      height: 1px;
      width: 100%;
      margin-bottom: 20px;
    }

    .name {
      color: #8295b5;
    }
    .value {
      color: var(--gray);
    }
    .submitContainer {
      margin-top: auto;
    }
    .submit {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      background-color: var(--blue);
      margin-top: auto;
      width: 366px;
      height: 44px;
      border-radius: 100px;
    }
  `,
  containerModal: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    gap: 10px;
    padding-top: 46px;
    font-size: 19px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.02em;
  `,
  button: css`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #30a6ff;
    width: 100%;
    height: 44px;
    border-radius: 6px;
    padding: 15px 18px;
  `
};

function Summary() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { quotationsInfo } = useCalculator();
  const form = useFormContext();
  const { watch, setValue, reset } = form;
  const { setPage } = usePage();

  return (
    <form className={styled.root}>
      <Header />
      <div>
        <div className="title">Summary</div>
        <SummaryPinfo
          name={"Destination Country"}
          value={quotationsInfo?.country_name}
        />
        <SummaryPinfo name={"Services"} value={quotationsInfo?.service_name} />
        <SummaryPinfo
          name={"Source Amount"}
          value={watch("inputMoneySend")}
          // value={quotationsInfo?.source_amount}
          // currency={quotationsInfo?.source_currency_iso_code}
        />
        <SummaryPinfo
          name={"Destination Amount"}
          value={watch("inputMoneyRecieve")}
          // value={quotationsInfo?.destination_amount}
          // currency={quotationsInfo?.destination_currency_iso_code}
        />
        <hr className="line" />
        <SummaryPinfo name={"First Name"} value={watch("first_name")} />
        <SummaryPinfo name={"Last Name"} value={watch("last_name")} />
        <SummaryPinfo name={"Addrres"} value={watch("Address")} />
        <hr className="line" />
      </div>
      <div className="submitContainer">
        <Button className="submit" _hover={{ bg: "#30A6FF" }} onClick={onOpen}>
          Submit
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <div className={styled.containerModal}>
              <ModalLogo />
              <p> Thank you, Buddy!</p>
            </div>

            <ModalFooter>
              <button
                className={styled.button}
                onClick={() => {
                  setPage(0);
                  setValue("first_name", "");
                  setValue("last_name", "");
                  setValue("Address", "");
                  setValue("countries", "");
                  setValue("serviceid", "");
                  setValue("inputMoneySend", "");
                  setValue("quotation", "");
                  setValue("inputMoneyRecieve", "");
                }}
              >
                Close
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </form>
  );
}

export default Summary;
