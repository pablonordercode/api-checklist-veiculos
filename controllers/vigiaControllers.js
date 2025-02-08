const VigiaHoje = require("../models/vigiaModels");

// Adicionar um novo motorista
exports.addVigia = async (req, res) => {
    const { namevigia } = req.body;

    if (!namevigia) {
        return res.status(400).json({ msg: "O nome do vigia é obrigatório!" });
    }

    try {
        // Verifica se o motorista já existe
        const vigiaExistente = await VigiaHoje.findOne({ namevigia });
        if (vigiaExistente) {
            return res.status(400).json({ msg: "Vigia já registrado!" });
        }

        const novoVigia = new VigiaHoje({ namevigia });
        await novoVigia.save();
        res.status(201).json({ msg: "Vigia registrado com sucesso!", vigia: novoVigia });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao registrar o Vigia", error: error.message });
    }
};

// Listar todos os Vigias
exports.listarVigias = async (req, res) => {
    try {
        const vigias = await VigiaHoje.find();
        res.status(200).json(vigias);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar vigia", error: error.message });
    }
};

// Buscar motorista específico pelo nome
exports.buscarMotoristaPorNome = async (req, res) => {
    const { nome } = req.params;

    try {
        const motorista = await VigiaHoje.findOne({ nome });

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
    const { nome } = req.params;

    try {
        const motoristaDeletado = await VigiaHoje.findOneAndDelete({ nome });

        if (!motoristaDeletado) {
            return res.status(404).json({ msg: "Motorista não encontrado para deletar!" });
        }

        res.status(200).json({ msg: "Motorista removido com sucesso!", motoristaDeletado });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar o motorista", error: error.message });
    }
};
