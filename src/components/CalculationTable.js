import styles from "./CalculationTable.module.css";
import CalculationRow from "./CalculationRow";
import { useRef } from "react";

const CalculationTable = ({ title, rows, setRows, addRow }) => {
  const inputRefs = useRef(new Map());

  const handleTab = (currentId) => {
    const newId = addRow();
    setTimeout(() => {
      inputRefs.current.get(newId)?.focus();
    }, 0);
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
