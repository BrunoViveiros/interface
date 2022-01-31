import { logError } from "services/crashReport";

export async function checkConnectionRequest(): Promise<string | null> {
  try {
    const { ethereum, alert } = window;

    if (!ethereum) {
      alert("Make sure you have metamask!");
      return null;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      return account;
    }
  } catch (error) {
    logError(error);
  }

  return null;
}

export async function connectWalletRequest(): Promise<string | null> {
  try {
    const { ethereum, alert } = window;

    if (!ethereum) {
      alert("Get MetaMask!");
      return null;
    }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts[0];
  } catch (error) {
    logError(error);
  }

  return null;
}
