import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Picker from "./Picker";
import { Entry } from "@/types/Entry";

window.HTMLElement.prototype.scrollIntoView = function () {};

describe("Picker", () => {
  const entries: Entry[] = [
    { label: "United States", value: "-5", icon: "https://flagcdn.com/us.svg" },
    { label: "United Kingdom", value: "0", icon: "https://flagcdn.com/gb.svg" },
    { label: "Japan", value: "+9", icon: "https://flagcdn.com/jp.svg" },
  ];

  it("renders input and placeholder", () => {
    render(<Picker placeholder="Select a country" entries={entries} />);
    expect(screen.getByPlaceholderText("Select a country")).toBeInTheDocument();
  });

  it("shows dropdown on input focus", () => {
    render(<Picker placeholder="Select a country" entries={entries} />);
    fireEvent.focus(screen.getByPlaceholderText("Select a country"));
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("filters entries based on input", async () => {
    render(<Picker placeholder="Select a country" entries={entries} />);
    const input = screen.getByPlaceholderText("Select a country");
    fireEvent.change(input, { target: { value: "jap" } });
    // Wait for UI update
    await waitFor(() => {
      expect(screen.getByText("Japan")).toBeInTheDocument();
      expect(screen.queryByText("United States")).toBeNull();
      expect(screen.queryByText("United Kingdom")).toBeNull();
    });
  });

  it("calls onSelect when an entry is clicked", () => {
    const onSelect = jest.fn();
    render(<Picker placeholder="Select a country" entries={entries} onSelect={onSelect} />);
    fireEvent.focus(screen.getByPlaceholderText("Select a country"));
    fireEvent.mouseDown(screen.getByText("Japan"));
    expect(onSelect).toHaveBeenCalledWith(entries[2]);
  });
});
