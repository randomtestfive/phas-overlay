import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { GameState } from "../client/state"
import { evidence } from "../client/data";

var state: GameState = {
    evidence: evidence.evidenceIds.map((e) => [e, "unchecked"])
}

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.send("index.html");
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


// app

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});