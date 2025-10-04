import styles from "./MeasurementCalculator.module.css";

const CalculationTableLengthTab = () => (
  <div className={styles.lengthSection}>
    <label>Text: Length from:</label>
    <select className={styles.select}>
      {["Item 1", "Item 2", "Item 3", "Item 4"].map((item) => (
        <option key={item}>{item}</option>
      ))}
    </select>
    <button className={styles.browseButton}>Browse</button>
    <input
      type="text"
      className={styles.readOnlyInput}
      value="10.00 ft"
      readOnly
    />
  </div>
);

export default CalculationTableLengthTab;