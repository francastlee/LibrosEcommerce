const checkRole = (rolRequired) => {
  return (req, res, next) => {
    if (req.usuario?.rol !== rolRequired) {
      return res.status(403).json({ error: 'Acceso no autorizado' });
    }
    next();
  };
};

export default checkRole;