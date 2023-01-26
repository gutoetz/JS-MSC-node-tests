const chai = require("chai");
const sinonChai = require("sinon-chai");
const sinon = require("sinon");
const productsService = require("../../../src/services/product.services");
const productsControllers = require("../../../src/controllers/product.controllers");
const products = require("../mocks/products.mock.json");
const productsId = require("../mocks/productsId.json");

chai.use(sinonChai);
const { expect } = chai;

describe("Product Controllers", function () {
  describe("testando a rota de pegar todos na controllers", function () {
    const req = {};
    const res = {};
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("getAll Controllers com status 200", async function () {
      sinon.stub(productsService, "getAllProducts").resolves(products);

      await productsControllers.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

  describe("testando a rota por ID", function () {
    const req = { params: { id: 2 } };
    const res = {};
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("getOneById 200", async function () {
      sinon.stub(productsService, "getProductsById").resolves([productsId]);

      await productsControllers.getProductsById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsId);
    });

    it("recuperando Id invalido", async function () {
      const error = new Error(
        JSON.stringify({
          status: 404,
          message: "Product not found",
        })
      );

      sinon.stub(productsService, "getProductsById").resolves([]);

      await productsControllers.getProductsById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
  });

  describe("Testando rota create", function () {
    const req = { body: { name: "Martelo do guto" } };
    const res = {};
    const next = {};
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Testando rota create", async function () {
      sinon.stub(productsService, "createProduct").resolves(4);

      await productsControllers.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        name: "Martelo do guto",
        id: 4,
      });
    });

    // it("Testando rota create", async function () {
    //   const error = new Error(
    //     JSON.stringify({
    //       status: 404,
    //       message: "Product not found",
    //     })
    //   );
    //   sinon.stub(productsService, "createProduct").throws(error);

    //   await productsControllers.createProduct(req, res, next);

    //   expect(res.status).to.have.been.calledWith(201);
    //   expect(res.json).to.have.been.calledWith({
    //     name: "Martelo do guto",
    //     id: 4,
    //   });
    // });
  });

  describe("Testando rota edit", function () {
    const req = { body: { name: "Martelo do guto" }, params: { id: 2 } };
    const res = {};
    const next = {};
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Testando rota edit", async function () {
      sinon
        .stub(productsService, "editProduct")
        .resolves({ name: "Martelo do guto", id: 2 });

      const result = await productsControllers.editProduct(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        name: "Martelo do guto",
        id: 2,
      });
    });
    // it("rota edit deu errado", async function () {
    //   const name = "new Name";
    //   const id = 4;

    //   sinon.stub(connection, "execute").resolves([{ affectedRows: 0 }]);
    //   try {
    //     const result = await productsModel.editProduct(name, id);
    //   } catch (error) {
    //     expect(error.message).to.be.deep.equal(
    //       '{"status":404,"message":"Product not found"}'
    //     );
    //   }
    // });
  });

  describe("Testando rota delete", function () {
    const req = { params: { id: 2 } };
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Testando rota delete", async function () {
      const id = 2;

      sinon.stub(productsService, "deleteProduct").resolves("Product Deleted");

      await productsControllers.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });


    //   it("rota delete deu errado", async function () {
    //     const id = 4;

    //     sinon.stub(connection, "execute").resolves([{ affectedRows: 0 }]);
    //     try {
    //       const result = await productsModel.deleteProduct(id);
    //     } catch (error) {
    //       expect(error).to.be.an("error");
    //     }
    //   });
  });
})