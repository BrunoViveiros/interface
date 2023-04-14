import { useContext } from "react";
import Notification from "types/entities/Notification";
import theme from "styles/theme";
import Icon from "components/atomics/Icon";

import * as S from "./styles";
import { ToastContext } from "..";

function Toast() {
  const { notifications } = useContext(ToastContext);

  const iconToast = (type: string) => {
    switch (type) {
      case "success":
        return "check_circle";
      case "error":
        return "report";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return "info";
    }
  };

  const iconColorToast = (type: string) => {
    switch (type) {
      case "success":
        return theme.colors.feedback.success[200];
      case "error":
        return theme.colors.feedback.error[200];
      case "warning":
        return theme.colors.feedback.warning[600];
      case "info":
        return theme.colors.feedback.informational[500];
      default:
        return theme.colors.feedback.informational[300];
    }
  };

  const positionToast = (position?: string) => {
    switch (position) {
      case "top-left":
        return { top: 0, left: 0 };
      case "top-right":
        return { top: 0, right: 0 };
      case "bottom-left":
        return { bottom: 0, left: 0 };
      case "bottom-right":
        return { bottom: 0, right: 0 };
      case "center-top":
        return { top: 0, left: "50%", transform: "translateX(-50%)" };
      case "center-bottom":
        return { bottom: 0, left: "50%", transform: "translateX(-50%)" };
      default:
        return { bottom: 0, right: 0 };
    }
  };

  const backgroundColorToast = {
    success: theme.colors.brand.primary[600],
    error: theme.colors.feedback.error[600],
    warning: theme.colors.brand.quaternary[200],
    info: theme.colors.feedback.informational[500],
  };

  const textColorToast = (type: string) => {
    switch (type) {
      case "warning":
        return theme.colors.neutral[800];
      default:
        return theme.colors.neutral10;
    }
  };
  return (
    <>
      {notifications.map((notification: Notification) => {
        const index = notifications.indexOf(notification);
        return (
          <S.NotificationToast
            style={{
              backgroundColor: notification.backgroundColor
                ? notification.backgroundColor
                : backgroundColorToast[notification.type],

              ...positionToast(notification.position || "bottom-right"),
            }}
            key={index}
          >
            <Icon
              className={
                notification.icon
                  ? notification.icon
                  : iconToast(notification.type)
              }
              name={
                notification.icon
                  ? notification.icon
                  : iconToast(notification.type)
              }
              size="24"
              color={
                notification.iconColor
                  ? notification.iconColor
                  : iconColorToast(notification.type)
              }
            />
            <S.Message
              style={{
                color: notification.textColor
                  ? notification.textColor
                  : textColorToast(notification.type),
              }}
            >
              {notification.message}
            </S.Message>
            {notification.link && (
              <S.Link href={notification.link} target="_blank" key={index}>
                {notification.linkMessage}
              </S.Link>
            )}
            <Icon
              name="close"
              className="close"
              onClick={notification.onClose}
              color={
                notification.textColor
                  ? notification.textColor
                  : textColorToast(notification.type)
              }
              size="24"
            />
          </S.NotificationToast>
        );
      })}
    </>
  );
}

export default Toast;
