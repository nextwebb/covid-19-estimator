const covid19ImpactEstimator = (data) => {
  // impact && severe Impact
  const {
    reportedCases, timeToElapse, periodType, totalHospitalBeds
  } = data;
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

  // challenge 1
  const impactCurrentlyInfected = (reportedCases * 10);
  // eslint-disable-next-line no-restricted-properties
  const impactInfectionsByRequestedTime = (impactCurrentlyInfected * (2 ** normalizedDuration));

  // challenge 2
  const impactCasesByRequestedTime = Math.trunc(0.15 * impactInfectionsByRequestedTime);
  const impactAvailableBeds = (0.35 * totalHospitalBeds);
  // eslint-disable-next-line max-len
  const impactHospitalBedsByRequetedTime = Math.trunc(impactAvailableBeds - impactCasesByRequestedTime);

  // severeImpact

  // challenge 1
  const severeImpactCurrentlyInfected = (reportedCases * 50);
  // eslint-disable-next-line max-len
  const severeImpactInfectionsByRequestedTime = (severeImpactCurrentlyInfected * (2 ** normalizedDuration));

  // challenge 2
  const severeImpactCasesByRequestedTime = Math.trunc(0.15 * severeImpactInfectionsByRequestedTime);
  const severeImpactAvailableBeds = (0.35 * totalHospitalBeds);
  // eslint-disable-next-line max-len
  const severeImpactHospitalBedsByRequetedTime = Math.trunc(severeImpactAvailableBeds - severeImpactCasesByRequestedTime);

  // estimation output for impact
  const impact = {
    currentlyInfected: impactCurrentlyInfected,
    infectionsByRequestedTime: impactInfectionsByRequestedTime,
    hospitalBedsByRequetedTime: impactHospitalBedsByRequetedTime,
    severeCasesByRequestedTime: impactCasesByRequestedTime
  };
  // extimation output for SevereImpact
  const severeImpact = {
    currentlyInfected: severeImpactCurrentlyInfected,
    infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
    hospitalBedsByRequetedTime: severeImpactHospitalBedsByRequetedTime,
    severeCasesByRequestedTime: severeImpactCasesByRequestedTime
  };

  const input = data;
  return {
    data: input,
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
