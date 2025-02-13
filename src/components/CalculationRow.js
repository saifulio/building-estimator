import { useState } from "react";
import styles from "./CalculationRow.module.css";
import FeetInchesInput from "./FeetInchesInput";
const CalculationRow = ({ rowId, onTab, inputRef }) => {
  const [values, setValues] = useState({
    description: "",
    num1: 1,
    num2: 1,
    num3: 1,
    text: "",
    result: 1,
  });

  const [formattedInput, setFormattedInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValues = { ...values, [name]: value };
    const result = newValues.num1 * newValues.num2 * newValues.num3;
    setValues({ ...newValues, result });
  };

  const handleFormattedInputChange = (value) => {
    setFormattedInput(value);
    setValues((prevValues) => ({ ...prevValues, result: value }));
  };

  return (
    <div className={styles.calculationRow}>
      <input
        type="text"
        name="description"
        placeholder="Description"
        className={styles.descriptionInput}
        value={values.description}
        onChange={handleChange}
      />
      {["num1", "num2", "num3"].map((name) => (
        <input
          key={name}
          type="number"
          name={name}
          value={values[name]}
          onChange={handleChange}
          className={styles.numberInput}
          min="1"
          max="99"
        />
      ))}
      <FeetInchesInput
        onTab={onTab}
        inputRef={inputRef}
        onFormattedInputChange={handleFormattedInputChange}
      />
      <input
        type="text"
        value={values.result}
        className={styles.resultInput}
        readOnly
      />
    </div>
  );
};
export default CalculationRow;
