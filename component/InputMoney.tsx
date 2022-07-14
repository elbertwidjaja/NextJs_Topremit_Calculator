import NumberFormat from "react-number-format";

interface InputMoney {
  currency: string;
  placeholder: string;
  field: any;
  onChange: any;
}
function InputMoney({ currency, placeholder, field, onChange }: InputMoney) {
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
