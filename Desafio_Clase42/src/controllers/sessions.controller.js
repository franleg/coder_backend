const register = async (req, res) => {
    let user = req.user;
    res.status(200).send({status: 'success', payload: user});
}

const registerFail = (req, res) => {
    res.status(500).send({status: 'error', error: 'Error al registrarse'});
}

const login = (req, res) => {
    req.session.user = {
        id: req.user._id,
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        phone: req.user.phone,
        adress: req.user.adress,
        age: req.user.age,
        avatar: req.user.avatar,
        cart: req.user.cart,
        role: req.user.role
    }
    res.status(200).send({status: 'success', payload: req.session.user});
}

const loginFail = (req, res) => {
    res.status(500).send({status: 'error', error: 'Error al iniciar sessión'});
}

export default {
    register,
    registerFail,
    login,
    loginFail
}