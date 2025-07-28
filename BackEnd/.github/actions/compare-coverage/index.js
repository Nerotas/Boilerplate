import { getInput, setOutput, setFailed } from '@actions/core';

try {
  const previousCoverage = JSON.parse(getInput('prevCoverage'));
  const currentCoverage = JSON.parse(getInput('currCoverage'));
  const compareBy = getInput('diffBy');
  const deviation = Number(getInput('deviation'));

  const currCoverageValue = Number(currentCoverage[compareBy]);
  const difference = currCoverageValue - Number(previousCoverage[compareBy]);
  const result = difference >= 0 - deviation ? 'success' : 'failure';
  const resultIcon = difference >= 0 - deviation ? '✅' : '❌';

  console.log(`Coverage difference is ${difference}, result: ${result}`);
  setOutput('coverageDiff', difference);
  setOutput('coverageResult', result);
  setOutput('coverageResultIcon', resultIcon);
  setOutput('currCoverageValue', currCoverageValue);
} catch (error) {
  setFailed(error.message);
}
