import promoterCardGivingsApi from "services/api/promoterCardGivingsApi";
import PromoterCardGiving from "types/apiResponses/PromoterCardGiving";
import { Currencies } from "types/enums/Currencies";
import { useApi } from "../../useApi";

function usePromoterCardGivings(email: string, currency: Currencies) {
  const {
    data: promoterCardGivings,
    isLoading,
    refetch,
  } = useApi<PromoterCardGiving[]>({
    key: "promoterCardGivings",
    fetchMethod: () =>
      promoterCardGivingsApi.getPromoterCardGivings(email, currency),
  });

  return {
    promoterCardGivings,
    isLoading,
    refetch,
  };
}

export default usePromoterCardGivings;
