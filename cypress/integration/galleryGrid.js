/// <reference types="cypress" />
let store;
context("gallery grid", () => {
  before(() => {
    cy.visit("http://localhost:3000");
    cy.window().then((win) => {
      store = win.__NEXT_REDUX_WRAPPER_STORE__;
    });
  });
  beforeEach(() => {
    cy.server();
    cy.route("/api/gallery*").as("getGalleryImages");
    cy.route("/api/galleryImageVotes*").as("getGalleryImageDetails");
  });

  it("Can do scroll loading?", () => {
    let store;
    let step1ItemsCount, step2ItemsCount;
    cy.window()
      .then((win) => {
        store = win.__NEXT_REDUX_WRAPPER_STORE__;
        const { Gallery } = store.getState();
        step1ItemsCount = Gallery.items.length;
      })
      .then(() => {
        cy.get(".gallery-grid-cotainer").scrollTo("bottom");
        cy.wait("@getGalleryImages").then((xhr) => {
          const { Gallery } = store.getState();
          step2ItemsCount = Gallery.items.length;
        });
      })
      .then(() => {
        expect(step2ItemsCount).to.be.greaterThan(step1ItemsCount);
      });
  });

  it("Can show images details?", () => {
    cy.get(".image-card").first().click();
    cy.wait("@getGalleryImageDetails").then((xhr) => {
      cy.get(".ant-modal-content", { timeout: 10000 })
        .should("be.visible")
        .then(($modal) => {
          expect($modal.find(".image-details__info__statics")).to.have.length(
            1
          );
          const imgElLength = $modal.find(".image-details__media-cover__img")
            .length;

          if (imgElLength) {
            expect(imgElLength).to.eq(1);
          } else {
            expect(
              $modal.find(".image-details__media-cover__video")
            ).to.have.length(1);
          }
          cy.wait(2000);
          cy.get("button.ant-modal-close").click();
        });
    });
  });
  it("Can do filter?", () => {
    cy.get(".gallery-grid-cotainer").scrollTo("top");
    cy.viewport(991, 650).then(() => {
      cy.wait(2000);
      cy.get(".filter-icon-btn").click();
      cy.checkFilterForm(store);
    });
    cy.wait(5000);
    cy.viewport(1200, 800).then(() => {
      cy.wait(2000);
      cy.checkFilterForm(store);
    });
  });
}).afterAll(() => {
  alert("All test was done! ");
});
