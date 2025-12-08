const STEP = 1; // quantos cards o carrossel avança por clique/autoplay
// Carrega os elementos do JSON e cria o carrossel
fetch('elementos.json')
    .then(response => response.json())
    .then(elementos => {
        criarCarrossel(elementos);
    })
    .catch(error => {
        console.error('Erro ao carregar elementos:', error);
    });

// Função para criar o carrossel
function criarCarrossel(elementos) {
    const carrossel = document.getElementById('carrossel');
    
    // Limpa o carrossel
    carrossel.innerHTML = '';
    
    // Cria um card para cada elemento
    elementos.forEach((elemento, index) => {
        const card = criarCard(elemento, index);
        carrossel.appendChild(card);
    });
}

// Função para criar um card de elemento
function criarCard(elemento, index) {
    const card = document.createElement('div');
    card.className = 'elemento-card';
    card.dataset.categoria = elemento.categoria;
    card.style.animationDelay = `${(index % 5) * 0.1}s`;
    
    card.innerHTML = `
        <div class="numero-atomico">#${elemento.numero}</div>
        <div class="simbolo">${elemento.simbolo}</div>
        <div class="nome-elemento">${elemento.nome}</div>
        <div class="massa-atomica">${elemento.massa}</div>
        <span class="categoria">${elemento.categoria}</span>
    `;
    
    // Adiciona evento de clique para abrir modal
    card.addEventListener('click', () => abrirModal(elemento));
    
    return card;
}

// Função para abrir modal com detalhes do elemento
function abrirModal(elemento) {
    // Cria ou obtém o modal
    let modal = document.getElementById('modal-elemento');
    
    if (!modal) {
        modal = criarModal();
        document.body.appendChild(modal);
    }
    
    // Preenche o modal com os dados do elemento
    const modalSimbolo = modal.querySelector('.modal-simbolo');
    const modalNome = modal.querySelector('.modal-nome');
    const modalNumero = modal.querySelector('#modal-numero');
    const modalMassa = modal.querySelector('#modal-massa');
    const modalCategoria = modal.querySelector('#modal-categoria');
    
    modalSimbolo.textContent = elemento.simbolo;
    modalNome.textContent = elemento.nome;
    modalNumero.textContent = elemento.numero;
    modalMassa.textContent = elemento.massa + ' u';
    modalCategoria.textContent = elemento.categoria.toUpperCase();
    
    // Define a cor do símbolo baseado na categoria
    const categoria = elemento.categoria.toLowerCase();
    modalSimbolo.style.color = getCategoriaColor(categoria);
    
    // Mostra o modal
    modal.classList.add('ativo');
}

// Função para obter a cor da categoria
function getCategoriaColor(categoria) {
    const cores = {
        'não metal': '#00d9ff',
        'gás nobre': '#a855f7',
        'metal alcalino': '#fbbf24',
        'metal alcalino-terroso': '#fb923c',
        'semimetal': '#10b981',
        'halogênio': '#ec4899',
        'metal pós-transição': '#6366f1',
        'metal de transição': '#ef4444',
        'lantanídeo': '#8b5cf6',
        'actinídeo': '#f97316'
    };
    
    return cores[categoria] || '#00d9ff';
}

// Função para criar a estrutura do modal
function criarModal() {
    const modal = document.createElement('div');
    modal.id = 'modal-elemento';
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-conteudo">
            <span class="modal-fechar">&times;</span>
            <div class="modal-simbolo"></div>
            <h3 class="modal-nome"></h3>
            <div class="modal-info">
                <div class="info-item">
                    <div class="info-label">Número Atômico</div>
                    <div class="info-valor" id="modal-numero"></div>
                </div>
                <div class="info-item">
                    <div class="info-label">Massa Atômica</div>
                    <div class="info-valor" id="modal-massa"></div>
                </div>
                <div class="info-item" style="grid-column: 1 / -1;">
                    <div class="info-label">Categoria</div>
                    <div class="info-valor" id="modal-categoria"></div>
                </div>
            </div>
        </div>
    `;
    
    // Evento para fechar modal ao clicar no X
    const btnFechar = modal.querySelector('.modal-fechar');
    btnFechar.addEventListener('click', () => {
        modal.classList.remove('ativo');
    });
    
    // Evento para fechar modal ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('ativo');
        }
    });
    
    // Evento para fechar modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('ativo')) {
            modal.classList.remove('ativo');
        }
    });
    
    return modal;
}

// Funcionalidades extras do carrossel

// Scroll suave com as setas do teclado
document.addEventListener('keydown', (e) => {
    const carrossel = document.getElementById('carrossel');
    
    if (e.key === 'ArrowLeft') {
        carrossel.scrollBy({
            left: -320,
            behavior: 'smooth'
        });
    } else if (e.key === 'ArrowRight') {
        carrossel.scrollBy({
            left: 320,
            behavior: 'smooth'
        });
    }
});

// Adiciona efeito de parallax ao scroll
let ticking = false;

document.getElementById('carrossel')?.addEventListener('scroll', (e) => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const cards = document.querySelectorAll('.elemento-card');
            const scrollLeft = e.target.scrollLeft;
            
            cards.forEach((card, index) => {
                const cardLeft = card.offsetLeft;
                const distance = Math.abs(scrollLeft - cardLeft);
                const scale = Math.max(0.9, 1 - (distance / 2000));
                card.style.transform = `scale(${scale})`;
            });
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Interação com o SVG da tabela periódica (se disponível)
window.addEventListener('load', () => {
    const svgObject = document.getElementById('tabela-svg');
    
    if (svgObject) {
        svgObject.addEventListener('load', () => {
            const svgDoc = svgObject.contentDocument;
            
            if (svgDoc) {
                // Adiciona interatividade aos elementos do SVG
                const elementosSvg = svgDoc.querySelectorAll('[data-numero]');
                
                elementosSvg.forEach(elementoSvg => {
                    elementoSvg.style.cursor = 'pointer';
                    
                    elementoSvg.addEventListener('click', () => {
                        const numero = elementoSvg.dataset.numero;
                        
                        // Busca o elemento no JSON pelo número
                        fetch('elementos.json')
                            .then(response => response.json())
                            .then(elementos => {
                                const elemento = elementos.find(e => e.numero == numero);
                                if (elemento) {
                                    abrirModal(elemento);
                                }
                            });
                    });
                    
                    // Efeitos de hover
                    elementoSvg.addEventListener('mouseenter', () => {
                        elementoSvg.style.opacity = '0.8';
                        elementoSvg.style.filter = 'brightness(1.2)';
                    });
                    
                    elementoSvg.addEventListener('mouseleave', () => {
                        elementoSvg.style.opacity = '1';
                        elementoSvg.style.filter = 'brightness(1)';
                    });
                });
            }
        });
    }
});

// Observador de scroll para animações
const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Observa os cards quando aparecem na tela
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const cards = document.querySelectorAll('.elemento-card');
        cards.forEach(card => observador.observe(card));
    }, 100);
});

// Console log estilizado
console.log('%c⚛️ Tabela Periódica Interativa', 'font-size: 20px; font-weight: bold; color: #00d9ff;');
console.log('%cCarrossel carregado com sucesso!', 'color: #10b981;');
