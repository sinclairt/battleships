import React from 'react';
import PropTypes from 'prop-types';
import {coordinate, ship} from "./types";
import Cell from "./Cell";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowsAltV} from "@fortawesome/free-solid-svg-icons/faArrowsAltV";
import {faArrowsAltH} from "@fortawesome/free-solid-svg-icons/faArrowsAltH";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";


class Ship extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.handleSelect = this.handleSelect.bind(this);
        this.handleOrientationChange = this.handleOrientationChange.bind(this);
    }

    handleSelect() {
        if (this.props.onSelect) {
            this.props.onSelect(this.props.ship);
        }
    }

    handleOrientationChange() {
        if (this.props.onOrientationChange) {
            this.props.onOrientationChange(this.props.orientation === 'vertical' ? 'horizontal' : 'vertical');
        }
    }

    render() {
        const cells = [];
        const {ship, hits} = this.props;
        for (let i = 0; i < ship.size; i++) {
            let coordinate = ship.coordinates[i];
            let isHit = coordinate && !!hits.find(c => c.x === coordinate.x && c.y === coordinate.y);
            cells.push(<Cell hit={isHit} ship={true} disabled={true} key={i}/>);
        }
        return (
            <div className={'row flex-wrap'} onClick={this.handleSelect}>
                <div className="col-12">
                    <div
                        className={"d-flex align-items-end p-2 " + (this.props.selected ? 'border border-info shadow rounded' : '')}>
                        <div className={'w-75'}>
                            <p className={'d-block mb-0'}>{this.props.ship.name}</p>
                            <div style={{height: '30px'}}>
                                {cells}
                            </div>
                        </div>
                        <div>
                            {this.props.selected &&
                            <button className={'btn btn-primary btn-sm'} onClick={this.handleOrientationChange}>
                                {this.props.orientation === 'vertical' ? <FontAwesomeIcon icon={faArrowsAltV}/> : <FontAwesomeIcon icon={faArrowsAltH}/>}
                            </button>
                            }
                            {!this.props.selected && this.props.ship.coordinates.length > 0 && !this.props.playing &&
                            <FontAwesomeIcon icon={faCheckCircle} className={'text-success'}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Ship.propTypes = {
    ship: PropTypes.shape(ship).isRequired,
    hits: PropTypes.arrayOf(PropTypes.shape(coordinate)).isRequired,
    onSelect: PropTypes.func,
    onOrientationChange: PropTypes.func,
    selected: PropTypes.bool,
    orientation: PropTypes.oneOf(['vertical', 'horizontal']),
    playing: PropTypes.bool
};

Ship.defaultProps = {
    selected: false,
    orientation: 'vertical',
};

export default Ship;
