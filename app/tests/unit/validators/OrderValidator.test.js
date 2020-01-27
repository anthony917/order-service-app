const OrderValidator = require("../../../validators/OrderValidator");
const Coordinate = require("../../../components/Coordinate");

describe("[Unit] OrderValidator.createRequestValidation", () => {
    it("should response error if origin is not an array", () => {
        const origin = 1;
        const destination = ["1", "1"];
        const result = OrderValidator.createRequestValidation(origin, destination);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response error if destination is not an array", () => {
        const origin = ["1", "1"];
        const destination = 1;
        const result = OrderValidator.createRequestValidation(origin, destination);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response error if origin size is not 2", () => {
        const origin = ["1", "1", "1"];
        const destination = ["1", "1"];
        const result = OrderValidator.createRequestValidation(origin, destination);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response error if destination size is not 2", () => {
        const origin = ["1", "1"];
        const destination = ["1", "1", "1"];
        const result = OrderValidator.createRequestValidation(origin, destination);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response null if both origin and destination are correct", () => {
        const origin = ["1", "1"];
        const destination = ["1", "1"];
        const result = OrderValidator.createRequestValidation(origin, destination);
        expect(result).toBeNull();
    });
})

describe("[Unit] OrderValidator.coordinateValidation", () => {
    it("should response error if start coordinate is empty", () => {
        const startCoordinate = new Coordinate("", "");
        const endCoordinate = new Coordinate("1", "1");
        const result = OrderValidator.coordinateValidation(startCoordinate, endCoordinate);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response error if end coordinate is empty", () => {
        const startCoordinate = new Coordinate("1", "1");
        const endCoordinate = new Coordinate("", "");
        const result = OrderValidator.coordinateValidation(startCoordinate, endCoordinate);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response error if start coordinate is invalid", () => {
        const startCoordinate = new Coordinate(1, 1);
        const endCoordinate = new Coordinate("1", "1");
        const result = OrderValidator.coordinateValidation(startCoordinate, endCoordinate);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response error if end coordinate is invalid", () => {
        const startCoordinate = new Coordinate("1", "1");
        const endCoordinate = new Coordinate(1, 1);
        const result = OrderValidator.coordinateValidation(startCoordinate, endCoordinate);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response null if both start and end coordinate are correct", () => {
        const startCoordinate = new Coordinate("1", "1");
        const endCoordinate = new Coordinate("1", "1");
        const result = OrderValidator.coordinateValidation(startCoordinate, endCoordinate);
        expect(result).toBeNull();
    });
})

describe("[Unit] OrderValidator.distanceValidation", () => {
    it("should response error if distance is null", () => {
        const result = OrderValidator.distanceValidation(null);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response null if distance exist", () => {
        const result = OrderValidator.distanceValidation(1);
        expect(result).toBeNull();
    });
})

describe("[Unit] OrderValidator.updateRequestValidation", () => {
    it("should response error if order id is not a integer", () => {
        const id = "a";
        const status = "TAKEN";
        const result = OrderValidator.updateRequestValidation(id, status);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response error if order status is undefined", () => {
        const id = 1;
        const result = OrderValidator.updateRequestValidation(id, status);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response error if order status is empty", () => {
        const id = 1;
        const status = "";
        const result = OrderValidator.updateRequestValidation(id, status);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response error if order status is not available", () => {
        const id = 1;
        const status = "OTHER";
        const result = OrderValidator.updateRequestValidation(id, status);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response null if both order id and status are correct", () => {
        const id = 1;
        const status = "TAKEN";
        const result = OrderValidator.updateRequestValidation(id, status);
        expect(result).toBeNull();
    });
})

describe("[Unit] OrderValidator.updateTransactionValidation", () => {
    it("should response error if order is empty", () => {
        let order;
        let status = "TAKEN";
        const result = OrderValidator.updateTransactionValidation(order, status);
        expect(result).toHaveProperty("code", 404);
    });
    it("should response error if the update status is same as order status", () => {
        let order = {
            id: 1,
            status: "TAKEN"
        };
        let status = "TAKEN";
        const result = OrderValidator.updateTransactionValidation(order, status);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response null if both order and status are correct", () => {
        let order = {
            id: 1,
            status: "UNASSIGNED"
        };
        let status = "TAKEN";
        const result = OrderValidator.updateTransactionValidation(order, status);
        expect(result).toBeNull();
    });
})

describe("[Unit] OrderValidator.listRequestValidation", () => {
    it("should response error if page is empty", () => {
        let page;
        let limit = 10;
        const result = OrderValidator.listRequestValidation(page, limit);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response error if limit is empty", () => {
        let page = 1;
        let limit;
        const result = OrderValidator.listRequestValidation(page, limit);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response error if page is not a integer", () => {
        let page = "a";
        let limit = 10;
        const result = OrderValidator.listRequestValidation(page, limit);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response error if limit is not a integer", () => {
        let page = 1;
        let limit = "a";
        const result = OrderValidator.listRequestValidation(page, limit);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response error if page is not positive", () => {
        let page = -1;
        let limit = 10;
        const result = OrderValidator.listRequestValidation(page, limit);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response error if limit is not positive", () => {
        let page = 1;
        let limit = -1;
        const result = OrderValidator.listRequestValidation(page, limit);
        expect(result).toHaveProperty("code", 400);
    });
    it("should response null if both page and limit are correct", () => {
        let page = 1;
        let limit = 10;
        const result = OrderValidator.listRequestValidation(page, limit);
        expect(result).toBeNull();
    });
})