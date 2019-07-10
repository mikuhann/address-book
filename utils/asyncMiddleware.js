const asyncMiddleware = (fn) => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(
      (next) => {
        console.error(next.message);
        res.status(500).send('Server Error')});

module.exports = asyncMiddleware;