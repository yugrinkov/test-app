angular.module('starter.controllers', ['ngCordova'])

.controller('ContractCtrl', function($scope, Contracts) {
  $scope.contracts = Contracts.all();

  $scope.remove = function(contract) {
    Contracts.remove(contract);
  };

})

.controller('ContractDetailCtrl', function($scope, $stateParams, Contracts, $cordovaFileTransfer) {
  $scope.contract = Contracts.get($stateParams.contractId);

  /*$scope.testFileDownload = function(){


    // File for download
    var url = "http://www.gajotres.net/wp-content/uploads/2015/04/logo_radni.png";

    // File name only
    var filename = url.split("/").pop();

    // Save location
   // var targetPath = cordova.file.externalRootDirectory + filename;

    $cordovaFileTransfer.download(url, filename, {}, true).then(function (result) {
      console.log('Success');
    }, function (error) {
      console.log('Error');
    }, function (progress) {
      // PROGRESS HANDLING GOES HERE
    });
  } */

})

.controller('ContractAddCtrl', function($scope, Contracts){
  $scope.currencies = [
    { label: 'USD', value: 'USD' },
    { label: 'UAH', value: 'UAH' },
    { label: 'RUB', value: 'RUB' }
  ];
  $scope.currency = 'RUB';

  $scope.isValid = function(contract){
    console.log(angular.isString(contract.description));
      var name = angular.isDefined(contract.name),
          description = angular.isDefined(contract.description),
          budget = angular.isDefined(contract.budget);

      return name && description && budget
  };

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

    if (this.isValid(contract)){
      Contracts.add(contract);

      this.contractName = '';
      this.description = '';
      this.budget = '';
    }
  }
});
