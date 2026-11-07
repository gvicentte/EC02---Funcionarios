// Exercício 3 - Funções anônimas (eventos) + arrow functions / lambdas (manipulação do array)
let funcionarios = [];
let idEmEdicao = null;

const btnCadastrar = document.getElementById("btnCadastrar");
const btnCancelar = document.getElementById("btnCancelar");
const tbody = document.getElementById("tabelaFuncionarios");

/* =====================================================================
   COMPARAÇÃO: função anônima tradicional  x  arrow function (lambda)
   ---------------------------------------------------------------------
   Tradicional:
     const buscarPorIdAntigo = function (id) {
       return funcionarios.find(function (f) { return f.id === id; });
     };

   Arrow function (mesma lógica):
     const buscarPorId = (id) => funcionarios.find((f) => f.id === id);

   Diferenças: sintaxe menor, retorno implícito quando é uma expressão só,
   e a arrow não tem o próprio "this" (herda do escopo onde foi criada).
   ===================================================================== */
const buscarPorIdAntigo = function (id) {
    return funcionarios.find(function (f) { return f.id === id; });
};

// ---------- Arrow functions de manipulação ----------
const buscarPorId = (id) => funcionarios.find((f) => f.id === id);
const buscarPorNome = (nome) => funcionarios.filter((f) =>
    f.nome.toLowerCase().includes(nome.toLowerCase()));
const adicionar = (f) => funcionarios.push(f);
const remover = (id) => { funcionarios = funcionarios.filter((f) => f.id !== id); };
const atualizar = (id, d) => {
    const f = buscarPorId(id);
    if (f) f.atualizar(d.nome, d.idade, d.cargo, d.salario);   // método da classe
    return f;
};

const lerFormulario = () => ({
    nome: document.getElementById("nome").value.trim(),
    idade: document.getElementById("idade").value,
    cargo: document.getElementById("cargo").value.trim(),
    salario: document.getElementById("salario").value
});

const formularioValido = (d) => Object.values(d).every((v) => v !== "");

const limparFormulario = () => {
    document.getElementById("formFuncionario").reset();
    idEmEdicao = null;
    btnCadastrar.textContent = "Cadastrar";
    btnCancelar.hidden = true;
};

const carregarNoFormulario = (f) => {
    document.getElementById("nome").value = f.nome;
    document.getElementById("idade").value = f.idade;
    document.getElementById("cargo").value = f.cargo;
    document.getElementById("salario").value = f.salario;
    idEmEdicao = f.id;
    btnCadastrar.textContent = "Salvar alteração";
    btnCancelar.hidden = false;
};

const listarFuncionarios = () => {
    tbody.innerHTML = funcionarios.map((f) => `
    <tr>
      <td>${f.id}</td><td>${f.nome}</td><td>${f.idade}</td>
      <td>${f.cargo}</td><td>${f.salarioFormatado()}</td>
      <td>
        <button data-acao="editar" data-id="${f.id}">Editar</button>
        <button data-acao="excluir" data-id="${f.id}">Excluir</button>
      </td>
    </tr>`).join("");
};

// ---------- Eventos com funções anônimas ----------
btnCadastrar.addEventListener("click", function () {
    const d = lerFormulario();
    if (!formularioValido(d)) { alert("Preencha todos os campos!"); return; }

    if (idEmEdicao === null) {
        const novo = new Funcionario(d.nome, d.idade, d.cargo, d.salario);
        adicionar(novo);
        console.log("Cadastrado:", novo.toString());
    } else {
        console.log("Atualizado:", atualizar(idEmEdicao, d).toString());
    }
    limparFormulario();
    listarFuncionarios();
});

btnCancelar.addEventListener("click", function () { limparFormulario(); });

// Um único listener na tabela atende Editar e Excluir (delegação de eventos)
tbody.addEventListener("click", function (e) {
    const id = Number(e.target.dataset.id);
    const acao = e.target.dataset.acao;
    if (!acao) return;

    const f = buscarPorId(id);
    if (acao === "editar") carregarNoFormulario(f);
    if (acao === "excluir" && confirm(`Excluir ${f.nome}?`)) {
        remover(id);
        if (idEmEdicao === id) limparFormulario();
        console.log("Excluído:", f.toString());
        listarFuncionarios();
    }
});

// Busca por ID ou nome
document.getElementById("btnBuscar").addEventListener("click", function () {
    const termo = document.getElementById("txtBusca").value.trim();
    const saida = document.getElementById("resultadoBusca");
    if (termo === "") { saida.textContent = "Digite um nome ou ID."; return; }

    const encontrados = isNaN(termo) ? buscarPorNome(termo) : [buscarPorId(Number(termo))].filter(Boolean);
    saida.innerHTML = encontrados.length
        ? encontrados.map((f) => f.toString()).join("<br>")
        : "Nenhum funcionário encontrado.";
});
