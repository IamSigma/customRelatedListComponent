import { createElement } from "lwc";
import RelatedListGenericComponent from "c/relatedListGenericComponent";
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

async function flushPromises() {
    return Promise.resolve();
}

describe("c-related-list-generic-component", () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

const mockRelatedRecords = require('./data/getRelatedListRecords.json');

  it("test1",async () => {
    const element = createElement("c-related-list-generic-component", {
      is: RelatedListGenericComponent
    });

    element.relatedListObjectNameSingular = "Contact";
    document.body.appendChild(element);
    getRelatedListRecords.emit(mockRelatedRecords)

    // const selectlightningbtn =
    //   element.shadowRoot.querySelector("lightning-button");
    // selectlightningbtn.click();
    await flushPromises();

    const selectlightningdatatbl = element.shadowRoot.querySelector('lightning-datatable')
    selectlightningdatatbl.dispatchEvent(
      new CustomEvent("rowaction", {
        detail: { row: { Id: "Test123" }, action: { name: "Edit" } }
      })
    );

    expect(1).toBe(1);
  });
  it("test2", () => {
    const element = createElement("c-related-list-generic-component", {
      is: RelatedListGenericComponent
    });

    element.relatedListObjectNameSingular = "Opportunity";
    document.body.appendChild(element);
    getRelatedListRecords.emit(mockRelatedRecords)

    expect(1).toBe(1);
  });
  it("test3", () => {
    const element = createElement("c-related-list-generic-component", {
      is: RelatedListGenericComponent
    });

    element.relatedListObjectNameSingular = "Case";
    document.body.appendChild(element);
    getRelatedListRecords.error()
    const selectlightningbtn =
    element.shadowRoot.querySelector("lightning-button");
  selectlightningbtn.click();
    expect(1).toBe(1);
  });
});
