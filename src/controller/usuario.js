const models = require("../models");

const tabelaUsuario = models.Usuario;
const endereco = models.Endereco

exports.listar = async (req, res) => {
  const usuarios = await tabelaUsuario.findAll(
    {
    include: ["enderecos","pedidos"]
  }
  );

  return res.json(usuarios);
};

exports.criar = async (req, res) => {
  const usuario = await tabelaUsuario.create(req.body);

  return res.json(usuario);
};

exports.deletar = async (req, res) => {
  const variavel = await tabelaUsuario.findAll({
    where: {
      id: req.params.id,
    },
  });
  console.log(variavel.length);
  if (variavel.length !== 0) {
    const usuario = await tabelaUsuario.destroy({
      where: { id: req.params.id },
    });
    return res.json({ mensage: "Deletado" });
  } else {
    return res.json({ Mensage: "Comando inválido" });
  }
};

exports.alterar = async (req, res) => {
  const variavel = await tabelaUsuario.findAll({
    where: {
      id: req.params.item,
    },
  });
  if (variavel.length !== 0) {
    const usuario = await tabelaUsuario.update(
      {
        nome: req.body.nome,
        login: req.body.login,
        senha: req.body.senha,
      },
      {
        where: {
          id: req.params.item,
        },
      }
    );
    return res.json({ message: "alterado" });
  } else {
    return res.json({ mensage: "comando inválidos" });
  }
};
