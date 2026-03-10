const { execSync } = require('child_process');

try {
  require.resolve('localtunnel');
} catch (e) {
  console.log("Installing tunneling dependencies... (This only happens once)");
  execSync('npm install localtunnel --no-save', { stdio: 'inherit' });
}

const localtunnel = require('localtunnel');

(async () => {
  console.log("Connecting your Local DSA Platform to the World Wide Web...");
  
  try {
    // Port 3002 is where your active Next.js instance is running
    const tunnel = await localtunnel({ port: 3002 });
    
    // Log to file for AI retrieval
    require('fs').writeFileSync('url.txt', tunnel.url);
    
    console.log("\n========================================================");
    console.log("🚀 YOUR LIVE INTERACTIVE SITE IS READY!");
    console.log("Share this secure link with your friends anywhere:");
    console.log("👉  " + tunnel.url);
    console.log("========================================================\n");
    console.log("Note: Because this is a free developer tunnel, your friends will see a 'Friendly Warning' page first.");
    console.log("They just need to click the 'Click to Continue' button to access your site!\n");

    tunnel.on('close', () => {
      console.log("Live site tunnel closed.");
    });
    
    tunnel.on('error', (err) => {
      console.error("Tunnel error:", err);
    });

  } catch (err) {
    console.error("Failed to generate live URL. Ensure your internet connection is stable.", err);
  }
})();
