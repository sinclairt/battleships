import React from 'react';
import PropTypes from 'prop-types';
import {coordinate, ship} from "./types";
import Ship from "./Ship";

class ScoreCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.handleOrientationChange = this.handleOrientationChange.bind(this);
        this.handleShipSelect = this.handleShipSelect.bind(this);
    }

    handleShipSelect(ship) {
        if (this.props.onShipSelect) {
            this.props.onShipSelect(ship);
        }
    }

    handleOrientationChange(orientation) {
        if (this.props.onOrientationChange) {
            this.props.onOrientationChange(orientation);
        }
    }

    render() {
        const ships = Object.keys(this.props.ships).map((key, i) => {
            let ship = this.props.ships[key];
            return <div className={'col-6 mb-2'} key={ship.name}>
                <Ship ship={ship}
                      hits={this.props.hideHits ? [] : this.props.enemyHits}
                      orientation={this.props.orientation}
                      playing={this.props.playing}
                      selected={!!(this.props.selectedShip && this.props.selectedShip.name === ship.name)}
                      onOrientationChange={this.handleOrientationChange}
                      onSelect={this.handleShipSelect}/>
            </div>;
        })
        return (
            <div>
                {this.props.playing &&
                <h3>Hits: {this.props.hits.length}</h3>
                }
                <div className={'row flex-wrap'}>
                    <div className="col-12">
                        <p className={'mb-0'}>{this.props.title}</p>
                    </div>
                    {ships}
                </div>
            </div>
        );
    }
}

ScoreCard.propTypes = {
    hits: PropTypes.arrayOf(PropTypes.shape(coordinate)),
    enemyHits: PropTypes.arrayOf(PropTypes.shape(coordinate)),
    ships: PropTypes.arrayOf(PropTypes.shape(ship)),
    orientation: PropTypes.oneOf(['vertical', 'horizontal']),
    playing: PropTypes.bool,
    onShipSelect: PropTypes.func,
    onOrientationChange: PropTypes.func,
    selectedShip: PropTypes.oneOfType([PropTypes.string, PropTypes.shape(ship)]),
    title: PropTypes.string,
    hideHits: PropTypes.bool
};

ScoreCard.defaultProps = {
    playing: false,
    selectedShip: null,
    title: 'Your flotilla',
    hideHits: true
};

export default ScoreCard;
