const fs = require("fs");
const path = require("path");
const cron = require("node-cron");

// Define file categories and their extensions
const categories = {
  images: [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg", ".webp"],
  pdfs: [".pdf"],
  videos: [".mp4", ".mkv", ".avi", ".mov", ".wmv"],
};

// Get file category by extension
function getFileCategory(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  for (const [category, extensions] of Object.entries(categories)) {
    if (extensions.includes(ext)) return category;
  }
  return "others"; // Default to 'others'
}

// Organize files into categories
function organizeDownloads(downloadDir) {
  // Ensure the directory exists
  if (!fs.existsSync(downloadDir)) {
    console.error(`Directory ${downloadDir} does not exist!`);
    return;
  }

  // Get all files in the folder
  const files = fs.readdirSync(downloadDir);

  files.forEach((file) => {
    const filePath = path.join(downloadDir, file);

    // Skip directories
    if (fs.lstatSync(filePath).isDirectory()) return;

    // Get file category
    const category = getFileCategory(file);

    // Create category folder if it doesn't exist
    const categoryDir = path.join(downloadDir, category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir);
    }

    // Move the file to the category folder
    const newFilePath = path.join(categoryDir, file);
    fs.renameSync(filePath, newFilePath);

    console.log(`Moved: ${file} -> ${category}/`);
  });
}

// Check for folder argument
const folderPath = process.argv[2]; // Get the folder path from command-line arguments
if (!folderPath) {
  console.error("Please provide a folder to organize.");
  console.error("Usage: organizeDownloads <folder_path>");
  process.exit(1);
}

// Organize the specified folder
organizeDownloads(folderPath);
