'use strict';

require('./_new-residence.scss');

module.exports = {
  template: require('./new-residence.html'),
  controller: ['$log', '$window', '$rootScope', '$location', 'authService', 'residenceService','$uibModal', NewResidenceController],
  controllerAs: 'newResidenceCtrl',
};

function NewResidenceController($log, $window, $rootScope, $location, authService, residenceService, $uibModal){
  $log.debug('init residenceCtrl');


  this.pageChanged = function() {

  };
  // this.paginate = function (value) {
  //   var begin, end, index;
  //   begin = (this.currentPage - 1) * this.itemsPerPage;
  //   end = begin + this.itemsPerPage;
  //   index = $scope.filteredRT.indexOf(value);
  //   return (begin <= index && index < end);
  // };
  this.residence = {};
  this.residences = [];
  this.states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  this.createNewResidence = function(residence){
    $log.debug('init createNewResidences()');
    residenceService.createResidence(residence)
   .then(() => {
     $log.debug('created a newwwwwwwwwwwwww residence');
   });
  };

  this.fetchResidences = function() {
    residenceService.fetchResidences()
    .then(data => {
      this.residences = data;
    });
  };

  this.getResidence = function(residenceData) {
    this.currentResidence = residenceData;
    this.fetchBedrooms(this.currentResidence._id);
    return this.currentResidence;
  };

  this.deleteResidence = function(residenceID) {
    residenceService.deleteResidence(residenceID)
    .then(()=> {
      $log.debug('removed residence');
      for(let i=0; i< this.residences.length; i++) {
        if(residenceID === this.residences[i]._id)
          this.residences.splice(i,1);
      }
    })
    .catch(() => {
      $log.debug('can not remove');
    });
  };

  this.openPopupModalAddBedroom = function() {
    $uibModal.open({
      component:'bedroomModal',
      resolve: {
        residence: () => {
          return this.currentResidence;
        },
      },
    });
  };

  this.fetchBedrooms = function(residenceID) {
    residenceService.fetchBedrooms(residenceID)
    .then((bedrooms) => {
      return this.currentBedrooms = bedrooms;
    });
  };

  this.deleteBedroom = function(residenceID, bedroomID){
    residenceService.deleteBedroom(residenceID, bedroomID)
    .then(() => {
      $log.debug('successfully deleted bedroom');
    });
  };

  this.fetchResidences();
  this.currentPage = 1;
  this.itemsPerPage = 4;

}
