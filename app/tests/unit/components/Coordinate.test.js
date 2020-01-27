const Coordinate = require("../../../components/Coordinate");

describe("[Unit] Coordinate.isEmpty", () => {
    it("should be truthy when latitude is empty", () => {
        let coordinate = new Coordinate("", "1")
        const result = coordinate.isEmpty();
        expect(result).toBeTruthy();
    });
    it("should be truthy when longitude is empty", () => {
        let coordinate = new Coordinate("1", "")
        const result = coordinate.isEmpty();
        expect(result).toBeTruthy();
    });
    it("should be truthy when latitude and longitude are both empty", () => {
        let coordinate = new Coordinate("", "")
        const result = coordinate.isEmpty();
        expect(result).toBeTruthy();
    });
    it("should be falsy when latitude and longitude are both exist", () => {
        let coordinate = new Coordinate("1", "1")
        const result = coordinate.isEmpty();
        expect(result).toBeFalsy();
    });
})

describe("[Unit] Coordinate.isValid", () => {
    it("should be falsy when latitude is not a string", () => {
        let coordinate = new Coordinate(1, "1")
        const result = coordinate.isValid();
        expect(result).toBeFalsy();
    });
    it("should be falsy when longitude is not a string", () => {
        let coordinate = new Coordinate("1", 1)
        const result = coordinate.isValid();
        expect(result).toBeFalsy();
    });
    it("should be falsy when latitude is not between -90 and 90", () => {
        let coordinate = new Coordinate("-91", "1")
        const result = coordinate.isValid();
        expect(result).toBeFalsy();
    });
    it("should be falsy when longitude s not between -180 and 180", () => {
        let coordinate = new Coordinate("1", "181")
        const result = coordinate.isValid();
        expect(result).toBeFalsy();
    });
    it("should be truthy when coordinate is correct", () => {
        let coordinate = new Coordinate("1", "1")
        const result = coordinate.isValid();
        expect(result).toBeTruthy();
    });
})