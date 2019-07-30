import { Meteor } from "meteor/meteor";
import { GhRepositories } from '/imports/api/ghrepositories/ghrepositories.js';
import "./form.html";

Template.GhRepository_form.onCreated(function GhRepository_formOnCreated() {
  
    Meteor.subscribe('ghrepositories.all');
});

Template.GhRepository_form.helpers({

});

Template.GhRepository_form.events({
  'submit #ghrepository-form'(event) {
    // increment the counter when button is clicked
    event.preventDefault();
    const repositoryName = event.target.repository.value;

    Meteor.call('ghrepositories.insert', repositoryName, function(error) {
        if(error){
            console.log(error);
        } else {
           const currentRepository = GhRepositories.findOne({fullName: repositoryName}, { fields: { _id: true } });
            FlowRouter.go('App.details', { _id: currentRepository._id });
        }
    });
  },
});
