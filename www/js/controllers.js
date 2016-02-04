angular.module('starter.controllers', ['ngCordova'])

.controller('ContractCtrl', function($scope, Contracts) {
  $scope.contracts = Contracts.all();

  $scope.remove = function(contract) {
    Contracts.remove(contract);
  };

})

.controller('ContractDetailCtrl', function($scope, $stateParams, Contracts, $cordovaFileTransfer) {
  $scope.contract = Contracts.get($stateParams.contractId);
  $scope.isClick = false;

  $scope.download = function(){

    // File for download
    var url = $scope.contract.document;

    // File name only
    var filename = url.split("/").pop();

    // Save location
    var targetPath = cordova.file.applicationStorageDirectory + filename;

    $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
      $scope.isLoad = true;
      $scope.isLoadingDoc = false;

    }, function (error) {
      $scope.isClick = true;
      $scope.isLoad = false;
      $scope.isLoadingDoc = false;
    }, function (progress) {
        $scope.isLoadingDoc = true;
    });
  }

})

.controller('ContractAddCtrl', function($scope, $location, Contracts){
  $scope.form = {};
  $scope.form_data = {};
  $scope.currencies = [
    { label: 'USD', value: 'USD' },
    { label: 'UAH', value: 'UAH' },
    { label: 'RUB', value: 'RUB' }
  ];

  $scope.submitForm = function(formData){

         var contract = {
              name: formData.contractName,
              description: formData.description,
              budget: formData.budget,
              currencyOfBudget: formData.currency,
              createdDate: new Date(),
              document: 'some/url'
         };

         Contracts.add(contract);

         $scope.form_data = {};
         $scope.form.contract.$setPristine();
         $location.path( "/tab/contracts" );
  }
});
