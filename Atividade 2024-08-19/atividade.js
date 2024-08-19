const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let produtos = [];
let nextId = 1;

// Função utilitária para encontrar um produto por ID
function findProdutoById(id) {
  return produtos.find(produto => produto.id === id);
}

// POST: Cadastrar produto
app.post('/produtos', (req, res) => {
  try {
    const { nome, marca, preco, quantidadeEstoque, categoria, avaliacoes } = req.body;
    const novoProduto = {
      id: nextId++,
      nome,
      marca,
      preco,
      quantidadeEstoque,
      categoria,
      avaliacoes: avaliacoes || [],
      dataCadastro: new Date()
    };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar produto', erro: error.message });
  }
});

// DELETE: Deletar produto
app.delete('/produtos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    produtos = produtos.filter(produto => produto.id !== id);
    res.status(200).json({ mensagem: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar produto', erro: error.message });
  }
});

// GET: Listar todos os produtos com filtros e ordenação
app.get('/produtos', (req, res) => {
  try {
    let resultado = [...produtos];
    const { nome, precoMax, mediaAvaliacao, ordenarPor, ordem } = req.query;

    // Filtros
    if (nome) {
      resultado = resultado.filter(produto => produto.nome.toLowerCase().includes(nome.toLowerCase()));
    }
    if (precoMax) {
      resultado = resultado.filter(produto => produto.preco <= parseFloat(precoMax));
    }
    if (mediaAvaliacao) {
      resultado = resultado.filter(produto => {
        const media = produto.avaliacoes.reduce((acc, nota) => acc + nota, 0) / produto.avaliacoes.length;
        return media >= parseFloat(mediaAvaliacao);
      });
    }

    // Ordenação
    if (ordenarPor) {
      resultado.sort((a, b) => {
        if (ordem === 'desc') {
          return b[ordenarPor] > a[ordenarPor] ? 1 : -1;
        } else {
          return a[ordenarPor] > b[ordenarPor] ? 1 : -1;
        }
      });
    }

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar produtos', erro: error.message });
  }
});

// GET: Buscar produto por ID
app.get('/produtos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const produto = findProdutoById(id);
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar produto', erro: error.message });
  }
});

// PUT: Atualizar todos dados de um produto com base no seu ID
app.put('/produtos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let produto = findProdutoById(id);
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    const { nome, marca, preco, quantidadeEstoque, categoria, avaliacoes } = req.body;
    produto = {
      id,
      nome,
      marca,
      preco,
      quantidadeEstoque,
      categoria,
      avaliacoes: avaliacoes || [],
      dataCadastro: produto.dataCadastro
    };

    produtos = produtos.map(p => p.id === id ? produto : p);
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar produto', erro: error.message });
  }
});

// PATCH: Atualizar o preço de um produto com base no seu ID aplicando uma redução de X%
app.patch('/produtos/:id/preco', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { percentualReducao } = req.body;

    let produto = findProdutoById(id);
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    produto.preco = produto.preco - (produto.preco * (percentualReducao / 100));
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar preço do produto', erro: error.message });
  }
});

// PATCH: Atualizar o estoque de um produto com base no seu ID para reduzir ou aumentar em X
app.patch('/produtos/:id/estoque', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { quantidade } = req.body;

    let produto = findProdutoById(id);
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    produto.quantidadeEstoque += quantidade;
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar estoque do produto', erro: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
