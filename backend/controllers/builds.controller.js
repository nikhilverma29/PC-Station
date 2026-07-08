import Joi from 'joi';
import Build from '../models/Build.js';

// ── Validation ────────────────────────────────────────────

const buildSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  selections: Joi.object({
    cpu: Joi.any().allow(null),
    gpu: Joi.any().allow(null),
    motherboard: Joi.any().allow(null),
    ram: Joi.any().allow(null),
    storage: Joi.any().allow(null),
    pccase: Joi.any().allow(null),
    psu: Joi.any().allow(null),
  }).required(),
  totalPrice: Joi.number().min(0).required(),
});

// ── Controllers ───────────────────────────────────────────

// GET /api/builds  — get all builds for logged-in user
export const getBuilds = async (req, res) => {
  try {
    const builds = await Build.find({ user: req.user.id })
      .sort({ updatedAt: -1 })
      .select('-__v');

    res.status(200).json({ count: builds.length, builds });
  } catch (error) {
    console.error('GetBuilds error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// POST /api/builds  — save a new build
export const createBuild = async (req, res) => {
  try {
    const { error } = buildSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, selections, totalPrice } = req.body;

    // Limit to 20 saved builds per user
    const buildCount = await Build.countDocuments({ user: req.user.id });
    if (buildCount >= 20) {
      return res.status(400).json({ message: 'Maximum of 20 saved builds reached. Delete an existing build to save a new one.' });
    }

    const build = await Build.create({
      user: req.user.id,
      name,
      selections,
      totalPrice,
    });

    res.status(201).json({ message: 'Build saved successfully.', build });
  } catch (error) {
    console.error('CreateBuild error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// PUT /api/builds/:id  — update an existing build
export const updateBuild = async (req, res) => {
  try {
    const { error } = buildSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const build = await Build.findOne({ _id: req.params.id, user: req.user.id });
    if (!build) {
      return res.status(404).json({ message: 'Build not found.' });
    }

    const { name, selections, totalPrice } = req.body;
    build.name = name;
    build.selections = selections;
    build.totalPrice = totalPrice;
    await build.save();

    res.status(200).json({ message: 'Build updated successfully.', build });
  } catch (error) {
    console.error('UpdateBuild error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// DELETE /api/builds/:id  — delete a build
export const deleteBuild = async (req, res) => {
  try {
    const build = await Build.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!build) {
      return res.status(404).json({ message: 'Build not found.' });
    }

    res.status(200).json({ message: 'Build deleted successfully.' });
  } catch (error) {
    console.error('DeleteBuild error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
