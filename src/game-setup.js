import {errorCodes, isHit} from "./helpers";

export const randomiseShipLocations = (ships) => {
    let newShips = [];
    ships.forEach(ship => {
        ship.coordinates = attemptShipPlacement(ship, newShips);
        newShips.push(ship);
    });
    return newShips;
}

export const mapCoordinates = (orientation, ship, ships, x, y) => {
    let coordinates = [];
    if (orientation === 'horizontal') {
        for (let i = 0; i < ship.size; i++) {
            validateCoordinate(ships, x + i, y);
            coordinates.push({x: (x + i), y});
        }
    } else {
        for (let i = 0; i < ship.size; i++) {
            validateCoordinate(ships, x, y + i);
            coordinates.push({x, y: (y + i)});
        }
    }
    return coordinates;
}

const attemptShipPlacement = (ship, ships) => {
    let x = Math.floor((Math.random() * 10) + 1) - 1;
    let y = Math.floor((Math.random() * 10) + 1) - 1;
    let orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    try {
        return mapCoordinates(orientation, ship, ships, x, y);
    } catch (e) {
        return attemptShipPlacement(ship, ships);
    }
}

export const validateCoordinate = (ships, x, y) => {
    if (y > 9 || x > 9) {
        throw Error(errorCodes.OUT_OF_BOUNDS);
    }
    if (isHit(ships, x, y)) {
        throw Error(errorCodes.OVERLAP);
    }
}
