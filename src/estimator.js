const covid19ImpactEstimator = (data) => {
  // impact && severe Impact
  const { reportedCases, timeToElapse, periodType } = data;
  let normalizedDuration;
  // eslint-disable-next-line no-unused-vars
  let period; // period in days, weeks or months

  if (periodType === 'days') {
    normalizedDuration = Math.floor(timeToElapse / 3); // rounddown duration
  } else if (periodType === 'weeks') {
    normalizedDuration = Math.floor(((timeToElapse * 7) / 3)); // rounddown duration
  } else {
    normalizedDuration = Math.floor(((timeToElapse * 30) / 3)); // roundown duration
  }

  // impact
  const impactCurrentlyInfected = (reportedCases * 10);
  // eslint-disable-next-line no-restricted-properties
  const impactInfectionsByRequestedTime = (impactCurrentlyInfected * (2 ** normalizedDuration));


  // severImpact
  const severeImpactCurrentlyInfected = (reportedCases * 50);
  // eslint-disable-next-line max-len
  const severeImpactInfectionsByRequestedTime = (severeImpactCurrentlyInfected * (2 ** normalizedDuration));

  // estimation output for impact
  const impact = {
    currentlyInfected: impactCurrentlyInfected,
    infectionsByRequestedTime: impactInfectionsByRequestedTime
  };
  // extimation output for SevereImpact
  const severeImpact = {
    currentlyInfected: severeImpactCurrentlyInfected,
    infectionsByRequestedTime: severeImpactInfectionsByRequestedTime
  };

  const input = data;
  return {
    data: input,
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
