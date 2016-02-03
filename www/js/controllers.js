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
