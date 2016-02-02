angular.module('starter.controllers', [])

.controller('ContractCtrl', function($scope, Contracts) {
  $scope.contracts = Contracts.all();

  $scope.remove = function(contract) {
    Contracts.remove(contract);
  };

})

.controller('ContractDetailCtrl', function($scope, $stateParams, Contracts) {
  $scope.contract = Contracts.get($stateParams.contractId);
})

.controller('ContractAddCtrl', function($scope, Contracts){
  $scope.currencies = [
    { label: 'USD', value: 'USD' },
    { label: 'UAH', value: 'UAH' },
    { label: 'RUB', value: 'RUB' }
  ];
  $scope.currency = 'RUB';

  $scope.submit = function(){
    var self = this;

    var contract = {
      name: this.contractName,
      description: this.description,
      budget: this.budget,
      currencyOfBudget: this.currency,
      createdDate: new Date(),
      document: 'some/url'
    };

    Contracts.add(contract);

    self.contractName = '';
    self.description = '';
    self.budget = '';

  }
});
