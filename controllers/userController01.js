const UsuarioCadastrar = require("../models/userModels");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Importação do JWT para geração e validação de tokens
const jwt = require("jsonwebtoken");

// Chave secreta para o JWT, obtida do arquivo  .env ou um valor padrão vazio
const JWT_SECRET = process.env.JWT_SECRET || " ";





exports.adduser = async (req, res) => {
    const { nome, password } = req.body;

    if (!nome || !password) {
        return res.status(400).send({ msg: `Todos os campos devem ser preenchidos!` });
    }

    // Verificando se o nome do usuário já existe
    const usuarioExiste = await UsuarioCadastrar.findOne({ nome: nome });
    if (usuarioExiste) {
        return res.status(422).json({ msg: "Usuário já cadastrado!" });
    }

    // Criação de senha criptografada
    const crypto = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(password, crypto);

    // Criando um novo usuário
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

// Login Admin

exports.loginUser = async (req, res) => {
    const { nome, password } = req.body;

    // Verificação dos campos obrigatórios
    if (!nome || !password) {
        return res.status(400).json({ msg: "Nome e senha são obrigatórios!" });
    }

    try {
        // Buscar usuário pelo nome
        const user = await UsuarioCadastrar.findOne({ nome });

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        // Verificar se a senha está correta
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Senha inválida!" });
        }
        res.status(200).json({
            msg: "Login bem-sucedido!",
            user: { id: user._id, nome: user.nome }
        });
    } catch (error) { 
        console.error("Erro no login:", error);
        res.status(500).json({ msg: "Erro no servidor, tente novamente mais tarde." });
    }
};




exports.buscarTodosUsuarios = async (req, res) => {

    try {
        const pegaAllUsers = await UsuarioCadastrar.find().sort({ createdAt: -1 });
        res.status(201).json(pegaAllUsers)
    } catch (error) {
        console.log(error)
    }
}

exports.buscarUsuarioId = async (req, res) => {
    const id = req.params.id
    try {
        const pegaIdUser = await UsuarioCadastrar.findById(id)
        if (!pegaIdUser) {
            res.status(402).json({ msg: "Usuario não existe!" })
        }
        res.status(200).json(pegaIdUser)
    } catch (error) {
        console.log(error)
    }
}

exports.editarUser = async (req, res) => {
    try {
        const { id } = req.params
        const editUser = await UsuarioCadastrar.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(200).json(editUser)
    } catch (error) {
        console.log(error)
    }
}

exports.deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params
        const removerUsuario = await UsuarioCadastrar.findByIdAndDelete({ _id: id });
        res.status(200).json(removerUsuario) 
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}


