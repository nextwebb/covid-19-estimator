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
  const impactCasesByRequestedTime = (0.15 * impactInfectionsByRequestedTime);
  const impactAvailableBeds = (0.35 * totalHospitalBeds);
  // eslint-disable-next-line max-len
  let impactHospitalBedsByRequetedTime = (impactAvailableBeds - impactCasesByRequestedTime);
  if (impactHospitalBedsByRequetedTime > 0) {
    impactHospitalBedsByRequetedTime = Math.floor(impactHospitalBedsByRequetedTime);
  } else {
    impactHospitalBedsByRequetedTime = Math.ceil(impactHospitalBedsByRequetedTime);
  }

  // severeImpact

  // challenge 1
  const severeImpactCurrentlyInfected = (reportedCases * 50);
  // eslint-disable-next-line max-len
  const severeImpactInfectionsByRequestedTime = (severeImpactCurrentlyInfected * (2 ** normalizedDuration));

  // challenge 2
  const severeImpactCasesByRequestedTime = (0.15 * severeImpactInfectionsByRequestedTime);
  const severeImpactAvailableBeds = (0.35 * totalHospitalBeds);
  // eslint-disable-next-line max-len
  let severeImpactHospitalBedsByRequetedTime = (severeImpactAvailableBeds - severeImpactCasesByRequestedTime);
  if (severeImpactHospitalBedsByRequetedTime > 0) {
    severeImpactHospitalBedsByRequetedTime = Math.floor(severeImpactHospitalBedsByRequetedTime);
  } else {
    severeImpactHospitalBedsByRequetedTime = Math.ceil(severeImpactHospitalBedsByRequetedTime);
  }

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
