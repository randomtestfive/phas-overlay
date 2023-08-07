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

type GhostDatum = {
    name: string
    evidence: EvidenceId[]
}

const ghostData: readonly GhostDatum[] = [
    { name: "Banshee", evidence: ["dots", "fingerprints", "orbs"] },
    { name: "Demon", evidence: ["fingerprints", "freezing", "writing"] },
    { name: "Deogen", evidence: ["dots", "writing", "spiritbox"] },
    { name: "Goryo", evidence: ["dots", "emf", "fingerprints"] },
    { name: "Hantu", evidence: ["fingerprints", "freezing", "orbs"] },
    { name: "Jinn", evidence: ["emf", "fingerprints", "freezing"] },
    { name: "Mare", evidence: ["orbs", "writing", "spiritbox"] },
    { name: "Moroi", evidence: ["freezing", "writing", "spiritbox"] },
    { name: "Myling", evidence: ["emf", "fingerprints", "writing"] },
    { name: "Obake", evidence: ["emf", "fingerprints", "orbs"] },
    { name: "Oni", evidence: ["dots", "emf", "freezing"] },
    { name: "Onryo", evidence: ["freezing", "orbs", "spiritbox"] },
    { name: "Phantom", evidence: ["dots", "fingerprints", "spiritbox"] },
    { name: "Poltergeist", evidence: ["fingerprints", "writing", "spiritbox"] },
    { name: "Raiju", evidence: ["dots", "emf", "orbs"] },
    { name: "Revenant", evidence: ["freezing", "orbs", "writing"] },
    { name: "Shade", evidence: ["emf", "freezing", "writing"] },
    { name: "Spirit", evidence: ["emf", "writing", "spiritbox"] },
    { name: "Thaye", evidence: ["dots", "orbs", "writing"] },
    { name: "The Mimic", evidence: ["fingerprints", "freezing", "orbs", "spiritbox"] },
    { name: "The Twins", evidence: ["emf", "freezing", "spiritbox"] },
    { name: "Wraith", evidence: ["dots", "emf", "spiritbox"] },
    { name: "Yokai", evidence: ["dots", "orbs", "spiritbox"] },
    { name: "Yurei", evidence: ["dots", "freezing", "orbs"] }
]

function ghostsWithEvidence(evidence: EvidenceId[]): GhostDatum[] {
    return ghostData.filter((g) => evidence.filter((e) => g.evidence.includes(e)).length > 0)
}

function impossibleWithEvidence(evidence: EvidenceId[]): EvidenceId[] {
    const ghosts = ghostsWithEvidence(evidence)
    const possibleEvidence = ghosts.flatMap((g) => g.evidence)
    return evidenceIds.filter((e) => !possibleEvidence.includes(e))
}

const evidence = {
    evidenceIds,
    evidenceData,
    getEffectiveShortName,
    getEffectiveShortNameForId
}

const ghosts = {
    ghostData,
    ghostsWithEvidence
}

export { evidence, ghosts }