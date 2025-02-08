// Adicionar um novo checklist
const { CheckList, veiculos } = require("../models/checkListModels"); // Importação correta
const Motoristadehoje = require("../models/motoristaModels")


// exports.addCheckList = async (req, res) => {
//     try {
//         const {
//             veiculo,limpesaDoVeiculo, oleoMotor, aguaRadiador, transmissao, freios, pneusDianteiro, 
//             pneusTraseiros,farolDireito, farolEsquerdo, lanternaDireita, lanternaEsquerda,
//             arCondicionado, observacao, motorista // Incluindo motorista
//         } = req.body;

//         // Verificação de campos obrigatórios
//         if (!veiculo || !limpesaDoVeiculo || !motorista || !oleoMotor || !aguaRadiador || !transmissao || !freios || !pneusDianteiro || 
//             !pneusTraseiros || !farolDireito || !farolEsquerdo || !lanternaDireita || !lanternaEsquerda || !arCondicionado) {
//             return res.status(400).json({ msg: "Todos os campos obrigatórios devem ser preenchidos!" });
//         }

//         if (!veiculos.includes(veiculo)) {
//             return res.status(400).json({ msg: `O veículo '${veiculo}' não é válido!` });
//         }

//             // Verifica se uma imagem foi enviada no request
//     if (!req.file || !req.file.filename) {
//         return res.status(400).json({ msg: 'Imagem do produto é obrigatória' });
//     }


//         // Criando novo checklist
//         const novoCheckList = new CheckList({
//             veiculo, limpesaDoVeiculo, motorista, oleoMotor, aguaRadiador, transmissao, freios, pneusDianteiro, pneusTraseiros,
//             farolDireito, farolEsquerdo, lanternaDireita, lanternaEsquerda, arCondicionado,
//             observacao: observacao || "", foto: req.file.filename, // Garante que observação não seja undefined
//         });

//         await novoCheckList.save();
//         return res.status(201).json({ msg: "Checklist salvo com sucesso!", checkList: novoCheckList });

//     } catch (error) {
//         console.error("Erro ao salvar checklist:", error);
//         return res.status(500).json({ msg: "Erro ao salvar o checklist", error: error.message });
//     }
// };

exports.addCheckList = async (req, res) => {
    try {
        const {
            veiculo, limpesaDoVeiculo, oleoMotor, aguaRadiador, transmissao, freios, pneusDianteiro, 
            pneusTraseiros, farolDireito, farolEsquerdo, lanternaDireita, lanternaEsquerda,
            arCondicionado, observacao, motorista
        } = req.body;

        // Lista de veículos válidos
        const veiculosValidos = ["S-10", "Estrada", "Fiorino", "Gol preto",  "L-200"];
        if (!veiculosValidos.includes(veiculo)) {
            return res.status(400).json({ msg: `O veículo '${veiculo}' não é válido!` });
        }

        // Verificação de campos obrigatórios
        if (!veiculo || !limpesaDoVeiculo || !motorista || !oleoMotor || !aguaRadiador || !transmissao || !freios || !pneusDianteiro || 
            !pneusTraseiros || !farolDireito || !farolEsquerdo || !lanternaDireita || !lanternaEsquerda || !arCondicionado) {
            return res.status(400).json({ msg: "Todos os campos obrigatórios devem ser preenchidos!" });
        }

        // Verifica se uma imagem foi enviada
        const foto = req.file ? req.file.filename : null;
        if (foto) {
            return res.status(400).json({ msg: 'Imagem do produto é obrigatória' });
        }

        // Criando novo checklist
        const novoCheckList = new CheckList({
            veiculo, limpesaDoVeiculo, motorista, oleoMotor, aguaRadiador, transmissao, freios, pneusDianteiro, pneusTraseiros,
            farolDireito, farolEsquerdo, lanternaDireita, lanternaEsquerda, arCondicionado,
            observacao: observacao || "", foto
        });

        await novoCheckList.save();
        return res.status(201).json({ msg: "Checklist salvo com sucesso!", checkList: novoCheckList });

    } catch (error) {
        console.error("Erro ao salvar checklist:", error);
        return res.status(500).json({ msg: "Erro ao salvar o checklist", error: error.message });
    }
};

// Listar todos os checklists
exports.listarCheckLists = async (req, res) => {
    try {
        const checkLists = await CheckList.find();
        res.status(200).json(checkLists);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar os checklists", error: error.message });
    }
};

// Buscar checklist específico pelo veículo
exports.buscarCheckListPorVeiculo = async (req, res) => {
    const { veiculo } = req.params;

    try {
        const checkList = await CheckList.findOne({ veiculo });

        if (!checkList) {
            return res.status(404).json({ msg: "Checklist para este veículo não encontrado!" });
        }

        res.status(200).json(checkList);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar o checklist", error: error.message });
    }
};

// Atualizar um checklist
exports.atualizarCheckList = async (req, res) => {
    const { veiculo } = req.params;
    const dadosAtualizados = req.body;

    try {
        const checkListAtualizado = await CheckList.findOneAndUpdate(
            { veiculo },
            dadosAtualizados,
            { new: true }
        );

        if (!checkListAtualizado) {
            return res.status(404).json({ msg: "Checklist não encontrado para atualização!" });
        }

        res.status(200).json({ msg: "Checklist atualizado com sucesso!", checkList: checkListAtualizado });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar o checklist", error: error.message });
    }
};

// Deletar um checklist pelo veículo
// exports.deletarCheckList = async (req, res) => {
//     const { veiculo } = req.params;

//     try {
//         const checkListDeletado = await CheckList.findOneAndDelete({ veiculo });

//         if (!checkListDeletado) {
//             return res.status(404).json({ msg: "Checklist não encontrado para deletar!" });
//         }

//         res.status(200).json({ msg: "Checklist removido com sucesso!", checkListDeletado });
//     } catch (error) {
//         res.status(500).json({ msg: "Erro ao deletar o checklist", error: error.message });
//     }
// };

exports.deletarCheckList = async (req, res) => {
    const { id } = req.params; // Pegando o ID corretamente da URL
    const { senha } = req.body; // Pegando a senha do corpo da requisição

    const senhaCorreta = "1234"; // Senha fixa para teste (substitua por uma mais segura)

    try {
        if (!senha) {
            return res.status(400).json({ msg: "Senha obrigatória!" });
        }

        if (senha !== senhaCorreta) {
            return res.status(401).json({ msg: "Senha incorreta! Ação não permitida." });
        }

        const checkListDeletado = await CheckList.findByIdAndDelete(id);

        if (!checkListDeletado) {
            return res.status(404).json({ msg: "Checklist não encontrado para deletar!" });
        }

        res.status(200).json({ msg: "Checklist removido com sucesso!", checkListDeletado });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar o checklist", error: error.message });
    }
};

