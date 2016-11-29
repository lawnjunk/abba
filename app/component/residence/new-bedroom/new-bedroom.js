'use strict';

require('./_new-bedroom.scss');

module.exports = {
  template: require('./new-bedroom.html'),
  controller: ['$log','$http', 'residenceService', 'picService','$timeout', NewBedroomController],
  controllerAs: 'newBedroomCtrl',
  bindings: {
    residenceData: '<',
    closeModal: '&',
    modalInstance: '<',
  },
};

function NewBedroomController($log, $http, residenceService, picService, $timeout){
  $log.debug('init newBedroomCtrl');
  this.showAlert = false;

  this.createNewBed = function(){
    $log.debug('init createNewBedroom()');
    this.bedroom.estimate = this.createEstimate(this.bedroom);
    residenceService.addNewBedroom(this.residenceData._id, this.bedroom)
    .then(bedroom => {
      this.newBed = bedroom;
      this.showAlert = true;
    });
  };

  this.pic = {};

  this.uploadBedroomPhoto = function(){
    $log.debug('init uploadBedroomPhoto');
    picService.uploadBedroomPhoto(this.newBed, this.pic)
    .then(dataPic => {
      this.bedroom.photo = dataPic;
      this.bedroom.imageURI = dataPic.imageURI;
      this.pic = null;
      this.closeModal();
      // this.modalInstance.close();
      console.log('ARE WE HEREEEEEEEEEEEE');
    });
  };

  this.bedroom = {};

  this.createEstimate = function(bedroom){
    let estimate = 0;
    let base = 100;
    if (bedroom.type === 'Master'){
      if (bedroom.bedSize === 'King'){
        if (bedroom.privateBath) {
          estimate = base * 1.2 * 1.2 * 1.2;
          return estimate;
        }
        if (!bedroom.privateBath) {
          estimate = base * 1.2 * 1.2 * .9;
          return estimate;
        }
      }
      if (bedroom.bedSize === 'Queen'){
        if (bedroom.privateBath) {
          estimate = base * 1.2 * 1.1 * 1.2;
          return estimate;
        }
        if (!bedroom.privateBath) {
          estimate = base * 1.2 * 1.1 * .9;
          return estimate;
        }
      }
      if (bedroom.bedSize === 'Double'){
        if (bedroom.privateBath) {
          estimate = base * 1.2 * .9 * 1.2;
          return estimate;
        }
        if (!bedroom.privateBath) {
          estimate = base * 1.2 * .9 * .9;
          return estimate;
        }
      }
    }
    if (bedroom.type === 'Regular'){
      if (bedroom.bedSize === 'King'){
        if (bedroom.privateBath) {
          estimate = base * .9 * 1.2 * 1.2;
          return estimate;
        }
        if (!bedroom.privateBath) {
          estimate = base * .9 * 1.2 * .9;
          return estimate;
        }
      }
      if (bedroom.bedSize === 'Queen'){
        if (bedroom.privateBath) {
          estimate = base * .9 * 1.1 * 1.2;
          return estimate;
        }
        if (!bedroom.privateBath) {
          estimate = base * .9 * 1.1 * .9;
          return estimate;
        }
      }
      if (bedroom.bedSize === 'Double'){
        if (bedroom.privateBath) {
          estimate = base * .9 * .9 * 1.2;
          return estimate;
        }
        if (!bedroom.privateBath) {
          estimate = base * .9 * .9 * .9;
          return estimate;
        }
      }
    }
  };

  this.closeAlert = function() {
    this.showAlert = false;
  };
  this.showAlertForFiveSec = function() {
    $timeout(this.closeAlert, 5000);
  };
}
