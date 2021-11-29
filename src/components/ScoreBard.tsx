import * as React from 'react';
import { FC } from 'react';
import Logo from '../images/candy-chrush-log.png'

interface ScoreBoardProps {
    score: number,
    timer: string,
    player: string
}

const ScoreBoard: FC<ScoreBoardProps> = ({ score, timer, player }) => (
    <div className="score-board">
        <div className="card">
            <div className="card__header">
                <img src={Logo} alt="card__image" className="card__image" width="600" />
            </div>
            <div className="card__body">
                <h4>Score Board</h4>
                <span className="tag tag-blue">{score}</span>

                <div className="quest-board">
                    <h4>Quest</h4>
                </div>

                <div className="timer-board">
                    <h4>Timer</h4>
                    <h3>{timer}</h3>
                </div>
            </div>
            <div className="card__footer">
                <div className="user">
                    <img src="https://i.pravatar.cc/40?img=1" alt="user__image" className="user__image" />
                    <div className="user__info">
                        <h5>{player}</h5>
                        <small>Last Score</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ScoreBoard;