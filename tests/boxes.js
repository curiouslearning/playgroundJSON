"use strict";

const _ = require("lodash");

const boxTrials = require("../games/BoxesTestTrials");
const trialMetaData = {
  trials: [],
  trialIndex: [],
  trialNameForIndex: [],
  setKeyForIndex: [],
};

const trialOrder = ["letter_name", "letter_sound", "blending_words"];
let cnt = 0;

_.each(trialOrder, (name, index) => { 
  const sets = _.keys(boxTrials[name]);
  _.each(sets, (set) => {
    _.each(boxTrials[name][set], (setTrials) => {
      _.each(setTrials, (trial) => {
        trial.set = set;
        trial.trial_name = name;
        trialMetaData.trials.push(trial)
        trialMetaData.setKeyForIndex.push(set);
        trialMetaData.trialNameForIndex.push(name);
        trialMetaData.trialIndex.push(cnt++);
        // cnt += 1
      });
    });
  });
});

const indiciesForTrial = function (trialType) {
  const indicies = [];
  _.each(trialMetaData.trialNameForIndex, (trialName, index) => {
    if (trialName === trialType) {
      indicies.push(index);
    }
  });
  return indicies;
}

console.log(`indices for letter_name = ${indiciesForTrial("letter_name")}`);
console.log(`indices for letter_sound = ${indiciesForTrial("letter_sound")}`);
console.log(`indices for blending_words = ${indiciesForTrial("blending_words")}`);
