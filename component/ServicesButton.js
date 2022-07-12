import { useRadio, useRadioGroup, Box, HStack } from "@chakra-ui/react";
import { useCalculator } from "../provider/useCalculator.js";
import { css } from "@emotion/css";

const styled = {
  root: css`
    .radioButton {
      /* color: #8295b5; */
      cursor: pointer;
      font-size: 14px;
      padding: 7px 14px;
      border-radius: 6.25rem;
      text-align: center;
      font-family: "Mulish", sans-serifs;
      line-height: 140%;
    }
  `
};

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        className="radioButton"
        {...checkbox}
        borderRadius="100px"
        boxShadow="sm"
        color="#829B5"
        mt="24px"
        _checked={{
          bg: "rgba(192, 215, 253, 0.25)",
          color: "#30A6FF",
          borderColor: "none",
          borderWidth: "0px",
          fontweight: "700"
        }}
        px={"10px"}
        py={"5px"}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function ServicesButton({ field }) {
  const { serviceRadioButton, setServiceId, serviceId } = useCalculator();

  const { getRootProps, getRadioProps } = useRadioGroup({
    value: field.value || serviceId
  });
  const group = getRootProps();

  return (
    <HStack {...group} className={styled.root}>
      {serviceRadioButton.map((value) => {
        if (typeof value !== undefined) {
          const radio = getRadioProps({ value: String(value.id) });
          return (
            <RadioCard
              {...radio}
              key={value.id}
              value={String(value.id)}
              onChange={(e) => {
                radio.onChange(e);
                field.onChange(e);
                setServiceId(e.target.value);
              }}
            >
              {value.name}
            </RadioCard>
          );
        }
      })}
    </HStack>
  );
}

export default ServicesButton;
