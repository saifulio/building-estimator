import styles from "./MeasurementCalculator.module.css";
import CalculationTableLengthSection from "./CalculationTableLengthSection";

const CalculationTableTabSection = ({ activeTab, setActiveTab }) => {
  const tabs = ["length", "area", "volume"];

  return (
    <div className={styles.tabSection}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <CalculationTableLengthSection />
    </div>
  );
};

export default CalculationTableTabSection;