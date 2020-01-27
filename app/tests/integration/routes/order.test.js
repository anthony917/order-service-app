const rootPath = require("../../../rootPath");
require("dotenv").config({ path: `${rootPath}/.env.test` });
const request = require("supertest");
const winston = require("winston");
const Order = require("../../../models/Order")

let server;

describe("[Integration] /orders", () => {
    beforeAll(async () => {
        const console = new winston.transports.Console();
        winston.add(console);
    })
    beforeEach(() => {
        server = require("../../../index");
    });
    afterEach(async () => {
        await server.close();
        await Order.destroy({
            where: {},
            truncate: true
        })
    });

    describe("[Create Order] POST /", () => {
        let origin;
        let destination;
        const exec = async () => {
            return await request(server)
                .post("/orders")
                .send({
                    origin: origin,
                    destination: destination
                });
        }
        it("should return 400 if origin is invalid", async () => {
            origin = ["", ""];
            destination = ["6.535578", "3.368550"];
            const res = await exec();
            expect(res.body).toHaveProperty("error");
            expect(res.status).toBe(400);
        });
        it("should return 400 if destination is invalid", async () => {
            origin = ["7.535578", "3.368550"];
            destination = ["", ""];
            const res = await exec();
            expect(res.body).toHaveProperty("error");
            expect(res.status).toBe(400);
        });
        it("should return 400 if origin is not array of 2 string", async () => {
            origin = ["7.535578", "3.368550", "3.368550"];
            destination = ["6.535578", "3.368550"];
            const res = await exec();
            expect(res.body).toHaveProperty("error");
            expect(res.status).toBe(400);
        });
        it("should return 400 if destination is not array of 2 string", async () => {
            origin = ["7.535578", "3.368550"];
            destination = ["6.535578", "3.368550", "3.368550"];
            const res = await exec();
            expect(res.body).toHaveProperty("error");
            expect(res.status).toBe(400);
        });
        it("should return 400 if the distance can not be calculated by Google Map API", async () => {
            origin = ["1", "1"];
            destination = ["1", "2"];
            const res = await exec();
            expect(res.body).toHaveProperty("error");
            expect(res.status).toBe(400);
        });
        it("should return 200 with order when request is valid", async () => {
            origin = ["7.535578", "3.368550"];
            destination = ["6.535578", "3.368550"];
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("id");
            expect(res.body).toHaveProperty("distance");
            expect(res.body).toHaveProperty("status", "UNASSIGNED");
        });
    });


    describe("[Take Order] PATCH /:id", () => {
        let status;
        let id;
        const exec = async () => {
            return await request(server)
                .patch(`/orders/${id}`)
                .send({
                    status: status
                });
        }
        it("should return 400 if the order is TAKEN already", async () => {
            const order = await Order.create({
                start_latitude: "7.535578",
                start_longitude: "3.368550",
                end_latitude: "6.535578",
                end_longitude: "3.368550",
                distance: 139225,
                status: "TAKEN"
            });
            id = order.id;
            status = "TAKEN";
            const res = await exec();
            expect(res.body).toHaveProperty("error");
            expect(res.status).toBe(400);
        });
        it("should return 404 if the order id does not exist", async () => {
            id = 100;
            status = "TAKEN";
            const res = await exec();
            expect(res.body).toHaveProperty("error");
            expect(res.status).toBe(404);
        });
        it("should return 200 when request is valid", async () => {
            const order = await Order.create({
                start_latitude: "7.535578",
                start_longitude: "3.368550",
                end_latitude: "6.535578",
                end_longitude: "3.368550",
                distance: 139225,
                status: "UNASSIGNED"
            });
            id = order.id;
            status = "TAKEN";
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("status");
            expect(res.body.status).toBe("SUCCESS");
        });
    });


    describe("[Order List] GET /orders?page=:page&limit=:limit", () => {
        let page;
        let limit;
        const exec = async () => {
            return await request(server).get(`/orders?page=${page}&limit=${limit}`);
        }
        it("should return 400 if the page is not a valida integer", async () => {
            page = "a";
            limit = 10;
            const res = await exec();
            expect(res.body).toHaveProperty("error");
            expect(res.status).toBe(400);
        });
        it("should return 400 if the limit is not a valid integer", async () => {
            page = 1;
            limit = "a";
            const res = await exec();
            expect(res.body).toHaveProperty("error");
            expect(res.status).toBe(400);
        });
        it("should return 200 with orders when request is valid", async () => {
            await Order.create({
                start_latitude: "7.535578",
                start_longitude: "3.368550",
                end_latitude: "6.535578",
                end_longitude: "3.368550",
                distance: 139225,
                status: "UNASSIGNED"
            });
            await Order.create({
                start_latitude: "7.535578",
                start_longitude: "3.368550",
                end_latitude: "6.535578",
                end_longitude: "3.368550",
                distance: 139225,
                status: "TAKEN"
            });
            page = 1;
            limit = 10;
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.some(order => order.status === "UNASSIGNED")).toBeTruthy();
            expect(res.body.some(order => order.status === "TAKEN")).toBeTruthy();
        });
        it("should return 200 with empty array when request is valid and there is no result", async () => {
            page = 1;
            limit = 10;
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toEqual([]);
        });
    });


})