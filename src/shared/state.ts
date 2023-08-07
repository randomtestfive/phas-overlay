import { EvidenceId } from "./data"

export type EvidenceState = {
    id: EvidenceId
    state: "unchecked" | "yes" | "no"
}

export type GameState = {
    evidence: EvidenceState[]
}