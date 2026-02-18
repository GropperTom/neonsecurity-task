import { render, screen } from "@testing-library/react";
import SelectedCountries from "./SelectedCountries";
import { Entry } from "@/types/Entry";

describe("SelectedCountries", () => {
  const countries: Entry[] = [
    { label: "United States", value: "-5", icon: "https://flagcdn.com/us.svg" },
    { label: "United Kingdom", value: "0", icon: "https://flagcdn.com/gb.svg" },
    { label: "Japan", value: "+9", icon: "https://flagcdn.com/jp.svg" },
  ];

  it("renders nothing if no countries", () => {
    const { container } = render(<SelectedCountries countries={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders all country labels", () => {
    render(<SelectedCountries countries={countries} />);
    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.getByText("United Kingdom")).toBeInTheDocument();
    expect(screen.getByText("Japan")).toBeInTheDocument();
  });

  it("renders editable label inputs", () => {
    render(<SelectedCountries countries={countries} />);
    expect(screen.getAllByPlaceholderText("Label...").length).toBe(3);
  });
});
