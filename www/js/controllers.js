angular.module('starter.controllers', [])

.controller('ContractCtrl', function($scope, Contracts) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.contracts = Contracts.all();
  $scope.remove = function(chat) {
    Contracts.remove(chat);
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

    var contract = {
      contractId: Contracts.all().length + 1,
      name: this.contractName,
      description: this.description,
      budget: this.budget,
      currencyOfBudget: this.currency,
      createdDate: new Date(),
      document: 'some/url'
    };

    Contracts.add(contract);
    $scope.contractName = '';
    $scope.description = '';
    $scope.budget = '';

  }
});
