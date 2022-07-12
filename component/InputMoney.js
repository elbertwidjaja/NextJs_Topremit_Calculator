import NumberFormat from "react-number-format";

function InputMoney({ currency, placeholder, field, onChange }) {
  return (
    <div className="input">
      <NumberFormat
        className="numberformater"
        placeholder={placeholder}
        // {...field({ onChange })}
        {...field}
        thousandSeparator={true}
        onChange={(e) => {
          field.onChange(e);
          onChange();
        }}
      />
      <span className="currency">{currency}</span>
    </div>
  );
}

export default InputMoney;
