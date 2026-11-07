# EC02---Funcionarios

## Startup Tech – Sistema de Gestão de Funcionários (EC02)

Sistema em HTML + JavaScript puro para **cadastrar, listar, alterar, excluir** funcionários e gerar **relatórios com streams JS**.

| Pasta | Exercício | Conceitos |
|---|---|---|
| `funcionario.js` | Classe compartilhada | atributos privados, construtor, get/set, `atualizar()`, `toString()` |
| `ex01 - Cadastro/` | Cadastro e listagem | formulário, classe, array de objetos, evento de clique |
| `ex02 - Editar-Excluir/` | Excluir e alterar | `onclick` com funções anônimas, atualização via métodos da classe |
| `ex03 - ArrowFunctions/` | Funções anônimas e lambda | `addEventListener`, arrow functions para busca/remoção/atualização, comparação tradicional x arrow |
| `ex04 - Relatorios/` | Relatórios | `filter`, `map`, `reduce`, `new Set()` |

## Rodar com Docker
```bash
docker compose up -d        # http://localhost:8081
docker compose down
```
ou
```bash
docker build -t startup-funcionarios .
docker run -d -p 8081:80 startup-funcionarios
```