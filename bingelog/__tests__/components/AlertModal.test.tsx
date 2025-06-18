import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import AlertModal from "@/components/AlertModal";

describe("AlertModal", () => {
  // Common props used across tests
  const defaultProps = {
    visible: true,
    title: "Test Title",
    message: "Test message content",
    onClose: jest.fn(),
  };

  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case: Verifies if modal renders with correct content when visible
  it("should render with given title and message when visible", () => {
    render(<AlertModal {...defaultProps} />);

    expect(screen.getByText("Test Title")).toBeOnTheScreen();
    expect(screen.getByText("Test message content")).toBeOnTheScreen();
  });

  // Test case: Verifies if modal is not visible when visible prop is false
  it("should not render when visible is false", () => {
    render(<AlertModal {...defaultProps} visible={false} />); // Override defaultProps.visible with an explicit false

    expect(screen.queryByText(defaultProps.title)).toBeNull();
    expect(screen.queryByText(defaultProps.message)).toBeNull();

    // Note:
    // Use .toBeNull() when element is not rendered at all,
    // and .not.toBeOnTheScreen() when it's rendered but hidden
  });

  // Test case: Verifies if onClose callback is triggered when OK button is pressed
  it("should call onClose when OK button is pressed", () => {
    render(<AlertModal {...defaultProps} />);

    fireEvent.press(screen.getByText("OK"));

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});
