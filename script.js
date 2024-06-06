document.addEventListener('DOMContentLoaded', function() {
    new Cleave('#valorMetroQuadrado', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        prefix: 'R$ '
    });

    var areaCount = 1;

    document.getElementById('add-dimensao').addEventListener('click', function() {
        areaCount++;
        var container = document.getElementById('dimensoes-container');
        var novaDimensao = document.createElement('div');
        novaDimensao.className = 'dimensao';
        novaDimensao.setAttribute('data-id', areaCount);
        novaDimensao.innerHTML = `
            <h2>Área ${areaCount}</h2>
            <label>Largura (m):</label>
            <input type="number" class="largura" placeholder="Largura em metros">
            <label>Comprimento (m):</label>
            <input type="number" class="comprimento" placeholder="Comprimento em metros">
            <button class="remove-dimensao" onclick="removerDimensao(${areaCount})">Remover</button>
        `;
        container.appendChild(novaDimensao);
    });
});

function removerDimensao(id) {
    var dimensao = document.querySelector(`.dimensao[data-id="${id}"]`);
    dimensao.remove();
}

function calcular() {
    var valorMetroQuadradoInput = document.getElementById('valorMetroQuadrado').value;
    var valorMetroQuadrado = parseFloat(valorMetroQuadradoInput.replace(/[^\d,]/g, '').replace(',', '.'));

    if (isNaN(valorMetroQuadrado)) {
        document.getElementById('resultados').innerHTML = "Por favor, preencha o valor do metro quadrado com um valor válido.";
        return;
    }

    var larguras = document.querySelectorAll('.largura');
    var comprimentos = document.querySelectorAll('.comprimento');
    var resultados = document.getElementById('resultados');
    resultados.innerHTML = '';

    larguras.forEach((larguraElem, index) => {
        var largura = parseFloat(larguraElem.value);
        var comprimento = parseFloat(comprimentos[index].value);

        if (isNaN(largura) || isNaN(comprimento)) {
            resultados.innerHTML += `<div class="resultado-item">Área ${index + 1}: Por favor, preencha os campos de largura e comprimento com valores válidos.</div>`;
            return;
        }

        var area = largura * comprimento;
        var custoTotal = area * valorMetroQuadrado;

        resultados.innerHTML += `<div class="resultado-item">Área ${index + 1}: Área: ${area.toFixed(2)} m²<br>Custo Total: R$ ${custoTotal.toFixed(2)}</div>`;
    });
}
