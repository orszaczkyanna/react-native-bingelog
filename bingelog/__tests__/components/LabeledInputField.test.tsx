import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import LabeledInputField from "@/components/LabeledInputField";

describe("LabeledInputField", () => {
  it("should render with the correct label and placeholder", () => {
    const label = "Email";
    const placeholder = "example@email.com";

    render(
      <LabeledInputField
        label={label}
        placeholder={placeholder}
        value=""
        onChangeText={() => {}}
      />
    );

    // Label should appear
    expect(screen.getByText(label)).toBeOnTheScreen();

    // TextInput with the given placeholder should appear
    expect(screen.getByPlaceholderText(placeholder)).toBeOnTheScreen();
  });

  it("should display the given value", () => {
    const value = "test@email.com";

    render(
      <LabeledInputField label="Email" value={value} onChangeText={() => {}} />
    );

    // TextInput should display the provided value
    expect(screen.getByDisplayValue(value)).toBeOnTheScreen();
  });

  it("should call onChangeText with updated value when text changes", () => {
    const onChangeTextMock = jest.fn(); // Mock function to track text input changes
    const newValue = "new input";
    const placeholder = "placeholder text";

    render(
      <LabeledInputField
        label="Input"
        placeholder={placeholder}
        value=""
        onChangeText={onChangeTextMock}
      />
    );

    // Get the TextInput field using its placeholder text
    const textInput = screen.getByPlaceholderText(placeholder);

    // Simulate typing into the TextInput
    // First argument: the target element; second: the text to input
    fireEvent.changeText(textInput, newValue);

    // Assert that the input change triggered the callback with the correct value
    expect(onChangeTextMock).toHaveBeenCalledWith(newValue);
  });
});
