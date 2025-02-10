import { useState } from "react";
import styles from "./FeetInchesInput.module.css";
const FeetInchesInput = ({ onTab, inputRef }) => {
  const [originalValue, setOriginalValue] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      onTab();
    }
  };

  const formatInput = (value) => {
    if (!value.trim()) return;

    const parts = value.trim().split(" ");
    const feet = parts[0] ? parseInt(parts[0]) : 0;
    const inches = parts[1] ? parseInt(parts[1]) : 0;
    const fraction = parts.slice(2).join(" ");

    // Check for negative values
    if (feet < 0 || inches < 0) {
      setIsInvalid(true);
      // Optional: you can either keep the negative value or reset it
      return;
    } else {
      setIsInvalid(false);
    }

    let formatted = `${feet}'`;
    if (!isNaN(inches)) formatted += `-${inches}`;
    if (fraction) formatted += ` ${fraction}`;
    formatted += '"';

    setDisplayValue(formatted);
  };

  const handleFocus = () => {
    if (originalValue) setDisplayValue(originalValue);
  };

  const handleBlur = () => {
    formatInput(displayValue);
  };

  const handleChange = (e) => {
    setOriginalValue(e.target.value);
    setDisplayValue(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      placeholder="e.g. 12 6 1/2"
      className={`${styles.feetInchesInput} ${isInvalid ? styles.invalid : ""}`}
    />
  );
};
export default FeetInchesInput;
