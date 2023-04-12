/*******************************************************************************************
* @Name         CustomRelatedListMetadata
* @description  Class to get listFields
*******************************************************************************************/
                   

public with sharing class CustomRelatedListMetadata {
    @AuraEnabled(cacheable = true)
/********************************************************************************************************
    * @description  fetchColumn for object
    * @param        objectApiName
    * @return       columnsList
    *********************************************************************************************************/      
     
    public static list < ColumnWrapper > fetchColumns(string objectApiName) {
        List < ColumnWrapper > columnsList = new List < ColumnWrapper > ();
        list < RelatedListMetadata__mdt > columnsFieldsList = [Select FieldName__c, FieldLabel__c, Object__c, sequence__c, type__c, typeAttributes__c From RelatedListMetadata__mdt Where Object__c =: objectApiName WITH SECURITY_ENFORCED Order By Sequence__c ASC NULLS LAST];
        for (RelatedListMetadata__mdt mdt: columnsFieldsList) {
            columnsList.add(new ColumnWrapper(mdt.FieldLabel__c, mdt.FieldName__c, mdt.type__c));

        }

        if (columnsList.size() > 0) {
            return columnsList;
        } else {
            return Null;

        }

    }
/********************************************************************************************************
    * @description  Column Wrapper class
    ******************************************************************************************************/
    public class ColumnWrapper {

        @AuraEnabled public String label;
        @AuraEnabled public String fieldName;
        @AuraEnabled public String type;
    /********************************************************************************************************
    * @description  Column Wrapper constructor
    * @param        label
    * @param        fieldName
    * @param        type
    ******************************************************************************************************/

        public ColumnWrapper(String label, String fieldName, String type) {
            this.label = label;
            this.fieldName = fieldName;
            this.type = type;
        }
    }
}