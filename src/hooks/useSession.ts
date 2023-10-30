import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

// hook that can be used to get the session data
export function useSession() {
    const context = useContext(UserContext);
    return context;
  };