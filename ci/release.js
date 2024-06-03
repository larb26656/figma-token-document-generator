const tar = require("tar");
const fs = require("fs");
const path = require("path");

// Function to create tar.gz archive
const createTarGz = () => {
  const outputFilePath = path.join(__dirname, "../release", "plugin.tar.gz");
  const sourceDir = path.join(__dirname, "../");

  return tar
    .c(
      {
        gzip: true,
        file: outputFilePath,
        cwd: sourceDir,
      },
      [
        "manifest.json", // Use relative paths here
        "dist",
      ]
    )
    .then(() => {
      console.log(`Created tar.gz file at ${outputFilePath}`);
      return outputFilePath;
    })
    .catch((err) => {
      console.error("Error creating tar.gz file:", err);
      throw err;
    });
};

// Ensure the release directory exists
const ensureReleaseDir = () => {
  const releaseDir = path.join(__dirname, "../release");
  if (!fs.existsSync(releaseDir)) {
    fs.mkdirSync(releaseDir);
  }
  return releaseDir;
};

// Main function to orchestrate the release process
const release = async () => {
  try {
    ensureReleaseDir();
    await createTarGz();
    console.log("Release process completed successfully.");
  } catch (error) {
    console.error("Release process failed:", error);
  }
};

// Run the release process
release();
