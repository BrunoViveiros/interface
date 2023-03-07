import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import {mockNewLogEventFunction, mockZendeskOpenChatFunction} from "setupTests";
import { screen } from "@testing-library/react";
import ModalError from ".";

describe("ModalError", () => {
  it("should render without error", () => {
    renderComponent(
      <ModalError title="ModalError" buttonText="buttonText" visible />,
    );

    expectTextToBeInTheDocument("ModalError");
    expectTextToBeInTheDocument("buttonText");
  });

  describe("when visible is false", () => {
    it("should not render", () => {
      renderComponent(<ModalError title="ModalError" />);

      expectTextNotToBeInTheDocument("ModalError");
    });
  });

  describe("when there is no title", () => {
    it("should not display title", () => {
      renderComponent(<ModalError visible />);

      expectTextNotToBeInTheDocument("ModalError");
    });
  });

  describe("when it button is clicked", () => {
    it("should execute function", () => {
      const mockFunction = jest.fn();
      renderComponent(
        <ModalError
          title="ModalError"
          onClose={mockFunction}
          buttonText="button"
          visible
        />,
      );
      clickOn("button");
      expect(mockFunction).toHaveBeenCalled();
    });
  });

  describe("when the modal is visible and has an eventName", () => {
    const eventName = "test";
    const eventParams = { test: "test" };
    const action = "view";
    it("logs an event", () => {
      renderComponent(
        <ModalError visible eventName={eventName} eventParams={eventParams} />,
      );
      expect(mockNewLogEventFunction).toHaveBeenCalledWith(
        action,
        eventName,
        eventParams,
      );
    });
  });

  describe("when the modal is visible and clicks on button", () => {
    it("open zendesk chat clicking button", () => {
      renderComponent(
        <ModalError visible />,
      );
      clickOn("Access user support");
      expect(mockZendeskOpenChatFunction).toHaveBeenCalled();
    });
  });

  describe("when warning is passed", () => {
    it("should show warningIcon", () => {
      renderComponent(
          <ModalError visible warning />,
      );
        const icon = screen.getByRole("img")
        expect(icon).toHaveAttribute("src", "warning-icon.svg")
    });
  });
});
