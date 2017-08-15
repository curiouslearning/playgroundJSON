"use strict";

const _ = require("lodash");

const unlockTrials = require("../games/unlockFoodTestTrials");

const trialOrder = ["visuospatial_forward", "visuospatial_reverse", "audio_forward", "audio_reverse"];

const getTrailsMetaData = function () {
  const trialMetaData = {
    trials: [],
    trialIndex: [],
    trialNameForIndex: [],
    setKeyForIndex: [],
  };
  
  let cnt = 0;
  _.each(trialOrder, (name, index) => { 
  const sets = _.keys(unlockTrials[name]);
  _.each(sets, (set) => {
    _.each(unlockTrials[name][set], (setTrials) => {
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
  return trialMetaData;
}

const _trailMetaData = getTrailsMetaData();

const indiciesForTrial = function (trialType) {
  const indicies = [];
  _.each(_trailMetaData.trialNameForIndex, (trialName, index) => {
    if (trialName === trialType) {
      indicies.push(index);
    }
  });
  return indicies;
}


console.log(`indices for visuospatial_forward = ${indiciesForTrial("visuospatial_forward")}`);
console.log(`indices for visuospatial_reverse = ${indiciesForTrial("visuospatial_reverse")}`);
console.log(`indices for audio_forward = ${indiciesForTrial("audio_forward")}`);
console.log(`indices for audio_reverse = ${indiciesForTrial("audio_reverse")}`);
