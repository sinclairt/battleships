import PropTypes from "prop-types";

export const coordinate = {
    x: PropTypes.number,
    y: PropTypes.number
};
export const ship = {
    name: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.shape(coordinate)),
    size: PropTypes.number
};
