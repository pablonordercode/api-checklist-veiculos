const UsuarioCadastrar = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || " ";

exports.adduser = async (req, res) => {
    const { nome, password } = req.body;

    if (!nome || !password) {
        return res.status(400).send({ msg: "Todos os campos devem ser preenchidos!" });
    }

    const usuarioExiste = await UsuarioCadastrar.findOne({ nome });
    if (usuarioExiste) {
        return res.status(422).json({ msg: "Usuário já cadastrado!" });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(password, salt);

    const criarUsuario = new UsuarioCadastrar({
        nome,
        password: senhaHash,
    });

    try {
        await criarUsuario.save();
        return res.status(201).json({ msg: "Usuário criado com sucesso!!!" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { nome, password } = req.body;

    if (!nome || !password) {
        return res.status(400).json({ msg: "Nome e senha são obrigatórios!" });
    }

    try {
        const user = await UsuarioCadastrar.findOne({ nome });
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Senha inválida!" });
        }

        const token = jwt.sign({ id: user._id, nome: user.nome }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            msg: "Login bem-sucedido!",
            user: { id: user._id, nome: user.nome },
            token
        });
    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ msg: "Erro no servidor, tente novamente mais tarde." });
    }
};

exports.buscarTodosUsuarios = async (req, res) => {
    try {
        const pegaAllUsers = await UsuarioCadastrar.find().sort({ createdAt: -1 });
        res.status(200).json(pegaAllUsers);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar usuários" });
    }
};

exports.buscarUsuarioId = async (req, res) => {
    try {
        const user = await UsuarioCadastrar.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar usuário" });
    }
};

exports.editarUser = async (req, res) => {
    try {
        const editUser = await UsuarioCadastrar.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!editUser) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }
        res.status(200).json(editUser);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao editar usuário" });
    }
};

exports.deletarUsuario = async (req, res) => {
    try {
        const removerUsuario = await UsuarioCadastrar.findByIdAndDelete(req.params.id);
        if (!removerUsuario) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }
        res.status(200).json({ msg: "Usuário deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar usuário" });
    }
};
