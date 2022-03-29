import { createContext, useContext, useState } from "react";
import { track } from "../types"

export type RecentTracksContextType = {
    recentTracks: track[] |undefined
    setRecentTracks: (state: track[]) => void
}

export const RecentTracksContext = createContext<RecentTracksContextType>({
    recentTracks: [],
    setRecentTracks: () => { },
})
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }: any) => {
    const [recentTracks, setRecentTracks] = useState<track[]>()
    return <RecentTracksContext.Provider value={{ recentTracks, setRecentTracks }}>{children}</RecentTracksContext.Provider>
}

