import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderComponent } from "config/testUtils";
import { expectDisplayValueToBeInTheDocument } from "config/testUtils/expects";
import UserInfoSection from ".";

describe("UserInfoSection", () => {
  it("should fill billing information form", () => {
    renderComponent(<UserInfoSection />, {
      cardPaymentProviderValue: {
        country: "Brazil",
      },
    });

    userEvent.type(screen.getByPlaceholderText("Country"), "Brazil");
    userEvent.type(screen.getByPlaceholderText("City"), "São Paulo");
    userEvent.type(screen.getByPlaceholderText("State"), "SP");
    fireEvent.change(screen.getByPlaceholderText("Tax ID"), {
      target: { value: "000.000.000-00" },
    });

    expectDisplayValueToBeInTheDocument("Brazil");
    expectDisplayValueToBeInTheDocument("São Paulo");
    expectDisplayValueToBeInTheDocument("SP");
    expectDisplayValueToBeInTheDocument("000.000.000-00");
  });
});
