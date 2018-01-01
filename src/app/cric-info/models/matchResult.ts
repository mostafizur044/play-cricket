import {BallByRun} from './ballByRun';
import {MatchStartData} from './matchStart';

export class MatchResult {
    public id: number = 0;
    public matchScore: Array <BallByRun> = [];
    public totalRun : number = 0;
    public wicket: number = 0;
    public extra: number = 0;
    public matchData: MatchStartData = new MatchStartData();
}