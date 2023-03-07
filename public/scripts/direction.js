class Direction {
    static oppositeDirection(current) {
        switch (current) {
            case "N":
                return "S";
            case "S":
                return "N";
            case "W":
                return "E";
            case "E":
                return "W";
            default:
                return undefined;
        }
    }

    static getDirection (input) {
        if (["N", "S", "W", "E"].includes(input.toUpperCase())) {
            return input.toUpperCase();
        }
        switch (input.toLowerCase()) {
            case "north":
                return "N";
            case "south":
                return "S";
            case "west":
                return "W";
            case "east":
                return "E";
            default:
                return undefined;
        }
    }
}

export { Direction }