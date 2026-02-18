import styles from "./SelectedCountries.module.css";
import { Entry } from "@/types/Entry";
import { useEffect, useState } from "react";
import Image from "next/image";


interface SelectedCountriesProps {
  countries: Entry[];
}

const LABEL_PLACEHOLDER = "Label...";

export default function SelectedCountries({ countries }: SelectedCountriesProps) {
  const [now, setNow] = useState(new Date());
  // Store custom labels for each country by label key
  const [labels, setLabels] = useState<Record<string, string>>({});

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  if (countries.length === 0) return null;
  return (
    <div className={styles.selectedCountriesContainer}>
      <ul className={styles.selectedCountriesList}>
        {countries.map((country) => {
          // country.value is the deviation string, e.g. "+2" or "-5"
          const deviation = Number(country.value);
          const utc = now.getTime() + now.getTimezoneOffset() * 60000;
          const local = new Date(utc + deviation * 3600000);
          const timeString = local.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

          // Editable label logic
          const labelValue = labels[country.label] ?? "";

          const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setLabels((prev) => ({ ...prev, [country.label]: e.target.value }));
          };

          const handleLabelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).blur();
            }
          };

          return (
            <li key={country.label} className={styles.selectedCountryItem}>
              <div className={styles.selectedCountryLabelContainer}>
                <input
                  className={styles.selectedCountryCustomLabel}
                  type="text"
                  placeholder={LABEL_PLACEHOLDER}
                  value={labelValue}
                  onChange={handleLabelChange}
                  onKeyDown={handleLabelKeyDown}
                />
              </div>
              <div className={styles.selectedCountryRow}>
                <div className={styles.selectedCountryLabelGroup}>
                  {country.icon && (
                    <Image
                      src={country.icon}
                      alt="flag"
                      width={32}
                      height={18}
                      className={styles.selectedCountryIcon}
                    />
                  )}
                  <span className={styles.selectedCountryLabel}>{country.label}</span>
                </div>
                <div className={styles.selectedCountryTimeGroup}>
                  <span className={styles.selectedCountryTime}>{timeString}</span>
                  <span className={styles.selectedCountryValue}>{country.value}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
