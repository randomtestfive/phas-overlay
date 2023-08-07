import React from "react";
import { EvidenceId, evidence, ghosts } from "../shared/data";

export type CheckState = "unchecked" | "yes" | "no" | "impossible"

type CheckboxProps = {
    text: string
    state: CheckState
}

function mapState(state: CheckState): string {
    return state == "unchecked" ? "check-empty.png" : state == "yes" ? "check-yes.png" : "check-no.png"
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
    return <div style={{display: "flex", flexDirection: "row", alignItems: "center", alignContent: "center"}}>
        <img src={mapState(props.state)} style={{width: "3vw"}}/>
        <p style={{margin: "0px", display: "inline-block"}}><b>{props.text}</b></p>
    </div>
}
//alignContent: "center", alignItems: "center", height: "100%",

export type CheckMap = {
    evidence: EvidenceId
    state: CheckState
}

type Props = {
    evidence: CheckMap[]
}

export default function BottomPage(props: Props) {
    return <div style={{padding: "1vw", height: "100%", boxSizing: "border-box"}}>
        <div style={{display: "grid", gridAutoFlow: "column", gridTemplateRows: "repeat(3, 1fr)", width: "50%", height: "100%"}}>
            { props.evidence.map((e) => {
                return <Checkbox key={e.evidence} state={e.state} text={evidence.getEffectiveShortNameForId(e.evidence)}/>
            })}
        </div>
    </div>
}