import { Intern } from "../Model/internModel.js";
import path from 'path';
import fs from 'fs/promises';

export const updateIntern = async (req, res) => {
  try {
    const { id, name, performance, contactNumber, email } = req.body;
    console.log(req.body)
    
    if (!id) {
      return res.status(400).json({ message: "Intern ID is required", success: false });
    }

    const updateFields = { name, performance, contactNumber, email };
    const existingIntern = await Intern.findOne({ id });

    if (!existingIntern) {
      return res.status(404).json({ message: "Intern not found", success: false });
    }

    if (req.files) {
      for (const fieldName of ['offerLetter', 'certificate', 'lor']) {
        if (req.files[fieldName]) {
          const tempFilePath = req.files[fieldName][0].path;
          const targetDir = path.join('Documents', fieldName === 'lor' ? 'LOR' : `${fieldName}s`);
          const targetFilePath = path.join(targetDir, `${id}${path.extname(tempFilePath)}`);

          // Ensure target directory exists
          await fs.mkdir(targetDir, { recursive: true });

          // Remove existing file if any
          try {
            const files = await fs.readdir(targetDir);
            for (const file of files) {
              if (file.startsWith(id)) {
                await fs.unlink(path.join(targetDir, file));
              }
            }
          } catch (err) {
            console.error(`Error removing existing file: ${err}`);
          }

          // Move file from temp to target directory
          await fs.rename(tempFilePath, targetFilePath);

          // Update database field
          updateFields[`${fieldName}Path`] = targetFilePath;
        }
      }
    }

    const updatedIntern = await Intern.findOneAndUpdate({ id }, updateFields, { new: true });

    if (!updatedIntern) {
      return res.status(500).json({ message: "Failed to update intern", success: false });
    }

    return res.status(200).json({ success: true, internDetails: updatedIntern });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
