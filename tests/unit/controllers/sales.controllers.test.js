const chai = require("chai");
const sinonChai = require("sinon-chai");
const sinon = require("sinon");
const salesService = require("../../../src/services/sales.services");
const salesControllers = require("../../../src/controllers/sales.controllers");
const {
  salesAll,
  salesId
} = require("../mocks/sales.mock.json");


chai.use(sinonChai);
const {
  expect
} = chai;

describe("Sales Controllers", function () {
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
      sinon.stub(salesService, "getAllSales").resolves(salesAll);

      await salesControllers.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesAll);
    });
  });

  describe("testando a rota por ID", function () {
    const req = {
      params: {
        id: 2,
      },
    };
    const res = {};
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("getOneById 200", async function () {
      sinon.stub(salesService, "getSalesById").resolves(salesId);

      await salesControllers.getSalesById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesId);
    });

    it("recuperando Id invalido", async function () {
      const error = new Error(
        JSON.stringify({
          status: 404,
          message: "Product not found",
        })
      );

      sinon.stub(salesService, "getSalesById").resolves([]);

      await salesControllers.getSalesById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Sale not found",
      });
    });
  });

  // describe("Testando rota create", function () {
  //   const req = { body: { name: "Martelo do guto" } };
  //   const res = {};
  //   const next = {};
  //   beforeEach(() => {
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //   });

  //   afterEach(() => {
  //     sinon.restore();
  //   });

  //   it("Testando rota create", async function () {
  //     sinon.stub(productsService, "createProduct").resolves(4);

  //     await productsControllers.createProduct(req, res);

  //     expect(res.status).to.have.been.calledWith(201);
  //     expect(res.json).to.have.been.calledWith({
  //       name: "Martelo do guto",
  //       id: 4,
  //     });
  //   });
  describe("Testando rota create", function () {
    const saleBody = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
      const req = { body: saleBody };
      const res = {};
      const next = {};
      beforeEach(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });
    
    it("Testando rota create", async function () {
      sinon
        .stub(salesService, "createSale")
        .resolves({ id: 4, itemsSold: saleBody });

      await salesControllers.createSale(req, res, next);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: 4, itemsSold: saleBody });
    });
  })

  describe("Testando rota edit", function () {
    const req = {
      body: [
        {
          productId: 1,
          quantity: 10,
        },
      ],
      params: {
        id: 1,
      },
    };
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
      sinon.stub(salesService, "editSale").resolves({
        saleId: 1,
        itemsUpdated: [
          {
            productId: 1,
            quantity: 10,
          },
        ],
      });

      const result = await salesControllers.editSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        saleId: 1,
        itemsUpdated: [
          {
            productId: 1,
            quantity: 10,
          },
        ],
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
    const req = {
      params: {
        id: 2,
      },
    };
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

      sinon.stub(salesService, "deleteSale").resolves("Sale Deleted");

      await salesControllers.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });

    it("rota delete deu errado", async function () {
      sinon.stub(salesService, "deleteSale").throws(new Error());
      try {
        const result = await salesControllers.deleteSale(req, res);
      } catch (error) {
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith();
      }
    });
  });
})
