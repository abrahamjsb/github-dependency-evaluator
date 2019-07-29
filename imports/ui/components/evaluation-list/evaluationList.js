import { Meteor } from 'meteor/meteor';
import { GhRepositories } from '/imports/api/ghrepositories/ghrepositories.js';
import "./evaluation-list.html";

Template.GhRepositories_list.onCreated(function GhRepositories_listOnCreated() {
    
    Meteor.subscribe('ghrepositories.all');

});

Template.GhRepositories_list.helpers({

    ghrepositories() {
        return GhRepositories.find({});
      },

});

Template.GhRepositories_list.events({
 
});