import React, { useState } from "react";
import BottomPage, { CheckMap } from "./BottomPage";
import SidePage from "./SidePage";
import { EvidenceId, evidence as evidenceImport } from "../shared/data";
import { CheckState } from "./BottomPage";
import usePollingEffect from "./polling-effect";
import { EvidenceState, GameState } from "../shared/state";

function stateToCheck(state: EvidenceState): CheckMap {
    return {
        evidence: state.id,
        state: state.state
    }
}

const App: React.FC = () => {
    const [ evidence, setEvidence ] = useState<CheckMap[]>(evidenceImport.evidenceIds.map((e) => ({ evidence: e, state: "unchecked"})))

    usePollingEffect(
        async () => {
            const state = (await fetch("/state").then((r) => r.json())) as GameState
            setEvidence(state.evidence.map(stateToCheck))
        },
        [],
        { interval: 1000 }
    )

    return <div style={{width: "100%", margin: 0, position: "relative"}}>
        <img src="background.png" width="100%" style={{display: "block"}}/>
        <div style={{position: "absolute", width: "22.5%", height: "80.7%", right: 0, top: 0}}><SidePage/></div>
        <div style={{position: "absolute", width: "100%", height: "22.5%", bottom: 0}}><BottomPage evidence={evidence}/></div>
    </div>
};

export default App;