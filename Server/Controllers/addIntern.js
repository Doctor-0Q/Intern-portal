import { Intern } from "../Model/internModel.js";
import path from 'path';
import fs from 'fs/promises';

export const addIntern = async (req, res) => {
  try {
    const { id, name, performance, contactNumber, email, role } = req.body;
    
    if (!id) {
      return res.status(400).json({ message: "Intern ID is required", success: false });
    }

    if (!name) {
      return res.status(400).json({ message: "Intern name is required", success: false });
    }

    const existingIntern = await Intern.findOne({ id });
    if (existingIntern) {
      return res.status(400).json({ message: `Intern with this ID(${id}) already exists`, success: false });
    }

    const internData = { 
      id: id, 
      name: name, 
      performance: performance, 
      p_number: contactNumber, 
      email: email,
      role : role
    };

    if (req.files) {
      for (const fieldName of ['offerLetter', 'certificate', 'lor']) {
        if (req.files[fieldName]) {
          const tempFilePath = req.files[fieldName][0].path;
          const targetDir = path.join('Documents', fieldName === 'lor' ? 'LOR' : `${fieldName}s`);
          const targetFilePath = path.join(targetDir, `${id}${path.extname(tempFilePath)}`);

          await fs.mkdir(targetDir, { recursive: true });
          await fs.rename(tempFilePath, targetFilePath);

          internData[`${fieldName}Path`] = targetFilePath;
        }
      }
    }

    const newIntern = new Intern(internData);
    await newIntern.save();

    return res.status(201).json({ success: true, message: "Intern added successfully", internDetails: newIntern });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};