const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
    cep: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    // estado: {
    //     type: String,
    //     required: true
    // },
    bairro: {
        type: String,
        required: true
    },
    rua: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    complemento: {
        type: String,
        required: false
    }
});

const UserSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    enderecoPrincipal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AddressSchema",
        required: true
    }
    // enderecoSecundario: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "AddressSchema",
    //     required: false
    // }
});

module.exports = {
    User: mongoose.model("User", UserSchema),
    Address: mongoose.model("Address", AddressSchema)
};
