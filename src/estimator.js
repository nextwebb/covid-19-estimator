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
  const impactCurrentlyInfected = (reportedCases * 10);
  // eslint-disable-next-line no-restricted-properties
  const impactInfectionsByRequestedTime = (impactCurrentlyInfected * (2 ** normalizedDuration));
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
  const severeImpactCurrentlyInfected = (reportedCases * 50);
  // eslint-disable-next-line max-len
  const severeImpactInfectionsByRequestedTime = (severeImpactCurrentlyInfected * (2 ** normalizedDuration));
  const severeImpactCasesByRequestedTime = (0.15 * severeImpactInfectionsByRequestedTime);
  const severeImpactAvailableBeds = (0.35 * totalHospitalBeds);
  // eslint-disable-next-line max-len
  let severeImpacthospitalBedsByRequetedTime = (severeImpactAvailableBeds - severeImpactCasesByRequestedTime);
  if (severeImpacthospitalBedsByRequetedTime > 0) {
    severeImpacthospitalBedsByRequetedTime = Math.floor(severeImpacthospitalBedsByRequetedTime);
  } else {
    severeImpacthospitalBedsByRequetedTime = Math.ceil(severeImpacthospitalBedsByRequetedTime);
  }

  // estimation output for impact
  const impact = {
    currentlyInfected: impactCurrentlyInfected,
    infectionsByRequestedTime: impactInfectionsByRequestedTime,
    severeCasesByRequestedTime: impactCasesByRequestedTime,
    hospitalBedsByRequetedTime: impactHospitalBedsByRequetedTime
  };
  // extimation output for SevereImpact
  const severeImpact = {
    currentlyInfected: severeImpactCurrentlyInfected,
    infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
    severeCasesByRequestedTime: severeImpactCasesByRequestedTime,
    hospitalBedsByRequetedTime: severeImpacthospitalBedsByRequetedTime
  };

  const input = data;
  return {
    data: input,
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
