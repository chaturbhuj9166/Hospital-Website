import Report from "../adminModels/reportModel.js";
import fs from "fs";

// ✅ UPLOAD REPORT
export const uploadReport = async (req, res) => {
  try {
    const { category, patientName, description } = req.body;
    const files = req.files || [];

    let images = [];
    let pdf = "";
    let pdfCount = 0;

    files.forEach((file) => {
      if (file.mimetype.startsWith("image")) {
        images.push(file.path);
      } else if (file.mimetype === "application/pdf") {
        pdf = file.path;
        pdfCount++;
      }
    });

    // validation
    if (images.length > 4 || pdfCount > 1) {
      return res.status(400).json({
        message: "Max 4 images & 1 PDF allowed",
      });
    }

    const report = await Report.create({
      patientName,
      description,
      category,
      images,
      pdf,
    });

    res.json({ message: "Uploaded", report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET ALL REPORTS
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET SINGLE REPORT
export const getSingleReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE REPORT (MULTI FILE SUPPORT)
export const updateReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const files = req.files || [];

    // 🔥 DEBUG
    console.log("FILES:", files);

    // 🔥 agar new files aaye
    if (files.length > 0) {
      
      // old delete
      if (report.images) {
        report.images.forEach((img) => fs.unlink(img, () => {}));
      }
      if (report.pdf) {
        fs.unlink(report.pdf, () => {});
      }

      let images = [];
      let pdf = "";

      files.forEach((file) => {
        if (file.mimetype.startsWith("image")) {
          images.push(file.path);
        } else if (file.mimetype === "application/pdf") {
          pdf = file.path;
        }
      });

      report.images = images;
      report.pdf = pdf;
    }

    // 🔥 update fields
    report.patientName = req.body.patientName || report.patientName;
    report.description = req.body.description || report.description;
    report.category = req.body.category || report.category;

    const updated = await report.save();

    res.json({ message: "Updated", updated });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ DELETE REPORT
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // delete images
    if (report.images && report.images.length > 0) {
      report.images.forEach((img) => {
        fs.unlink(img, (err) => {
          if (err) console.log(err);
        });
      });
    }

    // delete pdf
    if (report.pdf) {
      fs.unlink(report.pdf, (err) => {
        if (err) console.log(err);
      });
    }

    await report.deleteOne();

    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
