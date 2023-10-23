import React from "react";
import styles from "./AuthButton.module.scss";
import Loader from "@/core/components/atoms/loader/Loader";

interface AuthButtonProps {
  name: string;
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean
}

function AuthButton({ name, type, disabled }: AuthButtonProps) {
  return (
    <button className={styles.but} type={type} disabled={disabled}>
     {!disabled ? 
     name 
     :
     (
        <Loader size={28} />
     )
  }
    </button>
  );
}

export default AuthButton;
