import styles from "./SubtotalRow.module.css";

const SubtotalRow = ({ subtotal }) => {
  return (
    <div className={styles.subtotalRow}>
      <span className={styles.subtotalLabel}>Subtotal:</span>
      <input
        type="text"
        value={subtotal}
        className={styles.subtotalInput}
        readOnly
      />
    </div>
  );
};

export default SubtotalRow;