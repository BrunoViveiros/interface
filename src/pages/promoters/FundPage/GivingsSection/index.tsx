import { useTranslation } from "react-i18next";
import Carousel from "components/moleculars/sliders/Carousel";
import CardDoubleTextDividerButton from "components/moleculars/cards/CardDoubleTextDividerButton";
import useBreakpoint from "hooks/useBreakpoint";
import Button from "components/atomics/Button";
import { logError } from "services/crashReport";
import { formatFromWei } from "lib/web3Helpers/etherFormatters";
import { formatDate } from "lib/web3Helpers/timeStampFormatters";
import { useEffect, useState, useCallback } from "react";
import { logEvent } from "services/analytics";
import useNavigation from "hooks/useNavigation";
import usePromoterDonations from "hooks/apiTheGraphHooks/usePromoterDonations";
import { useWalletContext } from "contexts/walletContext";
import { useLocation } from "react-router-dom";
import { useProvider } from "hooks/useProvider";
import useToast from "hooks/useToast";
import RightArrowBlack from "./assets/right-arrow-black.svg";
import { ReactComponent as BlueRightArrow } from "./assets/right-arrow-blue.svg";
import * as S from "./styles";
import "keen-slider/keen-slider.min.css";

type LocationStateType = {
  transactionHash: string;
  time: string;
  amount: number;
  processing: boolean;
};

function GivingsSection(): JSX.Element {
  const [promoterDonations, setPromoterDonations] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const provider = useProvider();
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.fundPage.givingsSection",
  });
  const { wallet, connectWallet } = useWalletContext();
  const { getPromoterDonations } = usePromoterDonations();
  const { isMobile } = useBreakpoint();
  const coin = "USDC";

  const { state } = useLocation<LocationStateType>();

  const handleShowGivingsButtonClick = () => {
    logEvent("fundShowGivingsListBtn_click", {
      from: "yourGivingsCarousel",
    });
    if (wallet) {
      navigateTo("/promoters/show-givings");
      return;
    }
    connectWallet();
  };

  const fetchPromoterDonations = useCallback(
    async (user: string) => {
      setLoading(true);
      try {
        const donations = await getPromoterDonations(user, isMobile ? 2 : 3);
        setPromoterDonations(donations);
      } catch (e) {
        logError(e);
      } finally {
        setLoading(false);
      }
    },
    [wallet],
  );

  const handleSupportButtonClick = () => {
    if (wallet) {
      logEvent("fundSupportBtn_click", {
        from: "giveNow",
      });
      navigateTo("/promoters/support-fund");
      return;
    }

    connectWallet();
  };

  useEffect(() => {
    if (wallet) {
      fetchPromoterDonations(wallet);
    }
  }, [wallet]);

  function concatLinkHash(hash: string) {
    return `https://mumbai.polygonscan.com/tx/${hash}`;
  }

  function shouldRenderCarousel() {
    return promoterDonations?.promoterDonations.length !== 0 && wallet;
  }

  const transactionIsBeingProcessed = useCallback(async (hash: string) => {
    try {
      const receipt = await provider?.getTransactionReceipt(hash);
      const response = receipt && receipt !== null;
      if (response) {
        toast({
          message: t("transactionSuccessText"),
          type: "success",
          link: `https://mumbai.polygonscan.com/tx/${hash}`,
        });
        console.log("transaction success");
        return false;
      }
    } catch (e) {
      console.log(e);
    }
    return true;
  }, []);

  function shouldRenderProcessingTransaction() {
    if (
      state?.processing &&
      transactionIsBeingProcessed(state?.transactionHash)
    ) {
      return (
        <CardDoubleTextDividerButton
          key={state.transactionHash}
          firstText={state.time}
          mainText={state.amount.toString()}
          rightComplementText={coin}
          buttonText={t("linkTransactionText")}
          rightComponentButton={RightArrowBlack}
          link={concatLinkHash(state.transactionHash)}
          processingText={t("processingText")}
          processing={state.processing}
        />
      );
    }
    return null;
  }

  // pegar transações que estão no cache (ou navigation)
  // passar pra função transactionsisbeingprocessed
  // se retornar true, add num array
  // se retornar false, remove do array
  // seguir estrutura do console.log

  // promoterDonations: Array(2)
  // 0:
  // amountDonated: "120000000000000000"
  // id: "0xab711d2b54163a645527d8e3dc26fb3f93243dedbd4f02859728e0c6edab4ea9"
  // timestamp: "1651670985"
  // user: "0x026b2ed6b34c98f6624b448865642056d04d730c"
  // 1:
  // amountDonated: "110000000000000000"
  // id: "0x6a0f0bd64718123702ac7fb2d586b23c1a74094d89122166fd6b4271dea00ce4"
  // timestamp: "1651670234"
  // user: "0x026b2ed6b34c98f6624b448865642056d04d730c"
  // __typename: "PromoterDonation"
  //

  // nessa lista, passar pro carrossel com status processando
  // a lista do contrato: passar com status sucesso

  function renderCardsCarousel() {
    return promoterDonations?.promoterDonations.map((item: any) => (
      <div className="keen-slider__slide" key={item.id}>
        {shouldRenderProcessingTransaction()}
        <CardDoubleTextDividerButton
          key={item.id}
          firstText={formatDate(item.timestamp).toString()}
          mainText={formatFromWei(item.amountDonated)}
          rightComplementText={coin}
          buttonText={t("linkTransactionText")}
          rightComponentButton={RightArrowBlack}
          link={concatLinkHash(item.id)}
        />
      </div>
    ));
  }
  return (
    <S.Container>
      <S.SectionTitle>{t("subtitleGivings")}</S.SectionTitle>
      {shouldRenderCarousel() ? (
        !loading && (
          <Carousel sliderPerView={isMobile ? 1.8 : 4} spacing={-10}>
            {renderCardsCarousel()}
            {false && (
              <div className="keen-slider__slide">
                <S.LastCardCarousel
                  onClick={() => {
                    handleShowGivingsButtonClick();
                  }}
                >
                  <BlueRightArrow />
                  <S.TextLastCard>{t("textLastCard")}</S.TextLastCard>
                </S.LastCardCarousel>
              </div>
            )}
          </Carousel>
        )
      ) : (
        <S.CardBlank>
          <S.GivingText>{t("firstGivingText")}</S.GivingText>
          <Button
            text={t("firstGivingButtonText")}
            onClick={handleSupportButtonClick}
          />
        </S.CardBlank>
      )}
    </S.Container>
  );
}
export default GivingsSection;
