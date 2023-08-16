import { CssBaseline, GeistProvider, Tabs, Input, Text, Button, Grid, Select, Spacer, Divider } from "@geist-ui/core"
import { EvidenceStateState, GameState, GhostResponds, defaultState, ghostResponds } from "../shared/state"
import React, { useEffect, useState } from "react"
import { evidence } from "../shared/data"
import { ThumbsDown, ThumbsUp } from "@geist-ui/icons"

function logIdentity<A>(a: A): A {
    console.log(a)
    return a
}

const App: React.FC = () => {
    const [ gameState, setGameState ] = useState<GameState>(defaultState)
    const [ ready, setReady ] = useState(false)

    async function syncState() {
        const newState = (await fetch("/state").then((r) => r.json())) as GameState
        console.log("got state")
        console.log(newState)
        setGameState(newState)
        setReady(true)
    }

    function pushState() {
        fetch("/state", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gameState)
        })
    }

    useEffect(() => {
        syncState()
    }, [])

    useEffect(() => {
        if(ready) {
            console.log("pushed state")
            pushState()
        }
    }, [gameState, ready])

    return <GeistProvider>
        <CssBaseline />
        <Grid.Container gap={0} direction="column" height="100dvh" wrap="nowrap">
            <Grid xs width="100%" >
                <Tabs initialValue="3" width="100%">
                    <div style={{marginLeft: "20px", marginRight: "20px"}}>
                        <Tabs.Item key={1} label="Players" value="1" scale={2}>
                            <Grid.Container alignContent="flex-end" alignItems="flex-end" gap={2}>
                                <Grid xs={12}><Input scale={2} htmlType="number" min={1} max={4} value={gameState.players.length.toString()}
                                        onChange={(e) => e.target.valueAsNumber > 0 && e.target.valueAsNumber <= 4 ? setGameState({...gameState, players: new Array(e.target.valueAsNumber).fill(0).map((n, i) => gameState.players[i]).map((p) => p ? p : {name:"???",state:"alive"})}) : null}>
                                            Player count
                                </Input></Grid>
                                <Grid xs={12}><Button scale={2} width="100%" onClick={(e) => setGameState({...defaultState, players: gameState.players.map((p) => ({name:p.name,state:"alive"}))})}>Reset</Button></Grid>
                            </Grid.Container>
                            <Divider width="100vw" />
                            {gameState.players.map((p, i) => {
                                return <div key={i}><Input  width="100%" scale={2} value={p.name}
                                    iconRight={p.state === "alive" ? <ThumbsUp /> : <ThumbsDown />} label={"Player " + (i+1)}
                                    iconClickable onIconClick={(e) => setGameState({...gameState, players: [ ...gameState.players.slice(0, i), { name: p.name, state: p.state === "alive" ? "dead" : "alive"}, ...gameState.players.slice(i+1)]})}
                                    onChange={(e) => setGameState({...gameState, players: [...gameState.players.slice(0, i), {...p, name: e.target.value}, ...gameState.players.slice(i+1)]})}/>
                                <Spacer h={0.5}/></div>
                            })}
                            
                        </Tabs.Item>
                        <Tabs.Item key={2} label="Ghost" value="2" scale={2}>
                            <Input width="100%" scale={2} value={gameState.ghost.name} onChange={(e) => setGameState({...gameState, ghost: {...gameState.ghost, name: e.target.value}})}><Text>Ghost name</Text></Input>
                            <Spacer />
                            <Text>Responds to</Text>
                            <Select scale={2} width="100%" value={ghostResponds.indexOf(gameState.ghost.responds).toString()} onChange={(e) => setGameState({...gameState, ghost: {...gameState.ghost, responds: ghostResponds[Number(e)]}})}>
                                {ghostResponds.map((r) => {
                                    return <Select.Option key={ghostResponds.indexOf(r)} value={ghostResponds.indexOf(r).toString()} scale={2}>{r}</Select.Option>
                                })}
                            </Select>
                        </Tabs.Item>
                        <Tabs.Item key={3} label="Evidence" value="3" scale={2}>
                            {evidence.evidenceIds.map((e) => {
                                return <Grid.Container key={e}>
                                    <Grid xs><Text>{evidence.evidenceData[e].name}</Text></Grid>
                                    <Grid><Select scale={2}
                                        value={gameState.evidence.find((e2) => e === e2.id)!.state}
                                        onChange={(s) => setGameState({...gameState, evidence: gameState.evidence.map((e2) => e === e2.id ? {...e2, state: s as EvidenceStateState }: e2 )})}>
                                            <Select.Option value="unchecked" scale={2}>Unchecked</Select.Option>
                                            <Select.Option value="yes" scale={2}>Yes</Select.Option>
                                            <Select.Option value="no" scale={2}>No</Select.Option>
                                    </Select></Grid>
                                </Grid.Container>
                            })}
                        </Tabs.Item>
                    </div>
                </Tabs>
            </Grid>
            <Grid>
                <div style={{margin: "20px"}}>
                    <Grid.Container gap={2}>
                        <Grid xs={12}><Button width="100%" type="success" scale={2} onClick={syncState}>Sync</Button></Grid>
                        <Grid xs={12}><Button width="100%" type="success" scale={2} onClick={pushState}>Push</Button></Grid>
                    </Grid.Container>
                </div>
            </Grid>
        </Grid.Container>
        
    </GeistProvider>
}

export default App