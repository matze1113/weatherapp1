const { exec } = require('child_process');

// Funktion zum Ausführen des Snyk-Scans
const runSnykScan = () => {
  return new Promise((resolve, reject) => {
    // Snyk-Befehl zum Scannen der Anwendung ausführen
    exec('npx snyk test', (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      // Wenn Sicherheitsprobleme gefunden wurden, geben Sie eine Fehlermeldung aus
      if (stdout.includes('Tested')) {
        if (stdout.includes('Vulnerabilities found')) {
          reject(new Error('Security vulnerabilities found'));
          return;
        }
      }
      resolve();
    });
  });
};

// Test ausführen
runSnykScan()
  .then(() => {
    console.log('Snyk test passed! No security vulnerabilities found.');
    process.exit(0); // Exit-Code 0 für erfolgreichen Test
  })
  .catch((error) => {
    console.error('Snyk test failed:', error.message);
    process.exit(1); // Exit-Code 1 für fehlgeschlagenen Test
  });
