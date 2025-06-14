const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRoles = req.user?.roles;
    if (!userRoles || !userRoles.some(role => allowedRoles.includes(role))) {
      return res.status(403).json({ error: 'Acceso denegado: no tienes permisos' });
    }

    next();
  };
};

export default verifyRole;
