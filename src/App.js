import './App.scss';
import React from "react";
import Grid from "./Grid";
import {freshFlotilla, isHit, players, randomCoordinate} from "./helpers";
import Message from "./Message";
import ScoreCard from "./ScoreCard";
import {mapCoordinates, randomiseShipLocations} from "./game-setup";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            turn: players.user,
            user: {
                hits: [],
                misses: [],
                ships: freshFlotilla()
            },
            computer: {
                hits: [],
                misses: [],
                ships: freshFlotilla()
            },
            winner: '',
            playing: false,
            selectedShip: '',
            orientation: 'vertical'
        }
        this.onStart = this.onStart.bind(this);
        this.onSurrender = this.onSurrender.bind(this);
        this.handleSetShip = this.handleSetShip.bind(this);
        this.selectShip = this.selectShip.bind(this);
        this.selectOrientation = this.selectOrientation.bind(this);
        this.handleUserAttempt = this.handleUserAttempt.bind(this);
        this.onRestart = this.onRestart.bind(this);
    }

    componentDidMount() {
        this.setState({
            computer: {...this.state.computer, ships: randomiseShipLocations(freshFlotilla())}
        });
    }

    onStart() {
        this.setState({
            playing: true,
            selectedShip: {name: '', coordinates: [], size: 0},
            turn: players.user
        });
    }

    onRestart() {
        this.setState({
            turn: players.user,
            user: {
                hits: [],
                misses: [],
                ships: freshFlotilla()
            },
            computer: {
                hits: [],
                misses: [],
                ships: randomiseShipLocations(freshFlotilla())
            },
            winner: '',
            playing: false,
            selectedShip: '',
            orientation: 'vertical'
        })
    }

    onSurrender() {
        this.setState({winner: players.computer});
    }

    selectShip(ship) {
        this.setState({selectedShip: ship});
    }

    selectOrientation(orientation) {
        this.setState({orientation});
    }

    handleUserAttempt(x, y) {
        if (this.state.playing) {
            this.usersTurn(x, y);
        }
    }

    handleSetShip(x, y) {
        if (!this.state.selectedShip) {
            return;
        }
        try {
            this.setUsersShip(x, y);
        } catch (e) {
            alert(`Whoops! ${e.message}. Please place you ship somewhere else.`);
        }
    }

    setUsersShip(x, y) {
        let user = {...this.state.user};
        let ship = this.state.selectedShip;
        let ships = user.ships.filter(s => s.name !== ship.name);
        let index = user.ships.findIndex(s => s.name === ship.name);
        user.ships[index].coordinates = mapCoordinates(this.state.orientation, this.state.selectedShip, ships, x, y);
        this.setState({user});
    }

    usersTurn(x, y) {
        let user = {...this.state.user};
        let ships = this.state.computer.ships;
        let turn = players.computer;
        let winner;
        if (isHit(ships, x, y)) {
            user.hits.push({x, y});
            winner = user.hits.length === 17 ? this.state.turn : '';
            this.setState({user, winner, turn});
        } else {
            user.misses.push({x, y});
            this.setState({user, turn});
        }
        if (!winner) {
            this.calculateComputersGuess();
        }
    }

    calculateComputersGuess() {
        let x = randomCoordinate();
        let y = randomCoordinate();
        if (!!this.state.computer.hits.find(coordinate => coordinate.x === x && coordinate.y === y) ||
            !!this.state.computer.misses.find(coordinate => coordinate.x === x && coordinate.y === y)) {
            return this.calculateComputersGuess();
        }
        this.computersTurn(x, y);
    }

    computersTurn(x, y) {
        let computer = {...this.state.computer};
        let ships = this.state.user.ships;
        let turn = players.user;
        let winner;
        if (isHit(ships, x, y)) {
            computer.hits.push({x, y});
            winner = computer.hits.length === 17 ? this.state.turn : '';
            let playing = !winner;
            this.setState({computer, winner, turn, playing});
        } else {
            computer.misses.push({x, y});
            this.setState({computer, turn});
        }
    }


    render() {
        return (
            <div className={'container'}>
                <div className="row justify-content-center">
                    <div className="col">
                        <Message turn={this.state.turn} winner={this.state.winner} playing={this.state.playing}/>
                    </div>
                </div>
                <div className={'row justify-content-center'}>
                    <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
                        {this.state.playing &&
                        <>
                            <Grid ships={this.state.computer.ships}
                                  hits={this.state.user.hits}
                                  misses={this.state.user.misses}
                                  onClick={this.handleUserAttempt}
                                  hideShips
                                  disabled={this.state.turn === this.computer || this.state.winner !== ''}/>
                            <hr/>
                        </>
                        }
                        <Grid ships={this.state.user.ships}
                              hits={this.state.computer.hits}
                              misses={this.state.computer.misses}
                              onClick={this.handleSetShip}
                              disabled={this.state.playing}/>
                    </div>
                    <div className="col-12 col-md-6">
                        {this.state.playing &&
                        <div className={'p-2 mb-2'}>
                            <h3>Computer</h3>
                            <ScoreCard hits={this.state.computer.hits}
                                       enemyHits={this.state.user.hits}
                                       ships={this.state.computer.ships}
                                       title={'Computer\'s flotilla'}
                                       playing={this.state.playing}/>
                        </div>
                        }
                        <div className={'p-2 mb-2'}>
                            <h3>You</h3>
                            <ScoreCard hits={this.state.user.hits}
                                       enemyHits={this.state.computer.hits}
                                       playing={this.state.playing}
                                       ships={this.state.user.ships}
                                       orientation={this.state.orientation}
                                       selectedShip={this.state.selectedShip}
                                       onOrientationChange={this.selectOrientation}
                                       onShipSelect={this.selectShip}/>
                        </div>
                    </div>
                </div>
                <div className={'row justify-content-center'}>
                    <div className="col-auto">
                        {!this.state.playing &&
                        <button onClick={this.onStart} className={'btn btn-primary'}
                                disabled={this.state.user.ships.filter(ship => ship.coordinates.length === 0).length > 0}>Start</button>
                        }
                        {this.state.playing && !this.state.winner &&
                        <button onClick={this.onSurrender} className={'btn btn-outline-danger'}>Surrender</button>
                        }
                        {this.state.playing && this.state.winner &&
                        <button onClick={this.onRestart} className={'btn btn-outline-primary'}>Restart</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
