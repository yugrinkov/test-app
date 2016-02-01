angular.module('starter.services', [])

.factory('Contracts', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data


  var contracts = [{
      contractId: 1,
      name: 'NDA Contract',
      description: 'A non-disclosure agreement (NDA), also known as a confidentiality agreement (CA), confidential disclosure agreement (CDA), proprietary information agreement (PIA), or secrecy   agreement (SA)',
      budget: 25000,
      currencyOfBudget: 'UAH',
      createdDate: new Date(),
      document: '/url/data1'
    },
    {
      contractId: 2,
      name: 'Sales Contract',
      description: 'A sales contract documents the terms of a sales transaction between a seller and a buyer. The contract should identify the product sold, the quantity, pricing, payment terms, quality standards and delivery terms. Additionally, the parties may specify any insurance requirements, termination provisions and the process for resolving disputes.',
      budget: 20000,
      currencyOfBudget: 'UAH',
      createdDate: new Date(),
      document: '/url/data2'
    },
    {
      contractId: 3,
      name: 'Distributor Contract',
      description: 'This is a new contract which we will use for work with our clients',
      budget: 21550,
      currencyOfBudget: 'UAH',
      createdDate: new Date(),
      document: '/url/data3'
    }
  ];


  return {
    all: function() {
      return contracts;
    },
    add: function(contract){
      contracts.push(contract);
    },
    remove: function(contract) {
      contracts.splice(contracts.indexOf(contract), 1);
    },
    get: function(contractId) {
      for (var i = 0; i < contracts.length; i++) {
        if (contracts[i].contractId === parseInt(contractId)) {
          return contracts[i];
        }
      }
      return null;
    }
  };
});
