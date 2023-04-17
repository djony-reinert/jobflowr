const { spawn } = require("child_process");

// Run the gen_enums.rb script with the provided arguments
const runScript = (scriptPath, args) => {
  return new Promise((resolve, reject) => {
    const child = spawn("ruby", [scriptPath, ...args]);

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Script ${scriptPath} exited with code ${code}`));
        return;
      }
      resolve();
    });
  });
};

// Execute the gen_enums.rb script
runScript("path/to/gen_enums.rb", ["path/to/enums_folder"])
  .then(() => {
    console.log("Enums generated successfully!");
  })
  .catch((err) => {
    console.error("Error generating enums:", err);
  });
