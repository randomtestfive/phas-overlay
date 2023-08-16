import React, { useEffect, useState } from "react";
import BottomPage, { CheckMap } from "./BottomPage";
import SidePage from "./SidePage";
import { EvidenceId, evidence as evidenceImport, ghosts } from "../shared/data";
import { CheckState } from "./BottomPage";
import usePollingEffect from "./polling-effect";
import { EvidenceState, GameState, GhostInfo, Player, defaultState } from "../shared/state";

function stateToCheck(state: EvidenceState[]): CheckMap[] {
    const impossible = evidenceImport.impossibleWithEvidence(state)
    return state.map((s) => {
        return {
            evidence: s.id,
            state: impossible.includes(s.id) ? "impossible" : s.state
        }
    })
}

const App: React.FC = () => {
    const [ evidence, setEvidence ] = useState<EvidenceState[]>(defaultState.evidence)
    const [ players, setPlayers ] = useState<Player[]>(defaultState.players)
    const [ ghost, setGhost ] = useState<GhostInfo>(defaultState.ghost)

    useEffect(() => {
        const interval = setInterval(async function() {
            const state = (await fetch("/state").then((r) => r.json())) as GameState
            setEvidence(state.evidence)
            setPlayers(state.players)
            setGhost(state.ghost)
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    return <div style={{width: "100%", margin: 0, position: "relative"}}>
        <img src="background.png" width="100%" style={{display: "block"}}/>
        <div style={{position: "absolute", width: "22.5%", height: "80.7%", right: 0, top: 0}}><SidePage players={players} ghost={ghost}/></div>
        <div style={{position: "absolute", width: "100%", height: "22.5%", bottom: 0}}>
            <BottomPage
                evidence={stateToCheck(evidence)}
                remaining={ghosts.ghostsWithEvidence(evidence)}
            />
        </div>
    </div>
};

export default App;