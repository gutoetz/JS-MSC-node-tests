const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const salesModel = require("../../../src/models/sales.models");
const { connection } = require("../../../src/models/connection");
const { salesAll, salesId } = require("../mocks/sales.mock.json");

const { expect } = chai;

describe("Sales Model", function () {
  describe("testando a rota de pegar todos", function () {
    afterEach(() => {
      sinon.restore();
    });
    it("getAll Models", async function () {
      sinon.stub(connection, "execute").resolves([salesAll]);

      const result = await salesModel.getAllSales();

      expect(result).to.be.deep.equal(salesAll);
    });
  });

  describe("testando a rota por ID", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("getById", async function () {
      sinon.stub(connection, "execute").resolves([salesId]);

      const result = await salesModel.getSalesById(2);

      expect(result).to.be.deep.equal(salesAll[2]);
    });
  });

  describe("Testando rota create", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Testando rota create", async function () {
      const productId = 2;
      const salesId = 3;
      const quantity = 1;

      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const newSale = { salesId, productId, quantity };

      const result = await salesModel.createSale(newSale);

      expect(result).to.be.deep.equal({ productId, quantity });
    });

    it("testando rota createId", async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: 4 }]);

      const result = await salesModel.createSaleId();

      expect(result).to.be.deep.equal(4);
    });
  });

  // describe("Testando rota edit", function () {
  //   afterEach(() => {
  //     sinon.restore();
  //   });

  //   it("Testando rota edit", async function () {
  //     const name = "new Name";
  //     const id = 2;

  //     sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

  //     const result = await productsModel.editProduct(name, id);

  //     expect(result).to.be.deep.equal({ name, id });
  //   });
  //   it("rota edit deu errado", async function () {
  //     const name = "new Name";
  //     const id = 4;

  //     sinon.stub(connection, "execute").resolves([{ affectedRows: 0 }]);
  //     try {
  //       const result = await productsModel.editProduct(name, id);
  //     } catch (error) {
  //       expect(error.message).to.be.deep.equal(
  //         '{"status":404,"message":"Product not found"}'
  //       );
  //     }
  //   });
  // });

  //   describe("Testando rota delete", function () {
  //     afterEach(() => {
  //       sinon.restore();
  //     });

  //     it("Testando rota delete", async function () {
  //       const id = 2;

  //       sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

  //       const result = await productsModel.deleteProduct(id);

  //       expect(result).to.be.deep.equal("Product Deleted");
  //     });
  //     it("rota delete deu errado", async function () {
  //       const id = 4;

  //       sinon.stub(connection, "execute").resolves([{ affectedRows: 0 }]);
  //       try {
  //         const result = await productsModel.deleteProduct(id);
  //       } catch (error) {
  //         expect(error).to.be.an('error');
  //       }
  //     });
  //   });
});
