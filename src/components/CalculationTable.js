import styles from "./CalculationTable.module.css";
import CalculationRow from "./CalculationRow";

const CalculationTable = ({ title, rows, addRow, buttonVariant }) => (
  <div className={styles.calculationTable}>
    <h3 className={styles.tableTitle}>{title}</h3>
    <div className={styles.rows}>
      {rows.map((row) => (
        <CalculationRow key={row.id} />
      ))}
    </div>
    <button
      onClick={addRow}
      className={`${styles.addButton} ${styles[buttonVariant]}`}
    >
      Add Row
    </button>
  </div>
);

export default CalculationTable;
