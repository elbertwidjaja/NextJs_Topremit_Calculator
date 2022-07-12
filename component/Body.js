import Footer from "./Footer";
import CountrySelector from "./CountrySelector";
import InputMoney from "./InputMoney";
import ServicesButton from "./ServicesButton";
import Quotation from "./Quotation";
import { usePage } from "../pages/index";
import { useCalculator } from "../provider/useCalculator";
import { css } from "@emotion/css";
import { Spinner } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

const styled = {
  root: css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .input {
      border-radius: 8px;
      display: flex;
      justify-content: center;
      margin: 12px 0;
    }
    .numberformater {
      width: 80%;
    }
    .currency {
      color: #2e4865;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 66px;
      border-left: 1px solid #d5e0e8;
    }
  `
};

function Body() {
  const { setValue, control, handleSubmit, watch } = useFormContext();

  const { currencyLoading, currency, setCounter, counter } = useCalculator();
  const { nextPage } = usePage();

  function handleSendAmountChange() {
    setValue("isSendAmount", true);
    setCounter((prev) => prev + 1);
  }
  function handleReceiveAmountChange() {
    setValue("isSendAmount", false);
    setCounter((prev) => prev + 1);
  }

  return (
    <form
      className={styled.root}
      onSubmit={handleSubmit(() => {
        nextPage();
      })}
    >
      <div>
        <Controller
          control={control}
          name="countries"
          render={({ field }) => <CountrySelector field={field} />}
        />
        {currencyLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <>
            {" "}
            <Controller
              control={control}
              name="serviceid"
              render={({ field }) => <ServicesButton field={field} />}
            />
            <Controller
              control={control}
              name="inputMoneySend"
              render={({ field }) => (
                <InputMoney
                  currency="IDR"
                  placeholder={"You Send"}
                  field={field}
                  onChange={handleSendAmountChange}
                />
              )}
            />
            <Controller
              control={control}
              name="quotation"
              render={({ field }) => <Quotation field={field} />}
            />
            <Controller
              control={control}
              name="inputMoneyRecieve"
              render={({ field }) => (
                <InputMoney
                  currency={currency}
                  placeholder={"You Recieve"}
                  field={field}
                  onChange={handleReceiveAmountChange}
                />
              )}
            />
          </>
        )}
      </div>
      <Footer />
    </form>
  );
}

export default Body;
