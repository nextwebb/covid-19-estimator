const covid19ImpactEstimator = (data) => {
  // impact && severe Impact
  const { reportedCases, timeToElapse, periodType } = data;
  let normalizedDuration;
  // eslint-disable-next-line no-unused-vars
  let period; // period in days, weeks or months
  const impact = {};
  const severeImpact = {};


  if (periodType === 'days') {
    normalizedDuration = Math.floor(timeToElapse / 3); // rounddown duration
    // period = timeToElapse;
  } else if (periodType === 'weeks') {
    normalizedDuration = Math.floor(((timeToElapse / 7) / 3)); // rounddown duration
    // period = timeToElapse * 7;
  } else {
    normalizedDuration = Math.floor(((timeToElapse / 30) / 3)); // roundown duration
    // period = timeToElapse * 30;
  }
  impact.currentlyInfected = (reportedCases * 10);
  // eslint-disable-next-line no-restricted-properties
  impact.infectionsByRequestedTime = (impact.currentlyInfected * (2 ** normalizedDuration));

  severeImpact.currentlyInfected = (reportedCases * 50);
  // eslint-disable-next-line max-len
  severeImpact.infectionsByRequestedTime = (severeImpact.currentlyInfected * (2 ** normalizedDuration));

  const input = data;
  return {
    data: input,
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
