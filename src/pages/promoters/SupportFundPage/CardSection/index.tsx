import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import useGivingValues from "hooks/apiHooks/useGivingValues";
import { useLanguage } from "hooks/useLanguage";
import Dropdown from "components/atomics/Dropdown";
import theme from "styles/theme";
import { Currencies } from "types/enums/Currencies";
import { coinByLanguage } from "lib/coinByLanguage";
import Divider from "components/atomics/Divider";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import BillingInformationSection from "./BillingInformationSection";
import FeesSection from "./FeesSection";
import * as S from "./styles";
import PaymentInformations from "../PaymentInformationsSection";

const { lightGray } = theme.colors;

function CardSection(): JSX.Element {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportFundPage.cardSection",
  });
  const { currentLang } = useLanguage();
  const [currentCoin, setCurrentCoin] = useState<Currencies>(
    coinByLanguage(currentLang),
  );
  const { givingValues, refetch: refetchGivingValues } =
    useGivingValues(currentCoin);

  const { handleSubmit, selectedButtonIndex, setSelectedButtonIndex } =
    useCardPaymentInformation();

  const givingValue = useCallback(() => {
    if (givingValues) return givingValues[selectedButtonIndex]?.value;

    return 0;
  }, [selectedButtonIndex]);

  function givingTotal() {
    if (!givingValues) return "";

    return givingValues[selectedButtonIndex]?.valueText;
  }

  const sections = [
    <FeesSection
      currency={currentCoin}
      givingValue={givingValue()}
      givingTotal={givingTotal()}
    />,
    <BillingInformationSection />,
    <PaymentInformations />,
  ];

  function handleClickNext() {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      handleSubmit();
    }
  }

  useEffect(() => {
    refetchGivingValues();
  }, [currentCoin]);

  return (
    <S.CardSectionContainer>
      <Dropdown
        name="currency"
        label={t("currency")}
        values={[Currencies.USD, Currencies.BRL]}
        defaultValue={currentCoin}
        onOptionChanged={(value) => setCurrentCoin(value)}
      />
      <S.Subtitle>{t("subtitleCard")}</S.Subtitle>

      <S.ValuesContainer>
        {givingValues?.map((item, index) => (
          <S.CardValueButton
            text={item?.valueText}
            onClick={() => {
              setSelectedButtonIndex(index);
            }}
            outline={index !== selectedButtonIndex}
            key={item?.value}
          />
        ))}
      </S.ValuesContainer>

      <Divider color={lightGray} />

      {sections[currentSectionIndex]}
      <S.ButtonContainer>
        <S.FinishButton
          text={
            currentSectionIndex < sections.length - 1
              ? t("buttonTextCard")
              : t("buttonSubmit")
          }
          onClick={() => {
            handleClickNext();
          }}
        />
      </S.ButtonContainer>
    </S.CardSectionContainer>
  );
}

export default CardSection;
