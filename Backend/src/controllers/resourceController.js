const path = require("path");
const fs = require("fs");
const Resource = require("../models/resourceModel");

class ResourceController {
  static async uploadResource(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const metadata = {
        originalName: req.file.originalname,
        storedName: req.file.filename,
        path: req.file.path,
        mimeType: req.file.mimetype,
        size: req.file.size,
        subject: req.body.subject || "General",
        level: req.body.level || "Any",
        displayName: req.body.displayName || req.file.originalname,
        description: req.body.description || "",
        fileType: path.extname(req.file.originalname).toLowerCase(),
        uploadDate: new Date(),
      };

      const id = await Resource.saveMetadata(metadata);
      res.status(201).json({ message: "File uploaded", id, metadata });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async downloadResource(req, res) {
    const fileQuery = req.body.originalName;

    try {
      const metadata = await Resource.getMetadataByOriginalName(fileQuery);
      const filePath = path.join(__dirname, "../../uploads", metadata.storedName);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found on server" });
      }

      res.download(filePath, metadata.originalName);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getAllResources(req, res) {
    try {
      const resources = await Resource.getAll();
      res.status(200).json(resources);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async filterResources(req, res) {
    const { subject, level, fileType, displayName } = req.body;

    try {
      const filters = { subject, level, fileType, displayName };
      const resources = await Resource.getFiltered(filters);
      res.status(200).json(resources);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ResourceController;
