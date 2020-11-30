import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons/faCircle";

class Cell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (!this.props.disabled) {
            this.props.onClick();
        }
    }

    render() {
        let style = {height: '30px', width: '30px'};
        if (this.props.ship) {
            style.backgroundColor = this.props.disabled ? 'rgba(90, 90, 90, 0.5)' : 'rgba(90, 90, 90, 1)';
        } else {
            style.backgroundColor = this.props.disabled ? 'rgba(219, 219, 219, 0.5)' : 'rgba(219, 219, 219, 1)';
        }
        if (this.props.hit) {
            style.color = this.props.disabled ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 0, 0, 1)';
        }
        if (this.props.miss) {
            style.color = this.props.disabled ? 'rgba(255, 255, 0, 0.5)' : "rgba(255, 255, 0, 1)";
        }
        return (
            <div style={style} onClick={this.handleClick} className={'d-inline-block border text-center'}>
                {(this.props.hit || this.props.miss) &&
                <FontAwesomeIcon icon={faCircle}/>
                }
                {!this.props.hit && !this.props.miss &&
                <>&nbsp;</>
                }
            </div>
        );
    }
}

Cell.propTypes = {
    hit: PropTypes.bool,
    miss: PropTypes.bool,
    ship: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};

Cell.defaultProps = {
    hit: false,
    miss: false,
    ship: false,
    disabled: false
};

export default Cell;
