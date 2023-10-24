"use client";
import styled from "@emotion/styled";
import React from "react";
import { getTimeDifference } from "../../services/utils";
import { css } from "@emotion/react";

interface NotificationsWrapperProps {
  open: boolean;
  notifications: any[];
  setOpen: (open: boolean) => void;
}

const StyledNotificationsWrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 55px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
  height: auto;
  max-height: 50vh;
  width: 20rem;
  z-index: 9999;
  background: white;
  border-radius: 10px 0 10px 10px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: initial;
    background: transparent;
    border-radius: 9px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #50505021;
    border: 4px solid transparent;
    border-radius: 9px;
    background-clip: content-box;
  }
`;

const StyledNotificationsHeader = styled.div`
  background: #5e5ee3;
  font-weight: 500;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border-radius: 10px 10px 0px 0px;
  width: 20rem;
  position: fixed;
  color: white;
`;

const StyledMessage = styled.div<{ seen: boolean }>`
  font-size: 0.9rem;
  font-weight: 600;
  color: #5e5e5e;

  &:hover {
    color: blue;
  }

  ${({ seen }) =>
    !seen &&
    css`
      font-weight: 800;
      color: blue;
    `}
`;
const StyledTime = styled.div`
  text-align: left;
  font-style: italic;
  color: #979797;
  font-size: 0.7rem;
`;

const StyledNotification = styled.div<{ seen: boolean }>`
  border-bottom: 2px solid rgba(129, 129, 137, 0.1);
  padding: 5px 20px;
  background: rgba(255, 255, 255, 0.178);

  &:hover {
    border-radius: 10px;
    cursor: pointer;
    background: #5c5ce01a;
  }

  ${({ seen }) =>
    !seen &&
    css`
      font-weight: 800;
      background: #5c5ce01a;
    `}
`;

const StyledSpacer = styled.div`
  height: 30px;
`;

function NotificationsWrapper({
  open,
  setOpen,
  notifications,
}: NotificationsWrapperProps) {
  function handleNotificationClick(notification: any) {}

  return (
    <>
      {open && (
        <>
          <StyledNotificationsWrapper>
            <StyledNotificationsHeader>Notifications</StyledNotificationsHeader>
            <StyledSpacer />
            {notifications.length > 0 ? (
              notifications?.map((notification, index) => {
                return (
                  <StyledNotification key={index} seen={notification.seen}>
                    <StyledMessage
                      seen={notification.seen}
                      onClick={() => {
                        handleNotificationClick(notification);
                      }}
                    >
                      {notification.message}
                    </StyledMessage>
                    <StyledTime>
                      {getTimeDifference(notification.createdAt)}
                    </StyledTime>
                  </StyledNotification>
                );
              })
            ) : (
              <div
                style={{
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px 0",
                  fontStyle: "italic",
                }}
              >
                No Notifications Yet
              </div>
            )}
          </StyledNotificationsWrapper>
        </>
      )}
    </>
  );
}

export default NotificationsWrapper;
