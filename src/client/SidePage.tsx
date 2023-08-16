import React from "react"
import { GhostInfo, Player } from "../shared/state"

type Props = {
    players: Player[]
    ghost: GhostInfo
}
//gridTemplateColumns: "50% 50%"
export default function SidePage(props: Props) {
    return <div style={{position: "absolute", bottom: 0, height: "65%", width: "100%"}}>
        <div style={{marginLeft: "3vw", marginRight: "3vw"}}>
            <h1 style={{textAlign: "center", width: "100%", marginBottom: "0px"}}><u>Phasmophobia</u></h1>
            <div style={{width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center"}}> 
                {props.players.map((p, i) => 
                    <p style={{textAlign: "center", margin: "0px", width: "50%"}} key={i}>{p.state === "alive" ? p.name : <s>{p.name}</s>}</p>
                )}
            </div>
            <div style={{width: "100%", position: "absolute", top: "10vw", left: 0, right: 0}}>
                <div style={{margin: "3vw"}}>
                    <h2 style={{textAlign: "center", margin: "0px", marginTop: "1vw"}}>The Ghost</h2>
                    <p style={{margin: "0px", marginTop: "0.5vw"}}>Name: {props.ghost.name}</p>
                    <p style={{margin: "0px", marginTop: "0.5vw"}}>Reponds: {props.ghost.responds}</p>
                </div>
            </div>
        </div>
    </div>
}