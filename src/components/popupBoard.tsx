import React, { FC, Fragment } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";

interface PopupBoardProps {
    gameStatus: number,
    score: number,
    handleStartGame: SubmitHandler<FormData>
}

type FormData = {
    fullName: string;
};

const PopupBoard: FC<PopupBoardProps> = ({ gameStatus, score, handleStartGame }) => {

    const { register, handleSubmit } = useForm<FormData>();
    const onSubmit = handleSubmit(handleStartGame);

    return (
        <div id="popup" className="overlay">
            <div id="popupBody">
                {
                    gameStatus === 0 ?
                        <Fragment>
                            <h2>Bienvendio a Candy Crush</h2>
                            <p>Dinos quien eres para empezar a jugar</p>
                            <br />
                            <div className="signup-form">
                                <form className="" action="index.html" method="post" onSubmit={onSubmit}>
                                    <input required type="text" placeholder="Ingresa tu Nombre" className="txtb" {...register("fullName")} />
                                    <input type="submit" value="Iniciar Partida" className="signup-btn" />
                                </form>
                            </div>
                        </Fragment> :
                        <Fragment>
                            <h2>Buen trabajo, Puntuación: {score}</h2>
                            <input type="submit" value="Iniciar Partida" className="signup-btn" />
                        </Fragment>
                }

            </div>
        </div>
    );
}

export default PopupBoard;