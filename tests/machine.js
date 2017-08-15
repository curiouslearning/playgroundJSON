"use strict";

const _ = require("lodash");

const machineTrials = require("../games/MachineTestTrials");
const trialMetaData = {
  trials: [],
  trialIndex: [],
  trialNameForIndex: [],
  setKeyForIndex: [],
};

const trialOrder = ["receptive_vocabulary", "pseudoword_matching"];
let cnt = 0;

_.each(trialOrder, (name, index) => { 
  const sets = _.keys(machineTrials[name]);
  _.each(sets, (set) => {
    _.each(machineTrials[name][set], (setTrials) => {
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

console.log("trialMetaData = ", trialMetaData);
debugger;




const indiciesForTrial = function (trialType) {
  const indicies = [];
  _.each(trialMetaData.trialNameForIndex, (trialName, index) => {
    if (trialName === trialType) {
      indicies.push(index);
    }
  });
  return indicies;
}

console.log(`indices for receptive_vocabulary = ${indiciesForTrial("receptive_vocabulary")}`);
console.log(`indices for pseudoword_matching = ${indiciesForTrial("pseudoword_matching")}`);
