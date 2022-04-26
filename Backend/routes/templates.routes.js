const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

const templatesController = require('../controllers/templates_controller');

// Para Template

router.use('/listaTemplates', isAuth, templatesController.listado);
router.post('/deletePregunta=:idPregunta', isAuth, templatesController.delete_pregunta);

router.get('/template=:idTemplate', isAuth, templatesController.getTemplate);
router.post('/template=:idTemplate', isAuth, templatesController.post_preguntas);
router.get('/editPregunta=:idPregunta', isAuth, templatesController.getEditPregunta);
router.post('/editPregunta=:idPregunta', templatesController.updatePregunta);

module.exports = router;