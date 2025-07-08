const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const upload = require('../middlewares/upload');

router.post('/', upload.fields([{ name: 'image' }, { name: 'icon' }]), serviceController.createService);
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.put('/:id', upload.fields([{ name: 'image' }, { name: 'icon' }]), serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
