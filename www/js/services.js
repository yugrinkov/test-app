angular.module('starter.services', ['ngResource'])

  .factory('Contracts', function ($resource) {
    // Might use a resource here that returns a JSON array

    // Please for test on android do not use localhost or 127.0.0.1
    var resourse = $resource('http://192.168.0.103:8080/service/contract/:contractId', {contractId: '@_id'}),
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

