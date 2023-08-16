import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { GameState, defaultState } from "./shared/state"
import { evidence } from "./shared/data";

var state: GameState = defaultState

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.sendFile(path.join(__dirname, "../public/mobile.html"));
    } catch (error) {
        next(error);
    }
});

app.get("/client", (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.sendFile(path.join(__dirname, "../public/client.html"));
    } catch (error) {
        next(error);
    }
});

app.get("/state", (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.json(state)
    } catch (error) {
        next(error);
    }
});

app.post("/state", (req: Request, res: Response, next: NextFunction): void => {
    try {
        console.log(req.body)
        state = req.body as GameState
        res.sendStatus(200)
    } catch (error) {
        next(error);
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});