/* eslint-disable max-len */
const covid19ImpactEstimator = (data) => {
  // impact && severe Impact
  const {
    reportedCases, timeToElapse, periodType, totalHospitalBeds, region
  } = data;
  let normalizedDuration;
  // eslint-disable-next-line no-unused-vars
  let period; // period in days, weeks or months

  if (periodType === 'days') {
    normalizedDuration = Math.floor(timeToElapse / 3); // rounddown duration
    period = timeToElapse / 3; // day
  } else if (periodType === 'weeks') {
    normalizedDuration = Math.floor(((timeToElapse * 7) / 3)); // rounddown duration
    period = timeToElapse * 7; // week
  } else {
    period = timeToElapse * 30; // month
    normalizedDuration = Math.floor(((timeToElapse * 30) / 3)); // roundown duration
  }

  // impact

  // challenge 1
  const impactCurrentlyInfected = (reportedCases * 10);
  // eslint-disable-next-line no-restricted-properties
  const impactInfectionsByRequestedTime = (impactCurrentlyInfected * (2 ** normalizedDuration));

  // challenge 2
  const impactCasesByRequestedTime = (0.15 * impactInfectionsByRequestedTime);

  // eslint-disable-next-line max-len
  const impactHospitalBedsByRequetedTime = Math.trunc((0.35 * totalHospitalBeds) - impactCasesByRequestedTime);

  // challenge 3
  const impactCasesForICUByRequestedTime = (0.05 * impactInfectionsByRequestedTime);
  const impactCasesForVentilatorsByRequestedTime = (0.02 * impactCasesByRequestedTime);
  const impactDollarsInFlight = Math.trunc((impactInfectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD) / period);

  // severeImpact

  // challenge 1
  const severeImpactCurrentlyInfected = (reportedCases * 50);
  // eslint-disable-next-line max-len
  const severeImpactInfectionsByRequestedTime = (severeImpactCurrentlyInfected * (2 ** normalizedDuration));

  // challenge 2
  const severeImpactCasesByRequestedTime = (0.15 * severeImpactInfectionsByRequestedTime);

  // eslint-disable-next-line max-len
  const severeImpactHospitalBedsByRequetedTime = Math.trunc((0.35 * totalHospitalBeds) - severeImpactCasesByRequestedTime);

  // challenge 3
  const severeImpactcasesForICUByRequestedTime = (0.05 * severeImpactInfectionsByRequestedTime);
  const severeImpactcasesForVentilatorsByRequestedTime = (0.02 * severeImpactCasesByRequestedTime);
  const severeImpactDollarsInFlight = Math.trunc((severeImpactInfectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD) / period);

  // estimation output for impact
  const impact = {
    currentlyInfected: impactCurrentlyInfected,
    infectionsByRequestedTime: impactInfectionsByRequestedTime,
    hospitalBedsByRequetedTime: impactHospitalBedsByRequetedTime,
    severeCasesByRequestedTime: impactCasesByRequestedTime,
    casesForICUByRequestedTime: severeImpactcasesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime: severeImpactcasesForVentilatorsByRequestedTime,
    dollarsInFlight: impactDollarsInFlight
  };
  // extimation output for SevereImpact
  const severeImpact = {
    currentlyInfected: severeImpactCurrentlyInfected,
    infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
    hospitalBedsByRequetedTime: severeImpactHospitalBedsByRequetedTime,
    severeCasesByRequestedTime: severeImpactCasesByRequestedTime,
    casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
    dollarsInFlight: severeImpactDollarsInFlight
  };

  const input = data;
  return {
    data: input,
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
