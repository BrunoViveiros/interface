import { useTranslation } from "react-i18next";
import React, { useCallback, useEffect, useState } from "react";
import SimpleMaskMoney from "simple-mask-money";
import { useContract } from "hooks/useContract";
import {
  DONATION_TOKEN_CONTRACT_ADDRESS,
  RIBON_CONTRACT_ADDRESS,
} from "utils/contractUtils";
import RibonAbi from "utils/abis/RibonAbi.json";
import DonationTokenAbi from "utils/abis/DonationToken.json";
import { useWalletContext } from "contexts/walletContext";
import { utils } from "ethers";
import { logError } from "services/crashReport";
import UsdcIcon from "assets/icons/usdc-icon.svg";
import useToast from "hooks/useToast";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "services/analytics";
import * as S from "./styles";

function SupportFundPage(): JSX.Element {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] = useState("");

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportFundPage",
  });
  const contract = useContract({
    address: RIBON_CONTRACT_ADDRESS,
    ABI: RibonAbi.abi,
  });
  const donationTokenContract = useContract({
    address: DONATION_TOKEN_CONTRACT_ADDRESS,
    ABI: DonationTokenAbi.abi,
  });
  const { wallet } = useWalletContext();
  const toast = useToast();
  const { navigateBack } = useNavigation();

  const args = {
    afterFormat(e: string) {
      setAmount(e);
    },
    allowNegative: false,
    negativeSignAfter: false,
    prefix: "",
    suffix: "",
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ".",
    thousandsSeparator: ",",
    cursor: "end",
  };

  const approveAmount = async () => {
    await donationTokenContract?.functions.approve(
      RIBON_CONTRACT_ADDRESS,
      utils.parseEther(amount),
      {
        from: wallet,
      },
    );
  };

  const fetchUsdcUserBalance = useCallback(async () => {
    const balance = await donationTokenContract?.balanceOf(wallet);
    const formattedBalance = parseFloat(utils.formatEther(balance)).toFixed(2);

    setUserBalance(formattedBalance);
  }, [wallet]);

  useEffect(() => {
    fetchUsdcUserBalance();
  }, [fetchUsdcUserBalance]);

  useEffect(() => {
    SimpleMaskMoney.setMask("#amount", args);
  }, []);

  useEffect(() => {
    logEvent("fundSupportScreen_view");
  }, []);

  const disableButton = () => amount === "0.00" || loading;
  const finishButtonText = () => {
    if (loading) return "...";
    if (disableButton()) return t("disabledButtonText");

    return t("buttonText");
  };

  const handleFinishButtonClick = async () => {
    logEvent("fundSupportConfirmBtn_click");
    setLoading(true);
    try {
      await approveAmount();
      const response = await contract?.functions.addDonationPoolBalance(
        utils.parseEther(amount),
      );
      toast({
        message: t("transactionSuccessText"),
        type: "success",
        link: `https://mumbai.polygonscan.com/tx/${response.hash}`,
      });
      logEvent("toastNotification_view", {
        status: "transactionProcessed",
      });
      navigateBack();
    } catch (error) {
      logEvent("toastNotification_view", {
        status: "transactionFailed",
      });
      logError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.Subtitle>{t("subtitle")}</S.Subtitle>

      <S.InputContainer>
        <S.Input
          name="amount"
          id="amount"
          type="text"
          placeholder="0.00"
          inputMode="numeric"
        />
        <S.UsdcContainer>
          <S.UsdcIcon src={UsdcIcon} />
          <S.UsdcText>USDC</S.UsdcText>
        </S.UsdcContainer>
      </S.InputContainer>
      <S.Text>{t("usdcBalanceText", { balance: userBalance })}</S.Text>

      <S.ButtonContainer>
        <S.FinishButton
          text={finishButtonText()}
          onClick={handleFinishButtonClick}
          disabled={disableButton()}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}

export default SupportFundPage;
