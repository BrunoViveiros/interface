import creditCardPaymentApi from ".";
import api from "..";

describe("creditCardPaymentApi", () => {
  describe("#postCreditCardPayment", () => {
    beforeEach(() => {
      api.post = jest.fn();
    });

    const paymentInformations = {
      country: "Brazil",
      state: "TO",
      city: "Palmas",
      tax_id: "000.000.000-00",
      offer_id: 1,
      email: "usertest@ribon.io",
      card: {
        number: "0000 0000 0000 0000",
        name: "User Test",
        expirationMonth: "06",
        expirationYear: "27",
        cvv: "000",
      },
    };

    it("expects to send a get request with the correct info: url, params and headers", () => {
      creditCardPaymentApi.postCreditCardPayment(paymentInformations);

      expect(api.post).toHaveBeenCalledWith(
        "/api/v1/payment/credit_cards",
        paymentInformations,
      );
    });
  });
});
