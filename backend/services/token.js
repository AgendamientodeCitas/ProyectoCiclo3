const jwt = require('jsonwebtoken');
const models = require('../models');

const checkToken = async (token) => {
    let localID = null;
    try {
        const { _id } = await jwt.decode(token);
        localID = _id;
    } catch (error) {
        return false;
    }
    const user = await models.Usuario.findOne({
        
            _id: localID,
            codigoestado: 1
        
    });
    if (user) {
        const token = encode(user);
        return token;
    } else {
        return false;
    }
};


module.exports = {
    encode: async (user) => {
        const token = jwt.sign({
            _id: user._id,
            nombre: user.nombre,
            correo: user.correo,
            codigorol: user.codigorol
        }, 'EstaEsUnaFraseSecretarParaCodificar', {
                expiresIn: 86400,
            }
        );
        return token;
    },

    decode: async (token) => {
        try {
            const { _id } = await jwt.verify(token, 'EstaEsUnaFraseSecretarParaCodificar');
            const user = await models.Usuario.findOne({
                
                    _id: _id,
                    codigoestado: 1
                
            });
            if (user) {
                return user
            } else {
                return false;
            }
        } catch (error) {
            const newToken = await checkToken(token);
            return newToken;
        }
    }
}
