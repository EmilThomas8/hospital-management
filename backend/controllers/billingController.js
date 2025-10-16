// backend/controllers/billingController.js

import Bill from "../models/Bill.js";

// Create New Bill
export const addBill = async (req, res) => {
  try {
    const bill = await Bill.create(req.body);
    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Bills
export const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.findAll();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Bill
export const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findByPk(req.params.id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Bill
export const updateBill = async (req, res) => {
  try {
    const bill = await Bill.findByPk(req.params.id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });

    await bill.update(req.body);
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Bill
export const deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findByPk(req.params.id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });

    await bill.destroy();
    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
