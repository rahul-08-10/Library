const Membership = require("../models/user");

const addMembership = async (req, res) => {
  try {
    const { userId, duration = "6 months" } = req.body;
    if (!["6 months", "1 year", "2 years"].includes(duration)) {
      return res.status(400).json({ message: "Invalid membership duration" });
    }
    const membership = new Membership({ userId, duration });
    await membership.save();
    res.json({ message: "Membership added successfully", membership });
  } catch (error) {
    res.status(500).json({ message: "Error adding membership", error });
  }
};

const updateMembership = async (req, res) => {
  try {
    const { membershipId, duration = "6 months" } = req.body;
    if (!membershipId) {
      return res.status(400).json({ message: "Membership ID is required" });
    }
    if (!["6 months", "1 year", "2 years"].includes(duration)) {
      return res.status(400).json({ message: "Invalid membership duration" });
    }
    const membership = await Membership.findByIdAndUpdate(membershipId, { duration }, { new: true });
    if (!membership) return res.status(404).json({ message: "Membership not found" });
    res.json({ message: "Membership updated successfully", membership });
  } catch (error) {
    res.status(500).json({ message: "Error updating membership", error });
  }
};

module.exports = {addMembership , updateMembership}