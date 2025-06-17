import { handleSignup } from "@/features/auth/handleSignup";
import api from "@/lib/axios"; // Import is needed so jest.mock() can override this module during tests

// Replace actual axios instance with a mock (before use) to prevent real HTTP requests during tests
jest.mock("@/lib/axios"); // Must be outside describe() to take effect during import

describe("handleSignup", () => {
  // Create mock functions to track behavior
  const onStartMock = jest.fn();
  const onFinishMock = jest.fn();
  const onAlertMock = jest.fn();

  // Clear previous mock data to ensure each test runs independently
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case: Verifies validation failure handling
  it("should alert validation errors if input is invalid", async () => {
    // Call handleSignup with invalid input to trigger client-side validation errors
    await handleSignup({
      username: "",
      email: "invalid-email",
      password: "short",
      onStart: onStartMock,
      onFinish: onFinishMock,
      onAlert: onAlertMock,
    });

    // Confirm that onStart and onFinish are not called when validation fails
    expect(onStartMock).not.toHaveBeenCalled();
    expect(onFinishMock).not.toHaveBeenCalled();

    // Confirm that validation errors are passed to onAlert
    expect(onAlertMock).toHaveBeenCalledWith(
      expect.stringMatching(/warning/i), // Use `expect.stringMatching` to assert that a string argument matches a regex
      expect.stringMatching(/[a-zA-Z]/) // Message should contain letters
    );
  });

  // Test case: Verifies successful registration
  it("should alert success message on valid signup", async () => {
    // Cast api.post to a Jest mock to satisfy TypeScript
    const apiPostMock = api.post as jest.Mock;

    // Set up valid user input
    const validUsername = "testuser";
    const validEmail = "user@example.com";
    const validPassword = "Valid123!";

    // Simulate RESOLVED backend response (2xx) with a success message
    const successMessage = "Registration successful";
    apiPostMock.mockResolvedValueOnce({
      // Mimic axios format where success message is in `response.data.message`
      data: { message: successMessage },
    });

    // Call handleSignup with valid input and mock callbacks
    await handleSignup({
      username: validUsername,
      email: validEmail,
      password: validPassword,
      onStart: onStartMock,
      onFinish: onFinishMock,
      onAlert: onAlertMock,
    });

    // Verify that API was called with correct registration data
    expect(apiPostMock).toHaveBeenCalledWith("/auth/register", {
      username: validUsername,
      email: validEmail,
      password: validPassword,
    });

    // Confirm that callbacks were triggered correctly
    expect(onStartMock).toHaveBeenCalled();
    expect(onFinishMock).toHaveBeenCalled();
    expect(onAlertMock).toHaveBeenCalledWith(
      expect.stringMatching(/success/i),
      successMessage
    );
  });

  // Test case: Verifies backend error handling
  it("should alert API error response message", async () => {
    // Simulate a REJECTED backend response (4xx/5xx) with an error message
    // Cast api.post to a Jest mock to satisfy TypeScript
    const errorMessage = "Email already exists";
    (api.post as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });

    // Call handleSignup with valid input
    await handleSignup({
      username: "testuser",
      email: "existing@email.com",
      password: "Valid123!",
      onStart: onStartMock,
      onFinish: onFinishMock,
      onAlert: onAlertMock,
    });

    // Confirm that callbacks were triggered correctly
    expect(onStartMock).toHaveBeenCalled();
    expect(onFinishMock).toHaveBeenCalled();
    expect(onAlertMock).toHaveBeenCalledWith(
      expect.stringMatching(/warning/i),
      errorMessage
    );
  });

  // Test case: Verifies network error handling
  it("should alert generic error if server is unreachable", async () => {
    // Simulate a REJECTED backend response caused by a network error (no response object received)
    (api.post as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    // Temporarily suppress console.error to avoid misleading output
    const originalConsoleError = console.error;
    console.error = jest.fn();

    // Call handleSignup with valid inputs
    await handleSignup({
      username: "testuser",
      email: "user@example.com",
      password: "Valid123!",
      onStart: onStartMock,
      onFinish: onFinishMock,
      onAlert: onAlertMock,
    });

    // Confirm that a generic error alert was shown
    expect(onAlertMock).toHaveBeenCalledWith(
      expect.stringMatching(/error/i),
      expect.stringMatching(/[a-zA-Z]/) // Message should contain letters
    );

    // Restore original console.error
    console.error = originalConsoleError;
  });
});
