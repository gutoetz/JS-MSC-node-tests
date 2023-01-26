const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const salesModel = require("../../../src/models/sales.models");
const salesService = require("../../../src/services/sales.services");
const {salesAll, salesId} = require("../mocks/sales.mock.json");

const { expect } = chai;

describe("Product Service", function () {
  describe("testando a rota de pegar todos", function () {
    afterEach(() => {
      sinon.restore();
    });
    it("getAll Sales", async function () {
      sinon.stub(salesModel, "getAllSales").resolves(salesAll);

      const result = await salesService.getAllSales();

      expect(result).to.be.deep.equal(salesAll);
    });
  });

  describe("testando a rota por ID", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("getById", async function () {
      sinon.stub(salesModel, "getSalesById").resolves(salesId);

      const result = await salesService.getSalesById(2);

      expect(result).to.be.deep.equal(salesId);
    });
  });

  describe("Testando rota create", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Testando rota create", async function () {
      const productId = 2
      const quantity = 2;

      sinon.stub(salesModel, "createSaleId").resolves(4);
      sinon.stub(salesModel, "createSale").resolves({productId, quantity});

      const newProduct = [{productId, quantity}];

      const result = await salesService.createSale(newProduct);

      expect(result).to.be.deep.equal({
        id: 4,
        itemsSold: [{ productId, quantity }],
      });
    });

    it("Testando rota create com erro de nString", async function () {
      const productId = 2;
      const quantity = 2;

      const newProduct = { productId, quantity };
      try {
        const result = await salesService.createSale(newProduct);
      } catch (error) {
        expect(error.message).to.be.deep.equal(
          '{"status":"422","message":"\\"value\\" must be an array"}'
        );
      }
    });

    // it("Testando rota create com erro", async function () {
    //   sinon.stub(productsModel, "createProduct").resolves(4);

    //   const newProduct = "Martelo do guto";

    //   const result = await productsService.createProduct(newProduct);

    //   expect(result).to.be.deep.equal(4);
    // });
  });

  // describe("Testando rota edit", function () {
  //   afterEach(() => {
  //     sinon.restore();
  //   });

  //   it("Testando rota edit", async function () {
  //     const name = "new Name";
  //     const id = 2;

  //     sinon.stub(productsModel, "editProduct").resolves({ name, id });

  //     const result = await productsService.editProduct(name, id);

  //     expect(result).to.be.deep.equal({ name, id });
  //   });

  //   it("Testando rota edit com erro de nString", async function () {
  //     const newProduct = "as";

  //     try {
  //       const result = await productsService.editProduct(newProduct);
  //     } catch (error) {
  //       expect(error.message).to.be.deep.equal(
  //         '{"status":"422","message":"\\"name\\" length must be at least 5 characters long"}'
  //       );
  //     }
  //   });
  //   it("rota edit deu errado", async function () {
  //     const name = "new Name";
  //     const id = 5;
  //     const error = new Error(
  //       JSON.stringify({
  //         status: 404,
  //         message: "Product not found",
  //       })
  //     );
  //     sinon.stub(productsModel, "editProduct").throws(error);
  //     try {
  //       const result = await productsService.editProduct(name, id);
  //     } catch (error) {
  //       expect(error.message).to.be.deep.equal(
  //         '{"status":404,"message":"Product not found"}'
  //       );
  //     }
  //   });
  // });

  // describe("Testando rota delete", function () {
  //   afterEach(() => {
  //     sinon.restore();
  //   });

  //   it("Testando rota delete", async function () {
  //     const id = 2;
  //     sinon.stub(productsModel, "deleteProduct").resolves("Product Deleted");

  //     const result = await productsService.deleteProduct(id);

  //     expect(result).to.be.deep.equal("Product Deleted");
  //   });
  //   it("rota delete deu errado", async function () {
  //     const id = 4;
  //     const error = new Error(
  //       JSON.stringify({
  //         status: 404,
  //         message: "Product not found",
  //       })
  //     );
  //     sinon.stub(productsModel, "deleteProduct").throws(error);
  //     try {
  //       const result = await productsService.deleteProduct(id);
  //     } catch (error) {
  //       expect(error.message).to.be.deep.equal(
  //         '{"status":404,"message":"Product not found"}'
  //       );
  //     }
  //   });
  // });
});
