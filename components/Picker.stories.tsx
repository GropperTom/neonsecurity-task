import { Meta, StoryObj } from "@storybook/react";
import Picker from "./Picker";
import { Entry } from "@/types/Entry";

const meta: Meta<typeof Picker> = {
  title: "Components/Picker",
  component: Picker,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Picker>;

const entries: Entry[] = [
  { label: "United States", value: "-5", icon: "https://flagcdn.com/us.svg" },
  { label: "United Kingdom", value: "0", icon: "https://flagcdn.com/gb.svg" },
  { label: "Japan", value: "+9", icon: "https://flagcdn.com/jp.svg" },
];

export const Default: Story = {
  name: "Default (3 entries)",
  args: {
    placeholder: "Select a country",
    entries,
    onSelect: (entry) => alert(`Selected: ${entry.label}`),
  },
};

export const Empty: Story = {
  name: "Empty (no entries)",
  args: {
    placeholder: "Select a country",
    entries: [],
    onSelect: () => {},
  },
};

export const LongLabels: Story = {
  name: "Long Labels",
  args: {
    placeholder: "Select a country",
    entries: [
      { label: "The United Kingdom of Great Britain and Northern Ireland", value: "0", icon: "https://flagcdn.com/gb.svg" },
      { label: "The Federative Republic of Brazil", value: "-3", icon: "https://flagcdn.com/br.svg" },
      { label: "The Commonwealth of Australia", value: "+10", icon: "https://flagcdn.com/au.svg" },
    ],
    onSelect: (entry) => alert(`Selected: ${entry.label}`),
  },
};

export const SpecialCharacters: Story = {
  name: "Special Characters in Labels",
  args: {
    placeholder: "Select a country",
    entries: [
      { label: "Côte d'Ivoire", value: "0", icon: "https://flagcdn.com/ci.svg" },
      { label: "España (Spain)", value: "+1", icon: "https://flagcdn.com/es.svg" },
      { label: "Türkiye", value: "+3", icon: "https://flagcdn.com/tr.svg" },
    ],
    onSelect: (entry) => alert(`Selected: ${entry.label}`),
  },
};
