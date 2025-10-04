import styles from "./MeasurementCalculator.module.css";

const CalculationTableFinalCalculation = () => (
  <div className={styles.finalCalculation}>
    <div className={styles.calculationRow}>
      <span>Running Total (ft):</span>
      <span>0.00</span>
    </div>
    <div className={styles.calculationRow}>
      <span>Converted to Meters:</span>
      <span>0.00</span>
    </div>
    <div className={`${styles.calculationRow} ${styles.bold}`}>
      <span>Total in TK (BDT):</span>
      <span>0.00</span>
    </div>
  </div>
);

export default CalculationTableFinalCalculation;