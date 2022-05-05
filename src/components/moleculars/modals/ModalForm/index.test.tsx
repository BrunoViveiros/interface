import React from "react";
import {
  expectTextToBeInTheDocument,
  renderComponent,
  clickOn,
  expectTextNotToBeInTheDocument,
} from "config/testUtils";
import ModalForm from ".";

describe("ModalForm", () => {
  it("should render without error", () => {
    renderComponent(
      <ModalForm
        title="ModalForm"
        visible
        formFields={[
          {
            name: "email",
            id: "email",
            type: "email",
            placeholder: "email",
            required: true,
          },
        ]}
        onFormSubmit={() => {}}
        initialState={{ email: "email" }}
      />,
    );

    expectTextToBeInTheDocument("ModalForm");
  });

  it("should handle on submit", () => {
    const handleOnSubmitMock = jest.fn();
    renderComponent(
      <ModalForm
        title="ModalForm"
        visible
        formFields={[
          {
            name: "email",
            id: "email",
            type: "email",
            placeholder: "email",
            required: true,
          },
        ]}
        onFormSubmit={handleOnSubmitMock}
        primaryButtonText="click"
        initialState={{ email: "email" }}
      />,
    );
    clickOn("click");
    expect(handleOnSubmitMock).toHaveBeenCalled();
  });

  it("component is not visible and don't have title", () => {
    renderComponent(
      <ModalForm
        formFields={[]}
        onFormSubmit={() => {}}
        initialState={{ email: "email" }}
      />,
    );
    expectTextNotToBeInTheDocument("ModalForm");
  });
});
