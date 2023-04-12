import { LightningElement, api, wire, track } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { NavigationMixin } from 'lightning/navigation';
import { fetchContactColumn, dataTableHeaderContactColumn, fetchOpportunityColumn, dataTableHeaderOpportunityColumn } from './constantUtil';

const col = [{ label: 'Id', fieldName: 'Id' }, { label: 'Name', fieldName: 'Name' }, { label: 'Phone', fieldName: 'Phone' }];

export default class GenericRelatedListComponent extends NavigationMixin(LightningElement) {
    @api recordId;
    @api relatedListObjectNamePlural;
    @api relatedListObjectNameSingular;
    @track showDataTable = false;
    @track records;
    error;
    @track tempArr = null;
    @track columns = col;
    @track recordDataVar = [];
    @track relatedListFields = [];

    connectedCallback () {
      this.constructRelatedListFields();
    }

    constructRelatedListFields () {
      let tempArr = [];
      const relatedListVar = this.relatedListObjectNameSingular;

      if (this.relatedListObjectNameSingular === 'Contact') {
        tempArr = fetchContactColumn;
        this.columns = dataTableHeaderContactColumn;
      } else if (this.relatedListObjectNameSingular === 'Opportunity') {
        tempArr = fetchOpportunityColumn;
        this.columns = dataTableHeaderOpportunityColumn;
      } else if (this.relatedListObjectNameSingular === 'Case') {
        // write the logic for cases
      }

      for (let i = 0; i < tempArr.length - 1; i++) {
        this.relatedListFields.push(relatedListVar + '.' + tempArr[i]);
      }
    }

    @wire(getRelatedListRecords, {
      parentRecordId: '$recordId',
      relatedListId: '$relatedListObjectNamePlural',
      fields: '$relatedListFields'
    })
    listInfo ({ error, data }) {
      if (data) {
        this.recordDataVar = [];
        this.records = data.records;
        this.showDataTable = true;
        for (const rec of this.records) {
          const tempObj = {};
          tempObj.Id = rec.fields.Id.value;
          tempObj.Phone = rec.fields.Phone.value;
          tempObj.Name = rec.fields.Name.value;
          this.recordDataVar.push(tempObj);
        }
      } else if (error) {
        this.error = error;
        console.log('Error :: ' + JSON.stringify(this.error));
      }
    }

    newRecordCreation () {
      this[NavigationMixin.Navigate]({
        type: 'standard__objectPage',
        attributes: {
          objectApiName: this.relatedListObjectNameSingular,
          actionName: 'new'
        }
      });
    }

    callRowAction (event) {
      const recId = event.detail.row.Id;
      const actionName = event.detail.action.name;
      if (actionName === 'Edit') {
        this[NavigationMixin.Navigate]({
          type: 'standard__recordPage',
          attributes: {
            recordId: recId,
            objectApiName: 'Account',
            actionName: 'edit'
          }
        });
      }
    }
}