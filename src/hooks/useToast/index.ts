import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  ToastContext,
} from "contexts/toastContext";
import { useContext } from "react";
import theme from "styles/theme";

type Props = {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  link?: string;
  timeout?: number;
  linkMessage?: string;
  icon?: string;
  color?: string;
  link2?: string;
  linkName2?: string;
};

const typeColorBackground = {
  success: theme.colors.brand.primary[600],
  error: theme.colors.feedback.error[600],
  warning: theme.colors.brand.quaternary[200],
  info: theme.colors.feedback.informational[500],
};

const useToast = () => {
  const { dispatch } = useContext(ToastContext);
  function toast({
    type = "success",
    message,
    link,
    timeout = 1000000,
    linkMessage,
    color,
  }: Props) {
    const id = Math.random();
    dispatch({
      type: ADD_NOTIFICATION,
      payload: {
        id,
        type,
        message,
        link,
        linkMessage,
        color: type ? typeColorBackground[type] : color,
      },
    });
    setTimeout(() => {
      dispatch({
        type: DELETE_NOTIFICATION,
        payload: id,
      });
    }, timeout);
  }

  return toast;
};

export default useToast;
