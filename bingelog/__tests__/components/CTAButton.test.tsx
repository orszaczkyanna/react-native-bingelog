import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import CTAButton from "@/components/CTAButton";

describe("CTAButton", () => {
  // Verify that the button renders with the given title
  it("should render with the correct title", () => {
    const title = "Test Button";
    render(<CTAButton title={title} onPress={() => {}} />);

    expect(screen.getByText(title)).toBeOnTheScreen();
  });

  // Verify that the onPress callback is triggered once when the button is pressed
  it("should call onPress handler when pressed", () => {
    // Create a mock function to track if it gets called
    const onPressMock = jest.fn();
    render(<CTAButton title="Test Button" onPress={onPressMock} />);

    // Simulate a user pressing the button
    const button = screen.getByText("Test Button");
    fireEvent.press(button);

    // Verify that the mock function was called exactly once
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
