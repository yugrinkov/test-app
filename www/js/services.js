angular.module('starter.services', ['ngResource'])

  .factory('Contracts', function ($resource) {
    // Might use a resource here that returns a JSON array

    var resourse = $resource('http://localhost:8080/service/contract/:contractId', {contractId: '@_id'}),
      contracts = [];

    return {
      all: function () {
        contracts = resourse.query();
        return contracts;
      },
      add: function (contract) {
        resourse.save(contract, function (res) {
          contract.contractId = res.contractId;
          contracts.push(contract);
        });

      },
      remove: function (contract) {
        resourse.remove({contractId: contract.contractId}, function () {
          contracts.splice(contracts.indexOf(contract), 1);
        });

      },
      get: function (contractId) {
        return resourse.get({contractId: contractId});
      }
    };
  });

