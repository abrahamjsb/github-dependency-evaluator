import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const GhRepositories = new Mongo.Collection("ghrepositories");

GhRepositories.schema =  new SimpleSchema({
    id: {
        type: SimpleSchema.Integer
      },
    repositoryName: {
        type: String
    },
    fullName: {
        type: String,
        
    },
    author: {
        type: String,
        
    },
    defaultBranch: {
        type:String
    },
    issues: {
        type: SimpleSchema.Integer,
    },
    lastCommit: {
        type: Object,
        
    },
    "lastCommit.date": {
        type:Date
    },
    "lastCommit.author":{ 
        type: String
    },
    "lastCommit.message":{
        type: String
    },
    "lastCommit.sha":{
        type: String
    },
    avatarUrl: {
        type: String,
        regEx: SimpleSchema.RegEx.Url
    },
    license: {
        type: String,        
    },
    homepage: {
        type: String,
        regEx: SimpleSchema.RegEx.Url
    },
    created_at: {
        type: Date
    },
    updated_at:{
        type: Date,
        optional: true
    },
    result: {
        type: Number
    }

});
GhRepositories.attachSchema(GhRepositories.schema);