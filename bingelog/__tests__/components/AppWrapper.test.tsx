import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import AppWrapper from "@/components/AppWrapper";

describe("AppWrapper", () => {
  // Minimal test to verify children render correctly inside the wrapper
  it("should render children correctly", () => {
    render(
      <AppWrapper>
        <Text>Content</Text>
      </AppWrapper>
    );

    // Check if the child element is present in the rendered output
    expect(screen.getByText("Content")).toBeOnTheScreen();
  });
});
