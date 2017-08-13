"use strict";

const _ = require("lodash");
const trials = require("../games/BoxesTestTrials");

const trial_names = _.keys(trials);
console.log(`trial_names = ${JSON.stringify(trial_names)}`);

const trial_data = {
  trial_order: ["letter_name", "letter_sound", "sight_words", "blending_words"],
  trials: [],
  num_trials: -1,
}
trial_data.trials = _.map(trial_data.trial_order, (name, index) => {
  const trial = {
    name,
    num_sets: trials[name].length,
    set_keys: _.map(trials[name], (obj) => _.keys(obj)[0]),
    set_length: _.map(trials[name], (set) => _.values(set)[0].length),
    num_trials: _.reduce(_.map(trials[name], (set) => _.values(set)[0].length), (sum, val) => sum + val)
  }
  return trial;
});

trial_data.num_trials = _.reduce(trial_data.trials, (sum, val) => sum + val.num_trials, 0)

console.log(`trial_data = ${JSON.stringify(trial_data, null, 2)}`);
