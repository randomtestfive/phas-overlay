import { EvidenceId, evidence } from "./data"

export type EvidenceStateState = "unchecked" | "yes" | "no"

export type EvidenceState = {
    id: EvidenceId
    state: EvidenceStateState
}

export const ghostResponds = [ "Everyone", "People who are alone", "We're unsure..."] as const
export type GhostResponds = typeof ghostResponds[number]

export type GhostInfo = {
    name: string
    responds: GhostResponds
}

export const playerState = [ "alive", "dead" ] as const
export type PlayerState = typeof playerState[number]

export type Player = {
    name: string
    state: PlayerState
}

export type GameState = {
    ghost: GhostInfo
    players: Player[]
    evidence: EvidenceState[]
}

export const defaultState: GameState = {
    ghost: { name: "???", responds: "We're unsure..." },
    players: [ {name: "You", state: "alive"} ],
    evidence: evidence.evidenceIds.map((e) => ({ id: e, state: "unchecked"}))
} 