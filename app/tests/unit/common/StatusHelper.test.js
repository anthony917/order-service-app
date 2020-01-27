const StatusHelper = require("../../../common/StatusHelper");

describe("[Unit] StatusHelper.availableStatus", () => {
    it("should return all available status", () => {
        const result = StatusHelper.availableStatus();
        expect(result.UNASSIGNED).toBe("UNASSIGNED");
        expect(result.TAKEN).toBe("TAKEN");
    });
})

describe("[Unit] StatusHelper.isAvailable", () => {
    it("should be truthy when status is available", () => {
        let cases = ["UNASSIGNED", "TAKEN"];
        cases.forEach((item) => {
            expect(StatusHelper.isAvailable(item)).toBeTruthy()
        });
    });
    it("should be falsy when status is not available", () => {
        let status = "OTHER";
        expect(StatusHelper.isAvailable(status)).toBeFalsy()
    });
})