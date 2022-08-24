import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import SupportFundPage from ".";

describe("SupportFundPage", () => {
  beforeEach(async () => {
    renderComponent(<SupportFundPage />);
    await waitForPromises();
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Your giving");
  });

  it("logs the fundSupportScreen_view event", () => {
    expectLogEventToHaveBeenCalledWith("fundSupportScreen_view");
  });

  describe("when the option toggle is changed", () => {
    it("logs the fundSupportGivingTogBtn_click event", () => {
      clickOn("Cryptocurrency");

      expectLogEventToHaveBeenCalledWith("fundSupportGivingTogBtn_click", {
        option: "cryptocurrency",
      });
    });

    it("should render card form", () => {
      expectTextToBeInTheDocument("Choose your giving");
      expectTextToBeInTheDocument("Proceed to Checkout");
    });

    it("should render cryptocurrency section", () => {
      clickOn("Cryptocurrency");

      expectTextToBeInTheDocument("Connect your wallet");
      expectTextToBeInTheDocument("Connect wallet");
    });
  });
});
