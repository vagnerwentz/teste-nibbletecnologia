const express = require("express");
const router = express.Router();
const { User, Address } = require("../../models/Cadastro.js");
const sgMail = require("@sendgrid/mail");
var SENDGRID_API_KEY = sgMail.setApiKey(SENDGRID_API_KEY); // Aqui precisa ser inserido um key do sendGrid

// Get all register
router.get("/", (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
        });
    Address.find()
        .then(address => {
            res.json(address);
        })
        .catch(err => {
            console.log(err);
        });
});

//  Create a register
router.post("/criarcadastro", async (req, res, next) => {
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const cep = req.body.cep;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const bairro = req.body.bairro;
    const rua = req.body.rua;
    const numero = req.body.numero;
    const complemento = req.body.complemento;

    newAddress = new Address({
        cep: cep,
        cidade: cidade,
        estado: estado,
        bairro: bairro,
        rua: rua,
        numero: numero,
        complemento: complemento
    });
    try {
        const savedAddress = await newAddress.save();
        res.json(savedAddress);
    } catch (err) {
        console.log(err);
    }

    newUser = new User({
        nome: nome,
        cpf: cpf,
        email: email,
        telefone: telefone,
        enderecoPrincipal: newAddress
    });
    try {
        const savedUser = await newUser.save();
        const msg = {
            // Como exemplo eu criei um email para ser enviado a ele mesmo quando o cadastro for estiver feito
            to: "wentz.vagner@gmail.com",
            from: "wentz.vagner@gmail.com", // Para fim de testes, usei o mesmo do gerente para ser enviado para ele mesmo
            subject: `Cadastro do ${nome} feito com sucesso!`,
            text: "and easy to do anywhere, even with node.js",
            html: `<strong>Estou indo pra SAS amanhã às 7:30h da manhã\n
            CPF: ${cpf}\n
            Telefone: ${telefone}\n
            CEP: ${cep}\n
            Cidade: ${cidade}\n
            Estado: ${estado}\n
            Bairro: ${bairro}\n
            Rua: ${rua}\n
            Número: ${numero}</strong>`
        };
        sgMail.send(msg);
        res.json(savedUser);
    } catch (err) {
        console.log(err);
    }
});

// To update a User
router.put("/editarcadastro/:id", async (req, res, next) => {
    // Grab the id of the user
    let id = req.params.id;
    // Find the User by id from the database
    try {
        const user = await User.findById(id);
        user.nome = req.body.nome;
        user.cpf = req.body.cpf;

        let idEndereco = user.enderecoPrincipal;

        const address = await Address.findById(idEndereco);
        address.cep = req.body.cep;
        address.cidade = req.body.cidade;
        address.estado = req.body.estado;
        address.bairro = req.body.bairro;
        address.rua = req.body.rua;
        address.numero = req.body.numero;
        address.complemento = req.body.complemento;

        await address.save();
        const savedUser = await user.save();
        res.send({ user: savedUser });
    } catch (err) {
        console.log(err);
    }
});

// Make a Delete Request
router.delete("/deletarcadastro/:id", async (req, res, next) => {
    let id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            res.send({ error: "ID do usuário não encontrado" });
            return;
        }
        const deletedUser = await user.delete();
        res.send({ user: deletedUser });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
