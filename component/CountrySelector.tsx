import { Select } from "@chakra-ui/react";
import { useCalculator } from "../provider/useCalculator";
import { css } from "@emotion/css";
import { useState } from "react";

const styled = {
  root: css`
    .countrySelect {
      border: 1px solid black;
    }
  `
};

function CountrySelector({ field }) {
  const { countries, handleIsoCode } = useCalculator();

  const { onChange, ...test } = field;
  const selectCountries = countries.map((v, idx) => {
    return (
      <option key={idx} value={v.iso_code}>
        {v.name}
      </option>
    );
  });

  return (
    <Select
      placeholder="Select Country Destination"
      mt="1.5rem"
      size="lg"
      {...field}
      onChange={(e) => {
        onChange(e);
        handleIsoCode(e);
      }}
    >
      {selectCountries}
    </Select>
  );
}
export default CountrySelector;
