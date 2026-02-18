import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import debounce from "lodash/debounce";
import styles from "./Picker.module.css";
import { Entry } from "@/types/Entry";

export interface PickerProps { 
  placeholder?: string;
  entries: Entry[];
  onSelect?: (entry: Entry) => void;
}

const DEBOUNCE_DELAY = 300;
const BLUR_DELAY = 100;
const PLUS = "+";

export default function Picker({ placeholder, entries, onSelect }: PickerProps) {
  const [inputValue, setInputValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>(entries);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (entry: Entry) => {
    setDropdownOpen(false);
    setInputValue("");
    setHighlightedIndex(-1);
    if (onSelect) {
      onSelect(entry);
    }
  };

  useEffect(() => {
    const debounced = debounce(() => {
      const filtered = entries.filter((entry) =>
        entry.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredEntries(filtered);
      setHighlightedIndex(filtered.length > 0 ? 0 : -1);
    }, DEBOUNCE_DELAY);
    debounced();
    return () => debounced.cancel();
  }, [inputValue, entries]);

  const dropdownRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (
      dropdownOpen &&
      highlightedIndex >= 0 &&
      optionRefs.current[highlightedIndex]
    ) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex, dropdownOpen]);

  return (
    <div className={styles.pickerContainer}>
      <span className={styles.pickerInputPrefix}>{PLUS}</span>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        autoComplete="off"
        onChange={(e) => {
          setInputValue(e.target.value);
          setDropdownOpen(true);
        }}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setTimeout(() => setDropdownOpen(false), BLUR_DELAY)}
        onKeyDown={(e) => {
          if (!dropdownOpen || filteredEntries.length === 0) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
              prev < filteredEntries.length - 1 ? prev + 1 : 0
            );
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
              prev > 0 ? prev - 1 : filteredEntries.length - 1
            );
          } else if (e.key === "Enter") {
            e.preventDefault();
            if (highlightedIndex >= 0 && highlightedIndex < filteredEntries.length) {
              handleSelect(filteredEntries[highlightedIndex]);
            }
          } else if (e.key === "Escape") {
            setDropdownOpen(false);
          }
        }}
        className={styles.pickerInput}
      />
      {dropdownOpen && filteredEntries.length > 0 && (
        <ul className={styles.pickerDropdown} ref={dropdownRef}>
          {filteredEntries.map((entry, idx) => (
            <li
              key={entry.value}
              ref={el => { optionRefs.current[idx] = el; }}
              onMouseDown={() => handleSelect(entry)}
              className={
                styles.pickerItem +
                (idx === highlightedIndex ? ' ' + styles.pickerItemHighlighted : '')
              }
            >
              <div className={styles.pickerLabelContainer}>
                {entry.icon && (
                  <Image
                    src={entry.icon}
                    alt="flag"
                    width={20}
                    height={14}
                    className={styles.pickerIcon}
                  />
                )}
                <span>{entry.label}</span>
              </div>
              <span className={styles.pickerValue}>{entry.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
