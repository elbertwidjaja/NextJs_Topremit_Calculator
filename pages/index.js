import Calculator from "../component/Calculator";
import RecipentForm from "../component/RecipentForm";
import Summary from "../component/Summary";
import { css } from "@emotion/css";
import { createContext, useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
const styled = {
  root: css`
    max-width: 414px;
    margin: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
  `
};

function handleSwitchPage(page) {
  // eslint-disable-next-line default-case
  switch (page) {
    case 0:
      return <Calculator />;
    case 1:
      return <RecipentForm />;
    case 2:
      return <Summary />;
    default:
      return "Sorry Out of Index";
  }
}

export const PageContext = createContext();

export default function Home() {
  const [page, setPage] = useState(0);
  const methods = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      Address: "",
      countries: "",
      serviceid: "",
      inputMoneySend: "",
      quotation: "",
      inputMoneyReceive: "",
      isSendAmount: true
    }
  });

  function nextPage() {
    if (page < 2) {
      setPage(page + 1);
    } else {
      setPage(0);
    }
  }

  function prevPage() {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  return (
    <>
      <PageContext.Provider value={{ nextPage, page, prevPage, setPage }}>
        <div className={styled.root}>{handleSwitchPage(page)}</div>
      </PageContext.Provider>
    </>
  );
}

export function usePage() {
  return useContext(PageContext);
}
