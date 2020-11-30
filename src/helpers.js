export function isHit(ships, x, y) {
    return !!ships.map(ship => ship.coordinates).flat().find(coordinate => coordinate.x === x && coordinate.y === y)
}

export function isShipHit(ship, x, y) {
    return ship.coordinates.find(coordinate => coordinate.x === x && coordinate.y === y);
}

export const randomCoordinate = () => Math.floor((Math.random() * 10) + 1) - 1;

export const players = {
    user: 'user',
    computer: 'computer'
}

export const errorCodes = {
    OUT_OF_BOUNDS: 'Ship would be out of bounds',
    OVERLAP: 'Ship would overlap with another ship'
}

export const freshFlotilla = () => {
    return [
        {name: 'Aircraft Carrier', coordinates: [], size: 5},
        {name: 'Battleship', coordinates: [], size: 4},
        {name: 'Submarine', coordinates: [], size: 3},
        {name: 'Destroyer', coordinates: [], size: 3},
        {name: 'Patrol Boat', coordinates: [], size: 2}
    ];
}
