import React from "react";
import { EvidenceId, GhostDatum, evidence, ghosts } from "../shared/data";

export type CheckState = "unchecked" | "yes" | "no" | "impossible"

type CheckboxProps = {
    text: string
    state: CheckState
}

function mapState(state: CheckState): string {
    return state == "unchecked" ? "check-empty.png" : state == "yes" ? "check-yes.png" : state == "no" ? "check-no.png" : "check-impossible.png"
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
    remaining: GhostDatum[]
}

export default function BottomPage(props: Props) {
    return <div style={{padding: "1vw", height: "100%", boxSizing: "border-box"}}>
        <div style={{display: "grid", gridAutoFlow: "column", gridTemplateRows: "repeat(3, 1fr)", gridTemplateColumns: "calc(100%/3) calc(100%/3) calc(100%/3)", width: "40%", height: "100%", float: "left"}}>
            { props.evidence.map((e) => {
                return <Checkbox key={e.evidence} state={e.state} text={evidence.getEffectiveShortNameForId(e.evidence)}/>
            })}
            <p style={{margin: "0px", gridRow: "2 / 3", wordBreak: "break-word", width: "100%"}}>{props.remaining.length} possible ghosts</p>
        </div>
        { props.remaining.length > 4 ?
            <div style={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)", width: "60%", float: "right", marginTop: "1vw"}}>
                { props.remaining.map((g) => 
                    <p key={g.name} style={{margin: "0px"}}>{g.name}</p>
                )}
            </div> :
            <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", width: "60%", float: "right", marginTop: "1vw"}}>
                { props.remaining.map((g) =>
                    <div key={g.name}>
                        <h2 style={{margin: "0px"}}>{g.name}</h2>
                        <p style={{margin: "0px", fontSize: "1.5vw"}}>{g.special}</p>
                    </div>
                )}
            </div>
        }
    </div>
}