import { Intern } from "../Model/internModel.js";

export const findIntern = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Please enter a unique ID", success: false });
    }

    const internExist = await Intern.findOne({id});

    if (!internExist) {
      return res.status(400).json({ message: "This intern does not exist", success: false });
    }

    return res.status(200).json({ success: true, internDetails: internExist });

  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
