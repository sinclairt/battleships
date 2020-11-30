import React from 'react';
import PropTypes from 'prop-types';
import Cell from "./Cell";
import {isHit} from "./helpers";
import {coordinate, ship} from "./types";

class Grid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleClick(x, y) {
        if (this.props.onClick && !this.props.disabled) {
            this.props.onClick(x, y);
        }
    }

    render() {
        let rows = [];
        for (let y = 0; y < 10; y++) {
            let cells = [];
            for (let x = 0; x < 10; x++) {
                let hit = !!this.props.hits.find(coordinate => coordinate.x === x && coordinate.y === y);
                let miss = !!this.props.misses.find(coordinate => coordinate.x === x && coordinate.y === y);
                let ship = isHit(this.props.ships, x, y);
                cells.push(<Cell hit={hit} miss={miss} ship={this.props.hideShips ? false : ship} key={x} onClick={() => this.handleClick(x, y)} disabled={this.props.disabled}/>);
            }
            rows.push(<div key={y} style={{height: '30px'}}>{cells}</div>);
        }
        return (
            <div className={'d-inline-block mx-auto'}>
                {rows}
            </div>
        );
    }
}

Grid.propTypes = {
    ships: PropTypes.arrayOf(PropTypes.shape(ship)).isRequired,
    hits: PropTypes.arrayOf(PropTypes.shape(coordinate)).isRequired,
    misses: PropTypes.arrayOf(PropTypes.shape(coordinate)).isRequired,
    hideShips: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool.isRequired
};

Grid.defaultProps = {
    hideShips: false
};

export default Grid;
