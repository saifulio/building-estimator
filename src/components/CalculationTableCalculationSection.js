import { useState } from "react";
import styles from "./MeasurementCalculator.module.css";
import CalculationTable from "./CalculationTable";

const CalculationTableCalculationSection = () => {
  const [additionRows, setAdditionRows] = useState([{ id: Date.now() }]);
  const [subtractionRows, setSubtractionRows] = useState([{ id: Date.now() }]);

  const addRow = (setRows) => {
    const newRow = { id: Date.now() };
    setRows((prev) => [...prev, newRow]);
    return newRow.id;
  };

  return (
    <div className={styles.calculationSection}>
      <CalculationTable
        title="Addition"
        rows={additionRows}
        setRows={setAdditionRows}
        addRow={() => addRow(setAdditionRows)}
      />
      <CalculationTable
        title="Subtraction"
        rows={subtractionRows}
        setRows={setSubtractionRows}
        addRow={() => addRow(setSubtractionRows)}
        buttonVariant="subtraction"
      />
    </div>
  );
};

export default CalculationTableCalculationSection;