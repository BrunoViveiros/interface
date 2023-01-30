import CardCenterImageButton from "components/moleculars/cards/CardCenterImageButton";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics/firebase";
import NonProfit from "types/entities/NonProfit";
import Integration from "types/entities/Integration";
import SliderCardsEnhanced from "components/moleculars/sliders/SliderCardsEnhanced";
import { useBlockedDonationModal } from "hooks/modalHooks/useBlockedDonationModal";
import { useLocation } from "react-router-dom";
import useVoucher from "hooks/useVoucher";
import useStories from "hooks/apiHooks/useStories";
import useNavigation from "hooks/useNavigation";
import useToast from "hooks/useToast";
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import * as S from "../styles";

type LocationStateType = {
  failedDonation: boolean;
  blockedDonation: boolean;
};

type Props = {
  nonProfits: NonProfit[];
  integration: Integration | undefined;
  setChosenNonProfit: (nonProfit: NonProfit) => void;
  setConfirmModalVisible: (visible: boolean) => void;
  canDonate: boolean;
  currentNonProfit: number;
  onCurrentNonProfitChange: (index: number) => void;
};

function NonProfitsList({
  nonProfits,
  setChosenNonProfit,
  setConfirmModalVisible,
  canDonate,
  integration,
  currentNonProfit,
  onCurrentNonProfitChange,
}: Props): JSX.Element {
  const { state } = useLocation<LocationStateType>();

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { showBlockedDonationModal } = useBlockedDonationModal(
    state?.blockedDonation,
    integration,
  );

  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();

  const toast = useToast();

  const chooseNonProfit = useCallback((nonProfit: NonProfit) => {
    setChosenNonProfit(nonProfit);
  }, []);

  const { formattedImpactText } = useFormattedImpactText();
  const { isVoucherAvailable } = useVoucher();

  const canDonateAndHasVoucher = canDonate && isVoucherAvailable();

  function handleButtonClick(nonProfit: NonProfit) {
    logEvent("donateCardButton_click", {
      causeId: nonProfit.id,
    });
    chooseNonProfit(nonProfit);
    if (canDonate) {
      setConfirmModalVisible(true);
      logEvent("authDonationDial_view");
    } else {
      logEvent("donateBlockedButton_click");
      showBlockedDonationModal();
      logEvent("donateBlockedDonation_view");
    }
  }
  const { fetchNonProfitStories } = useStories();

  const { navigateTo } = useNavigation();

  const handleImageClick = async (nonProfit: NonProfit) => {
    showLoadingOverlay(t("stories.loading"));
    const stories = await fetchNonProfitStories(nonProfit.id);

    if (stories.length > 0) {
      hideLoadingOverlay();
      navigateTo({
        pathname: "/stories",
        state: {
          stories,
          nonProfit,
          canDonateAndHasVoucher,
        },
      });
    } else {
      hideLoadingOverlay();

      toast({
        message: t("stories.empty"),
        type: "error",
      });
    }
  };

  return (
    <S.NonProfitsListContainer>
      <SliderCardsEnhanced
        currentSlide={currentNonProfit}
        onCurrentSlideChange={onCurrentNonProfitChange}
        saveStateIdentifier="nonProfitsList"
        loop
      >
        {nonProfits.map((nonProfit: any, idx: number) => (
          <S.CardWrapper key={idx.toString()}>
            <CardCenterImageButton
              image={nonProfit.mainImage || nonProfit.cause?.mainImage}
              title={formattedImpactText(
                nonProfit,
                undefined,
                false,
                false,
                undefined,
                t("impactPrefix"),
              )}
              buttonText={
                canDonateAndHasVoucher
                  ? t("donateText")
                  : t("donateBlockedText")
              }
              onClickButton={() => handleButtonClick(nonProfit)}
              onClickImage={() => handleImageClick(nonProfit)}
              softDisabled={!canDonateAndHasVoucher}
              infoTextLeft={nonProfit.name}
              infoTextRight={nonProfit.cause?.name}
              fullWidth
            />
          </S.CardWrapper>
        ))}
      </SliderCardsEnhanced>
    </S.NonProfitsListContainer>
  );
}

export default NonProfitsList;
