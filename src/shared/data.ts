import { EvidenceState } from "./state"

export type EvidenceDatum = {
    name: string
    shortName?: string
}

const evidenceIds = [ "dots", "emf", "fingerprints", "freezing", "orbs", "writing", "spiritbox" ] as const
export type EvidenceId = typeof evidenceIds[number]

const evidenceData: Record<EvidenceId, EvidenceDatum> = {
    dots: { name: "D.O.T.S. Projector", shortName: "D.O.T.S." },
    emf: { name: "EMF Level 5", shortName: "EMF 5" },
    fingerprints: { name: "Fingerprints" },
    freezing: { name: "Freezing Temperatures", shortName: "Freezing Temp." },
    orbs: { name: "Ghost Orbs" },
    writing: { name: "Ghost Writing" },
    spiritbox: { name: "Spirit Box" }
}

function getEffectiveShortNameForId(evidence: EvidenceId): string {
    return getEffectiveShortName(evidenceData[evidence])
}

function getEffectiveShortName(evidence: EvidenceDatum): string {
    return evidence.shortName || evidence.name
}

export type GhostDatum = {
    name: string
    evidence: EvidenceId[]
    special?: string
}

const ghostData: readonly GhostDatum[] = [
    { name: "Banshee", evidence: ["dots", "fingerprints", "orbs"], special: "Targets a single person, screams in parabolic microphone" },
    { name: "Demon", evidence: ["fingerprints", "freezing", "writing"], special: "Hunts at 70%, Crucifix more effective" },
    { name: "Deogen", evidence: ["dots", "writing", "spiritbox"], special: "Hunts at 40%, moves faster when farther away" },
    { name: "Goryo", evidence: ["dots", "emf", "fingerprints"], special: "D.O.T.S. is only visible on video" },
    { name: "Hantu", evidence: ["fingerprints", "freezing", "orbs"], special: "Faster in the cold, breath is visible when breaker off" },
    { name: "Jinn", evidence: ["emf", "fingerprints", "freezing"], special: "EMF comes from the breaker instead of the ghost" },
    { name: "Mare", evidence: ["orbs", "writing", "spiritbox"], special: "Turns off lights, sometimes immediatly" },
    { name: "Moroi", evidence: ["freezing", "writing", "spiritbox"], special: "Curses people over spirit box, causing sanity loss" },
    { name: "Myling", evidence: ["emf", "fingerprints", "writing"], special: "More sounds on parabolic, hunts can only be heard from with 10m" },
    { name: "Obake", evidence: ["emf", "fingerprints", "orbs"], special: "Can leave handprints with 6 fingers, shapeshifts during hunts" },
    { name: "Oni", evidence: ["dots", "emf", "freezing"], special: "More active with people nearby, double sanity loss during events" },
    { name: "Onryo", evidence: ["freezing", "orbs", "spiritbox"], special: "Candles act as crucifix, although extinguishing flames can cause hunts" },
    { name: "Phantom", evidence: ["dots", "fingerprints", "spiritbox"], special: "Taking a picture can make it disapear (not during hunts)" },
    { name: "Poltergeist", evidence: ["fingerprints", "writing", "spiritbox"], special: "Throws objects more often, has to throw during hunts" },
    { name: "Raiju", evidence: ["dots", "emf", "orbs"], special: "Hunts at 65% if electrical equipment nearby, faster as well" },
    { name: "Revenant", evidence: ["freezing", "orbs", "writing"], special: "Faster when chasing a person, slower otherwise" },
    { name: "Shade", evidence: ["emf", "freezing", "writing"], special: "Hunts at 35%, less active when more than one person near" },
    { name: "Spirit", evidence: ["emf", "writing", "spiritbox"], special: "Smudge sticks work for 3 minutes" },
    { name: "Thaye", evidence: ["dots", "orbs", "writing"], special: "Ages when people are nearby, hunts at 70%-15% based on age" },
    { name: "The Mimic", evidence: ["fingerprints", "freezing", "orbs", "spiritbox"], special: "Mimics other ghost's abilities and behaviour" },
    { name: "The Twins", evidence: ["emf", "freezing", "spiritbox"], special: "Not actually twins, has extra long range, can teleport last long interaction when starting hunt" },
    { name: "Wraith", evidence: ["dots", "emf", "spiritbox"], special: "Can't step in salt, can teleport to a random person causing EMF" },
    { name: "Yokai", evidence: ["dots", "orbs", "spiritbox"], special: "Can hunt at 80% if people are talking nearby, during hunt can only hear in 2m radius" },
    { name: "Yurei", evidence: ["dots", "freezing", "orbs"], special: "Will close doors, causing 15% sanity loss for all within 7.5m" }
]

function ghostsWithEvidence(evidence: EvidenceState[]): GhostDatum[] {
    const correct = ghostData.filter((g) => evidence.map((e) => {
        if(e.state === "yes") {
            return g.evidence.includes(e.id)
        } else if(e.state === "no") {
            return !g.evidence.includes(e.id)
        } else {
            return true
        }
    }).reduce((a, b) => a && b))
    return correct
}

function impossibleWithEvidence(evidence: EvidenceState[]): EvidenceId[] {
    const ghosts = ghostsWithEvidence(evidence)
    const alreadyNo = evidence.filter((e) => e.state === "no").map((e) => e.id)
    const alreadyYes = evidence.filter((e) => e.state === "yes").map((e) => e.id)
    const possibleEvidence = ghosts.flatMap((g) => g.evidence)
    return evidenceIds.filter((e) => !alreadyNo.includes(e)).filter((e) => !possibleEvidence.includes(e)).filter((e) => !alreadyYes.includes(e))
}

const evidence = {
    evidenceIds,
    evidenceData,
    getEffectiveShortName,
    getEffectiveShortNameForId,
    impossibleWithEvidence
}

const ghosts = {
    ghostData,
    ghostsWithEvidence
}

export { evidence, ghosts }