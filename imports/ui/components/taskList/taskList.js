import { Template } from 'meteor/templating';
import { Tasks } from '../../../api/api.js';

import './taskList.html';
import '../task/task.js';

Template.taskList.helpers({
  mutedIfNoTasks() {
    const instance = Template.instance();
    const tasks = instance.data.tasks;
    if(tasks.count() < 1) {
      return 'text-muted';
    }
  }
});
