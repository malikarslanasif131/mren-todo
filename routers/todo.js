const express = require("express");

const router = express.Router();

const {
        getAllTodo,
        getOneTodo,
        postCreateTodo,
        putUpdateTodo,
        deleteTodo,
        getSearchTodo,
} = require("../controllers/todo");


router.get('/', getAllTodo);
router.get('/:id', getOneTodo);

router.get('/search/:key', getSearchTodo);

router.post('/', postCreateTodo);
router.put('/:id', putUpdateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;