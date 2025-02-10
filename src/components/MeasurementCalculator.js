import { useState } from "react";
import styles from "./MeasurementCalculator.module.css";
import CalculationTable from "./CalculationTable";

const MeasurementCalculator = () => {
  const [activeTab, setActiveTab] = useState("length");
  const [sections, setSections] = useState([{ id: Date.now() }]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Header />
        <hr className={styles.divider} />
        <TabSection activeTab={activeTab} setActiveTab={setActiveTab} />
        {sections.map((section) => (
          <CalculationSection key={section.id} />
        ))}
        <button
          onClick={() => setSections([...sections, { id: Date.now() }])}
          className={styles.addButton}
        >
          Add Section
        </button>
        <FinalCalculation />
      </div>
    </div>
  );
};

const Header = () => (
  <div className={styles.header}>
    <div className={styles.itemId}>1.1.2</div>
    <p className={styles.description}>
      Lorem Ipsum is simply dummy text of the printing and typesetting
      industry...
    </p>
    <div className={styles.unitRate}>
      <div>
        <span className={styles.label}>Unit:</span> meter
      </div>
      <div>
        <span className={styles.label}>Rate:</span> 350.00
      </div>
    </div>
  </div>
);

const TabSection = ({ activeTab, setActiveTab }) => {
  const tabs = ["length", "area", "volume"];

  return (
    <div className={styles.tabSection}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${styles.tab} ${
              activeTab === tab ? styles.activeTab : ""
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <LengthSection />
    </div>
  );
};

const LengthSection = () => (
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

const CalculationSection = () => {
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

const FinalCalculation = () => (
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

export default MeasurementCalculator;
