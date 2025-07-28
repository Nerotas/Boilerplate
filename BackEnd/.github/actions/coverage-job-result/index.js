import { getInput, setFailed } from '@actions/core';

try {
  const compareResult = getInput('compareResult');

  if (compareResult === 'failure') {
    setFailed("Coverage comparison check hasn't passed");
  }
} catch (error) {
  setFailed(error.message);
}
