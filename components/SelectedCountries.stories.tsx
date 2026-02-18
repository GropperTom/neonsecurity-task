import { Meta, StoryObj } from "@storybook/react";
import SelectedCountries from "./SelectedCountries";
import { Entry } from "@/types/Entry";

const meta: Meta<typeof SelectedCountries> = {
  title: "Components/SelectedCountries",
  component: SelectedCountries,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof SelectedCountries>;

const countries: Entry[] = [
  { label: "United States", value: "-5", icon: "https://flagcdn.com/us.svg" },
  { label: "United Kingdom", value: "0", icon: "https://flagcdn.com/gb.svg" },
  { label: "Japan", value: "+9", icon: "https://flagcdn.com/jp.svg" },
];

export const Default: Story = {
  name: "Default (3 countries)",
  args: {
    countries,
  },
};

export const Empty: Story = {
  name: "Empty (no countries)",
  args: {
    countries: [],
  },
};

export const LongCountryNames: Story = {
  name: "Long Country Names",
  args: {
    countries: [
      { label: "The United Kingdom of Great Britain and Northern Ireland", value: "0", icon: "https://flagcdn.com/gb.svg" },
      { label: "The Federative Republic of Brazil", value: "-3", icon: "https://flagcdn.com/br.svg" },
      { label: "The Commonwealth of Australia", value: "+10", icon: "https://flagcdn.com/au.svg" },
    ],
  },
};

export const SpecialCharacters: Story = {
  name: "Special Characters in Names",
  args: {
    countries: [
      { label: "Côte d'Ivoire", value: "0", icon: "https://flagcdn.com/ci.svg" },
      { label: "España (Spain)", value: "+1", icon: "https://flagcdn.com/es.svg" },
      { label: "Türkiye", value: "+3", icon: "https://flagcdn.com/tr.svg" },
    ],
  },
};
