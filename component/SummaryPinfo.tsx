function SummaryPinfo({ name, value, currency }) {
  return (
    <div className="containerPinfo fname">
      <p className="name">{name}</p>
      <p className="value">
        {value} {currency}
      </p>
    </div>
  );
}

export default SummaryPinfo;
