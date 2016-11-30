import { Mongo } from 'meteor/mongo';

var Schemas = {};

Schemas.Tasks = new SimpleSchema({
  name: { type: String },
  completed_on: {type: Date, optional: true},
  created_on: {type: Date},
  due_on: { type: Date },
  is_urgent: { type: Boolean},
  is_important: { type: Boolean}

});

Tasks.attachSchema(Schemas.Tasks);

export {Tasks}