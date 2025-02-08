const Motoristadehoje  = require("../models/motoristaModels"); // Importando o modelo de motoristas

// Adicionar um novo motorista
exports.addMotorista = async (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ msg: "O nome do motorista é obrigatório!" });
    }

    try {
        // Verifica se o motorista já existe
        const motoristaExistente = await Motoristadehoje.findOne({ nome });
        if (motoristaExistente) {
            return res.status(400).json({ msg: "Motorista já registrado!" });
        }

        const novoMotorista = new Motoristadehoje({ nome });
        await novoMotorista.save();
        res.status(201).json({ msg: "Motorista registrado com sucesso!", motorista: novoMotorista });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao registrar o motorista", error: error.message });
    }
};

exports.editMotorista = async (req, res) => {
    const { id } = req.params; // ID do motorista
    const { nome } = req.body; // Novo nome do motorista

    if (!nome) {
        return res.status(400).json({ msg: "O nome do motorista é obrigatório!" });
    }

    try {
        const motorista = await Motoristadehoje.findById(id);
        
        if (!motorista) {
            return res.status(404).json({ msg: "Motorista não encontrado!" });
        }

        // Verifica se já existe outro motorista com o mesmo nome
        const motoristaExistente = await Motoristadehoje.findOne({ nome });
        if (motoristaExistente && motoristaExistente._id.toString() !== id) {
            return res.status(400).json({ msg: "Já existe um motorista com este nome!" });
        }

        motorista.nome = nome; // Atualiza o nome
        await motorista.save(); // Salva as alterações

        res.status(200).json({ msg: "Motorista atualizado com sucesso!", motorista });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao editar o motorista", error: error.message });
    }
};


// Listar todos os motoristas
exports.listarMotoristas = async (req, res) => {
    try {
        const motoristas = await Motoristadehoje.find();
        res.status(200).json(motoristas);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar motoristas", error: error.message });
    }
};

// Buscar motorista específico pelo nome
exports.buscarMotoristaPorNome = async (req, res) => {
    const { nome } = req.params;

    try {
        const motorista = await Motoristadehoje.findOne({ nome });

        if (!motorista) {
            return res.status(404).json({ msg: "Motorista não encontrado!" });
        }

        res.status(200).json(motorista);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar o motorista", error: error.message });
    }
};

// Deletar um motorista pelo nome
exports.deletarMotorista = async (req, res) => {
    const { id } = req.params; // Obtém o ID da URL

    try {
        const motoristaDeletado = await Motoristadehoje.findByIdAndDelete(id);

        if (!motoristaDeletado) {
            return res.status(404).json({ msg: "Motorista não encontrado para deletar!" });
        }

        res.status(200).json({ msg: "Motorista removido com sucesso!", motorista: motoristaDeletado });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar o motorista", error: error.message });
    }
};

