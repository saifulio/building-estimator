import styles from "./CalculationTable.module.css";
import CalculationRow from "./CalculationRow";
import { useRef } from "react";

const CalculationTable = ({ title, rows, setRows, addRow }) => {
  const inputRefs = useRef(new Map());

  const handleTab = (currentId) => {
    // Find the index of the current row
    const currentIndex = rows.findIndex((row) => row.id === currentId);

    // If there's a next row, focus on it
    if (currentIndex < rows.length - 1) {
      const nextRow = rows[currentIndex + 1];
      setTimeout(() => {
        inputRefs.current.get(nextRow.id)?.focus();
      }, 0);
    }
    // If we're at the last row, create a new row and focus on it
    else {
      const newId = addRow();
      setTimeout(() => {
        inputRefs.current.get(newId)?.focus();
      }, 0);
    }
  };

  return (
    <div className={styles.calculationTable}>
      <h3 className={styles.tableTitle}>{title}</h3>
      <div className={styles.rows}>
        {rows.map((row) => (
          <CalculationRow
            key={row.id}
            rowId={row.id}
            onTab={() => handleTab(row.id)}
            inputRef={(el) => inputRefs.current.set(row.id, el)}
          />
        ))}
      </div>
    </div>
  );
};

export default CalculationTable;
