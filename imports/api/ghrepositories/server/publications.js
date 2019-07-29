import { Meteor } from 'meteor/meteor';
import { GhRepositories as Repositories } from '../ghrepositories';

Meteor.publish('ghrepositories.all', function () {
  return Repositories.find();
});
