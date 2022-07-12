import { CalculatorProvider } from "../provider/useCalculator";
import { ChakraProvider } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
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
  return (
    <FormProvider {...methods}>
      <CalculatorProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </CalculatorProvider>
    </FormProvider>
  );
}

export default MyApp;
