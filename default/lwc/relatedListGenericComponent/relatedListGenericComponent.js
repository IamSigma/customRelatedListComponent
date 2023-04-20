import { LightningElement, api, wire, track } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { NavigationMixin } from 'lightning/navigation';
import { editButtonObject, fetchOpportunityColumn, dataTableHeaderOpportunityColumn } from './constantUtil';

export default class GenericRelatedListComponent extends NavigationMixin(LightningElement) {
    @api recordId;
    @api relatedListObjectNamePlural;
    @api relatedListObjectNameSingular;
    @api fieldsApiNames;
    @api rowsToDisplay;

    @track showDataTable = false;
    @track records;
    error;
    @track tempArr = null;
    @track columns ;
    @track recordDataVar = [];
    @track relatedListFields = [];

    @track fieldsApiNamesArray = [];
    @track fieldsApiNameArraySplitted = [];
    @track headerRelatedListColoumn = [];


    @track sortedBy = "FirstName";
    @track sortedDirection = "asc";

    connectedCallback () {
      console.log('fieldsApiName ::' + this.fieldsApiNames);
      console.log('rowsToDisplay ::' + this.rowsToDisplay);
      this.constructRelatedListHeaderFields();
      this.constructRelatedListFieldsTemp();
      this.constructRelatedListFields();
    }

    constructRelatedListHeaderFields(){
      this.fieldsApiNamesArray = this.fieldsApiNames.split(',');
      this.fieldsApiNameArraySplitted = this.fieldsApiNames.split(',');
    }
    constructRelatedListFieldsTemp(){
      for ( let i = 0 ; i < this.fieldsApiNamesArray.length ; i++ ){
        if(this.fieldsApiNamesArray[i] === "Name"){
          this.headerRelatedListColoumn.push( { label: this.fieldsApiNamesArray[i], fieldName: "ConName", sortable: "true", type: 'url', typeAttributes: {
            label: {
                fieldName: 'Name'
            },
          }
        });
        }
        else{
          this.headerRelatedListColoumn.push( { label: this.fieldsApiNamesArray[i], fieldName: this.fieldsApiNamesArray[i], sortable: "true" });
        }

      }
      this.headerRelatedListColoumn.push(editButtonObject);
    }

    constructRelatedListFields () {
      let tempArr = [];
      const relatedListVar = this.relatedListObjectNameSingular;

      if (this.relatedListObjectNameSingular === 'Contact') {
        tempArr = this.fieldsApiNamesArray ; 
        this.columns = this.headerRelatedListColoumn

      } else if (this.relatedListObjectNameSingular === 'Opportunity') {
        tempArr = fetchOpportunityColumn;
        this.columns = dataTableHeaderOpportunityColumn;

      } else if (this.relatedListObjectNameSingular === 'Case') {
        // write the logic for cases
      }

      for (let i = 0; i < tempArr.length ; i++) {
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

        console.log('Finally :->' + JSON.stringify(this.records));
        for ( const rec of this.records ){
          const tempObj = {};
          for(let i = 0 ; i<this.fieldsApiNameArraySplitted.length ; i++ ){
            
            let tempVai = this.fieldsApiNameArraySplitted[i];
            tempObj[`${tempVai}`] = rec.fields[`${tempVai}`].value;
            if( this.fieldsApiNameArraySplitted[i] === "Name" ){
              tempObj.ConName = '/' + rec.id;
            }
          }
          this.recordDataVar.push(tempObj);
        }
      } else if (error) {
        console.log('Error::',error);
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

      console.log('recordId ::' + recId + '  ' + 'actionName ::' + actionName);
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


    onSort(event) {
      this.sortedBy = event.detail.fieldName;
      this.sortedDirection = event.detail.sortDirection;
      this.sortData(this.sortedBy, this.sortedDirection);
    }
  
    sortData(fieldname, direction) {
      let parseData = JSON.parse(JSON.stringify(this.recordDataVar));
      let keyValue = (a) => {
        return a[fieldname];
      };
      let isReverse = direction === "asc" ? 1 : -1;
      parseData.sort((x, y) => {
        x = keyValue(x) ? keyValue(x) : "";
        y = keyValue(y) ? keyValue(y) : "";
        return isReverse * ((x > y) - (y > x));
      });
      this.recordDataVar = parseData;
    }
}