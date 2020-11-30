import React from 'react';
import {players} from "./helpers";
import * as PropTypes from "prop-types";

class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        let message = '';
        if (this.props.winner === players.user) {
            message = 'You win!';
        } else if (this.props.winner === players.computer) {
            message = 'Computer wins!';
        } else if (!this.props.playing) {
            message = 'Place your ships';
        } else if (this.props.turn === players.user) {
            message = 'Your turn';
        } else if (this.props.turn === players.computer) {
            message = 'Computers turn';
        }

        return (
            <h3 className={'text-center my-3'}>{message}</h3>
        );
    }
}

Message.propTypes = {
    winner: PropTypes.string,
    turn: PropTypes.string
};

Message.defaultProps = {};

export default Message;
