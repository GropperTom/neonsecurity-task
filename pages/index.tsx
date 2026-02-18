import { GetStaticProps } from "next";
import { Geist } from "next/font/google";
import styles from "./index.module.css";
import { APP_TITLE } from "@/constants";
import Picker from "@/components/Picker";
import SelectedCountries from "@/components/SelectedCountries";
import { useState } from "react";
import { Entry } from "@/types/Entry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const PICKER_PLACEHOLDER = "Select a timezone";

export default function Home({ entries }: { entries: Entry[] }) {
  const [selectedCountries, setSelectedCountries] = useState<Entry[]>([]);

  const handleSelect = (entry: Entry) => {
    setSelectedCountries((prev) =>
      prev.find((c) => c.label === entry.label) ? prev : [...prev, entry]
    );
  };

  return (
    <div className={styles.centeredContainer}>
      <h1 className={`${styles.title} ${geistSans.variable} font-sans ${styles.mainContentWidth}`}>
        {APP_TITLE}
      </h1>
      <div className={styles.mainContentWidth}>
        <Picker
          placeholder={PICKER_PLACEHOLDER}
          entries={entries}
          onSelect={handleSelect}
        />
        <SelectedCountries countries={selectedCountries} />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { mapCountryTimesToEntries } = await import("@/utils/mapCountryTimesToEntries");
  const entries = mapCountryTimesToEntries();
  return {
    props: {
      entries,
    },
  };
};
