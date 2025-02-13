import { useState } from "react";
import styles from "./FeetInchesInput.module.css";
const FeetInchesInput = ({ onTab, inputRef, onFormattedInputChange }) => {
  const [originalValue, setOriginalValue] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      onTab();
    }
  };
  const isValidFraction = (fraction) => {
    // Check if the fraction is in the format "n/d" where n and d are numbers
    const fractionParts = fraction.split("/");
    if (fractionParts.length !== 2) return false;

    const [numerator, denominator] = fractionParts;
    // Check if both parts are valid numbers and denominator isn't 0
    return (
      !isNaN(numerator) && !isNaN(denominator) && parseInt(denominator) !== 0
    );
  };

  const formatInput = (value) => {
    if (!value.trim()) return;

    const parts = value.trim().split(" ");
    const feet = parts[0] ? parseInt(parts[0]) : 0;
    const inches = parts[1] ? parseInt(parts[1]) : 0;
    const fraction = parts.slice(2).join(" ");

    // Validate negative values
    if (feet < 0 || inches < 0) {
      setIsInvalid(true);
      return;
    }

    // Validate fraction if present
    if (fraction) {
      if (!isValidFraction(fraction)) {
        setIsInvalid(true);
        return;
      }
    }

    setIsInvalid(false);

    let formatted = `${feet}'`;
    if (!isNaN(inches)) formatted += `-${inches}`;
    if (fraction) formatted += ` ${fraction}`;
    formatted += '"';

    setDisplayValue(formatted);
    onFormattedInputChange(formatted);
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
