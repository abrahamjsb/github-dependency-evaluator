import { Meteor } from 'meteor/meteor';
import { GhRepositories } from  '/imports/api/ghrepositories/ghrepositories.js';

import './details.html';

Template.ghrepository_details.onCreated(function GhRepositories_listOnCreated() {
    
    Meteor.subscribe('ghrepositories.all');

});

Template.ghrepository_details.helpers({

    ghrepository() {
        
        const repositoryId = FlowRouter.getParam('_id');
        const currentRequest = GhRepositories.find({_id: repositoryId});       

        if(currentRequest) {
            return currentRequest;
        } else {
            return;
        }
      },

});

Template.ghrepository_details.events({
 
});