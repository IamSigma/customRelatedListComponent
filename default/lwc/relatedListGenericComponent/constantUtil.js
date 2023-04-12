// Contact Fetch Data
export const fetchContactColumn = ['Id', 'Name', 'Phone', 'Action'];
export const dataTableHeaderContactColumn = [
  { label: 'Id', fieldName: 'Id' }, { label: 'Name', fieldName: 'Name' }, { label: 'Phone', fieldName: 'Phone' },
  {
    type: 'button',
    typeAttributes: {
      label: 'Edit',
      name: 'Edit',
      title: 'Edit',
      disabled: false,
      value: 'edit',
      iconPosition: 'left'
    }
  }
];

// Opprortunity Fetch Data
export const fetchOpportunityColumn = ['Id', 'Name', 'Type', 'Stage'];
export const dataTableHeaderOpportunityColumn = [{ label: 'Id', fieldName: 'Id' }, { label: 'Name', fieldName: 'Name' }, { label: 'Type', fieldName: 'Type' }];

// Case Fetch Data
export const fetchCaseColumn = [];
export const dataTableHeaderCaseColumn = [];