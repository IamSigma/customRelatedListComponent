/*******************************************************************************************
* @Name         CustomRelatedListMetadataTest
* @description  Test file for CustomRelatedListMetadata
*******************************************************************************************/
   
@isTest
public class CustomRelatedListMetadataTest {
    
    /*******************************************************************************************
	* @description  fetchColumnTest method
	*******************************************************************************************/
    @isTest
    public static void fetchColumnTest(){
        List<CustomRelatedListMetadata.ColumnWrapper> wrapperObj = new List<CustomRelatedListMetadata.ColumnWrapper>();
        wrapperObj = CustomRelatedListMetadata.fetchColumns('Contact');
        system.assert(wrapperObj!=null , 'Error in fetch Column');
    }

}