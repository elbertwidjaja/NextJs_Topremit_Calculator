import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useFormContext } from "react-hook-form";

interface Calculator {
  fetchServices: (countryIsoCode) => void;
  handleIsoCode: (e: any) => void;
  setServiceId: React.Dispatch<(prevState: string) => string>;
  countries: any[];
  countryIsoCode: "";
  currency: string;
  currencyLoading: boolean;
  quotationsInfo: {
    fx_rate: string | undefined;
    fee: number | undefined;
    note: string | undefined;
    country_name: string | undefined;
    service_name: string | undefined;
    source_currency_iso_code: string | undefined;
    destination_currency_iso_code: string | undefined;
  };
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  serviceRadioButton: any[];
  setServiceRadioButton: React.Dispatch<React.SetStateAction<any[]>>;
  serviceId: string;
  setCountries: React.Dispatch<React.SetStateAction<any[]>>;
}
const defaultValue = {
  fetchServices: (value) => {},
  handleIsoCode: (id) => {},
  setServiceId: (id) => {},
  countries: [],
  countryIsoCode: "",
  currency: "",
  currencyLoading: false,
  quotationsInfo: {
    fx_rate: "",
    fee: 0,
    note: "",
    country_name: "",
    service_name: "",
    source_currency_iso_code: "",
    destination_currency_iso_code: ""
  },
  counter: 0
};

const CalculatorContext = createContext<Calculator>(defaultValue as any);

function CalculatorProvider({ children }) {
  const { watch, setValue } = useFormContext();
  const [countries, setCountries] = useState([]);
  const [countryIsoCode, setCountryIsoCode] = useState();
  const [serviceRadioButton, setServiceRadioButton] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [currency, setCurrency] = useState();
  const [currencyLoading, setCurrencyLoading] = useState(false);
  const [quotationsInfo, setQuotationsInfo] = useState();
  const [counter, setCounter] = useState(0);

  const inputMoneySend = watch("inputMoneySend");
  const inputMoneyReceive = watch("inputMoneyRecieve");

  function unformatNumber(value) {
    return String(value).replace(/,/g, "");
  }

  function handleIsoCode(e) {
    setCountryIsoCode(e.target.value);
  }

  async function fetchServices(value) {
    if (countryIsoCode !== undefined) {
      const responseService = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}services?country=${value}&type=REMIT`
      );
      const data = [...responseService.data.data];
      if (data.length > 1) {
        data.sort((a, b) => {
          if (a.name > b.name) return 1;
          else if (a.name < b.name) return -1;
        });
      }
      setServiceRadioButton(data);
      setServiceId(String(data[0].id));
    }
  }

  async function getCurrency(value) {
    if (countryIsoCode !== undefined) {
      setCurrencyLoading(true);
      const responseCurrency = await axios
        .get(
          `
          ${process.env.NEXT_PUBLIC_API_KEY}currencies?country=${value}&service=${serviceId}
          `
        )
        .finally(() => {
          setCurrencyLoading(false);
        });
      setCurrency(responseCurrency.data.data[0].iso_code);
      setCounter((prev) => prev + 1);
    }
  }

  async function fetchQuotation() {
    const type = watch("isSendAmount");
    console.log(type, "type");
    const amount = watch("isSendAmount")
      ? "inputMoneySend"
      : "inputMoneyRecieve";

    const fetchQuotation = await axios.post(
      process.env.NEXT_PUBLIC_API_KEY + "web/quotations",
      {
        service: serviceId,
        currency: currency,
        country: countryIsoCode,
        amount: unformatNumber(watch(amount)),
        is_send_amount: type
      }
    );
    setQuotationsInfo(fetchQuotation.data.data);
    setValue("inputMoneyRecieve", fetchQuotation.data.data.destination_amount);
    setValue("inputMoneySend", fetchQuotation.data.data.source_amount);
  }

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_KEY}countries?type=REMIT&available=true`
      )
      .then((res) => {
        const countriesdata = res.data.data;
        setCountries(countriesdata);
      });
  }, []);

  useEffect(() => {
    fetchServices(countryIsoCode);
  }, [countryIsoCode]);

  useEffect(() => {
    getCurrency(countryIsoCode);
  }, [serviceId]);

  useEffect(() => {
    if (inputMoneyReceive || inputMoneySend !== "") {
      const timeout = setTimeout(() => {
        if (inputMoneyReceive || inputMoneySend !== " ") fetchQuotation();
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [counter]);

  return (
    <CalculatorContext.Provider
      value={{
        countryIsoCode,
        setServiceRadioButton,
        serviceRadioButton,
        countries,
        fetchServices,
        handleIsoCode,
        setServiceId,
        serviceId,
        currency,
        currencyLoading,
        quotationsInfo,
        setCountries,
        setCounter,
        counter
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

function useCalculator() {
  return useContext(CalculatorContext);
}
export { CalculatorProvider, useCalculator };
