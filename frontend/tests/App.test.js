// frontend/src/tests/App.test.js

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App.jsx";

describe("App Component", () => {
  test("renders login route", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    // Expect login page to be in the document
    const loginHeading = screen.getByText(/login/i);
    expect(loginHeading).toBeInTheDocument();
  });
});
