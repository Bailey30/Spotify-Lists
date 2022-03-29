import React, { useMemo } from "react"
import { createContext, useState, useContext } from "react"
import { track } from "../types"


export type GlobalContext = {

    playingTrack: number | undefined
    setPlayingTrack: (state: number) => void
    playArray: string[] | undefined
    setPlayArray: (state: string[]) => void
    trackName: string | undefined
    setTrackName: (state: string) => void
}

export const StoreContext = createContext<GlobalContext>({
    playingTrack: 0,
    setPlayingTrack: () => { },
    playArray: [],
    setPlayArray: () => { },
    trackName: "",
    setTrackName: () => { }
})

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }: any) => {
    const [playingTrack, setPlayingTrack] = useState<number>()
    const [playArray, setPlayArray] = useState<string[]>()
    const [trackName, setTrackName] = useState<string>()

    return <StoreContext.Provider
        value={{
            playingTrack, setPlayingTrack,
            playArray, setPlayArray,
            trackName, setTrackName

        }}>{children}</StoreContext.Provider>
}