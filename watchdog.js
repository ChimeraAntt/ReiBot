const { spawn } = require('child_process');

// loop that spawns the process and restarts it if it dies unless it errors 5 times in a row
// or if the process exits with code 0
function spawnProcess() {
    const child = spawn('node', ['index.js'], {
        cwd: __dirname,
        stdio: 'inherit',
    });
    
    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        if (code == 0) {
            return;
        }
        spawnProcess();
    });
}

spawnProcess();