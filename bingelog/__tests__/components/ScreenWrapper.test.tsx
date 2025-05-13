import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";

describe("ScreenWrapper", () => {
  // Minimal test to verify children render correctly inside the wrapper
  it("should render children correctly", () => {
    render(
      <ScreenWrapper>
        <Text>Test content</Text>
      </ScreenWrapper>
    );

    // Check if the child element is present in the rendered output
    expect(screen.getByText("Test content")).toBeOnTheScreen();
  });
});
