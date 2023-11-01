"use client";
import React from "react";
import "./Messages.scss";
import Contacts from "./Contacts";
import MessageBoard from "./MessageBoard";
import { User } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";

interface MessagesProps {
  user: User
}

function Messages({user}: MessagesProps) {
  const params = useParams();
  const messageId = params && params.id;

  return (
    <div
      className="messageswindow"
      style={{
        width: `${
          window.innerWidth > 726
            ? window.innerWidth - 160
            : window.innerWidth - 25
        }px`,
      }}
    >
      <div className={`${messageId ? 'contactsDivClientDiv' : 'contactsDiv'} `}>
        <Contacts user={user} />
      </div>
      <div className={`${messageId ? 'messageboardClientDiv' : 'messageboardDiv'} `}>
        <MessageBoard />
      </div>
    </div>
  );
}

export default Messages;
