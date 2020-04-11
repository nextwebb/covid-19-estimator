// eslint-disable-next-line no-unused-vars
// import data from './data';

const data = require('./data');

// eslint-disable-next-line no-shadow
const covid19ImpactEstimator = (data) => {
  // impact && severe Impact
  const impact = {};
  const severeImpact = {};
  const { reportedCases } = data;
  // const { timeToElapse } = data;
  const roundedDown = (30 / 3);
  const power = Math.floor(roundedDown);
  impact.currentlyInfected = (reportedCases * 10);
  // eslint-disable-next-line no-restricted-properties
  impact.infectionsByRequestedTime = (impact.currentlyInfected * Math.pow(2, power));

  severeImpact.currentlyInfected = (reportedCases * 50);
  // eslint-disable-next-line no-restricted-properties
  severeImpact.infectionsByRequestedTime = (severeImpact.currentlyInfected * Math.pow(2, power));

  const input = data;
  return {
    data: input,
    impact,
    severeImpact
  };
};

const output = covid19ImpactEstimator(data);
// eslint-disable-next-line no-console
console.log(output);


module.exports = covid19ImpactEstimator;
// export default covid19ImpactEstimator;
