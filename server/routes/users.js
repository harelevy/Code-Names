var express = require('express');
var router = express.Router();

/* GET all users. */
router.get('/', async function (req, res, next) {
  try {
    const users = await User.find();
    res.json(users);
  }
  catch (err) {
    res.json({ message: err });
  }
});
// POST a new user 
router.post('/', async (req, res) => {
  const user = new User({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName

  });
  try {

    const savedPost = await user.save();
    res.json(savedPost);
  }
  catch (err) {
    res.json({ message: err });
  }

});
// GET specific user by Id
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  }
  catch (err) {
    res.json({ message: err });
  }

});
//DELETE a specific user
router.delete('/:userId', async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userId });
    res.json(removedUser);
  }
  catch (err) {
    res.json({ message: err });
  }

});
//UPDATE the last name of existing user
router.patch('/:userId', async (req, res) => {
  try {
    const updatedPost = await User.updateOne(
      { _id: req.params.userId },
      { $set: { LastName: req.body.LastName } });
    res.json(updatedPost);
  }
  catch (err) {
    res.json({ message: err });
  }

});

module.exports = router;
