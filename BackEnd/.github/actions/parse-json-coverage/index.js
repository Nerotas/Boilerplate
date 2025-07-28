import { getInput, setOutput, setFailed } from '@actions/core';
import { readFileSync } from 'fs';

try {
  let coverageFileRaw;
  const input = getInput('coverageSummary');
  if (input) {
    coverageFileRaw = readFileSync(`${input}`);
  } else {
    coverageFileRaw = readFileSync('./coverage/coverage-summary.json');
  }
  console.log(`Coverage summary is ${coverageFileRaw}`);
  const coverageSummary = JSON.parse(coverageFileRaw);
  const linesCov = coverageSummary?.total?.lines?.pct || 0;
  const statementsCov = coverageSummary?.total?.statements?.pct || 0;
  const functionsCov = coverageSummary?.total?.functions?.pct || 0;
  const branchesCov = coverageSummary?.total?.branches?.pct || 0;
  const result = JSON.stringify({
    lines: linesCov,
    statements: statementsCov,
    functions: functionsCov,
    branches: branchesCov,
  });
  const resultTable = `| Lines | Statements | Functions | Branches |
  | - | - | - | - |
  | ${linesCov}% | ${statementsCov}% | ${functionsCov}% | ${branchesCov}% |`;
  console.log(result);
  setOutput('coverageResult', result);
  setOutput('coverageResultTable', resultTable);
} catch (error) {
  setFailed(error.message);
}
