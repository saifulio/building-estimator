import { useState } from "react";
import styles from "./MeasurementCalculator.module.css";
import CalculationTableHeader from "./CalculationTableHeader";
import CalculationTableTabSection from "./CalculationTableTabSection";
import CalculationTableCalculationSection from "./CalculationTableCalculationSection";
import CalculationTableFinalCalculation from "./CalculationTableFinalCalculation";


const MeasurementCalculator = () => {
  const [activeTab, setActiveTab] = useState("length");
  const [sections, setSections] = useState([{ id: Date.now() }]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <CalculationTableHeader />
        <hr className={styles.divider} />
        <CalculationTableTabSection activeTab={activeTab} setActiveTab={setActiveTab} />
        {sections.map((section) => (
          <CalculationTableCalculationSection key={section.id} />
        ))}
        <button
          onClick={() => setSections([...sections, { id: Date.now() }])}
          className={styles.addButton}
        >
          Add Section
        </button>
        <CalculationTableFinalCalculation />
      </div>
    </div>
  );
};

export default MeasurementCalculator;