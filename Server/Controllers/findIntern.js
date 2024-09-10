import { Intern } from "../Model/internModel.js";

export const findIntern = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("Received InternId:", id);

    if (!id) {
      return res.status(400).json({ message: "Please enter a unique ID", success: false });
    }

    const internExist = await Intern.findOne({id});
    console.log("Intern found:", internExist);

    if (!internExist) {
      return res.status(400).json({ message: "Please enter a valid ID", success: false });
    }

    return res.status(200).json({ success: true, internDetails: internExist });

  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
