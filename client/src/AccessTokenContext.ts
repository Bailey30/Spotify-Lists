import { createContext } from "react";

interface Context {
    Access_Token: string | null
    setToken: React.Dispatch<React.SetStateAction<string | null>>
}

export const AccessTokenContext = createContext<Context>({
    Access_Token: "",
    setToken: ()=> {}
});