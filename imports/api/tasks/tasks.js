import { Mongo } from 'meteor/mongo';

const Tasks = new Mongo.Collection('tasks');

var Schemas = {};

Schemas.Tasks = new SimpleSchema({
  user_id: { type: SimpleSchema.RegEx.Id },
  name: { type: String },
  completed_on: { type: Date, optional: true },
  created_on: { type: Date},
  due_on: { type: Date, optional: true },
  is_sorted: { type: Boolean, defaultValue: false },
  is_urgent: { type: Boolean, defaultValue: false },
  is_important: { type: Boolean, defaultValue: false },
});

Tasks.attachSchema(Schemas.Tasks);

export { Tasks }
