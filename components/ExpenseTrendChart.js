const sampleData = [
  { label: "Housing", value: 34 },
  { label: "Health", value: 27 },
  { label: "Food", value: 18 },
  { label: "Transport", value: 11 },
  { label: "Other", value: 10 }
];

export default function ExpenseTrendChart() {
  return (
    <figure className="chart" aria-labelledby="expense-chart-title">
      <figcaption id="expense-chart-title">Typical monthly spending split for retirees (example)</figcaption>
      <div className="bars">
        {sampleData.map((item) => (
          <div className="bar-row" key={item.label}>
            <span>{item.label}</span>
            <div className="bar-track" aria-hidden="true">
              <span className="bar-fill" style={{ width: `${item.value}%` }} />
            </div>
            <strong>{item.value}%</strong>
          </div>
        ))}
      </div>
    </figure>
  );
}
