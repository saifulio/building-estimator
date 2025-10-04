import styles from "./MeasurementCalculator.module.css";

const CalculationTableHeader = () => (
  <div className={styles.header}>
    <div className={styles.itemId}>1.1.2</div>
    <p className={styles.description}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry...
    </p>
    <div className={styles.unitRate}>
      <div><span className={styles.label}>Unit:</span> meter</div>
      <div><span className={styles.label}>Rate:</span> 350.00</div>
    </div>
  </div>
);

export default CalculationTableHeader;