import { Meteor } from "meteor/meteor";
import "./form.html";

Template.GhRepository_form.onCreated(function GhRepository_formOnCreated() {
  

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
        }
    });
  },
});
