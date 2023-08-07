import { EvidenceId } from "./data"

export type EvidenceState = "unchecked" | "yes" | "no"

export type GameState = {
    evidence: [EvidenceId, EvidenceState][]
}