import { Cookie } from "./models/Cookies.js";
import { numeroDeCookies } from "./controllers/numeroDeCookies.js";
import { criaItem } from "./controllers/criaItem.js";
import { somaItensDaCesta } from "./controllers/somaItensDaCesta.js";
import { removeTextoCestaVazia } from "./controllers/removeTextoCestaVazia.js";
import { finalizaCompra } from "./controllers/finalizaCompra.js";
const tradicional = new Cookie('TRADICIONAL', 10);
const chocolate = new Cookie('CHOCOLATE', 10);
const doceAmor = new Cookie('DOCE AMOR', 12, true);
const amorDeVo = new Cookie('AMOR DE VÓ', 12);
const doseDeAmor = new Cookie('DOSE DE AMOR', 12, true);
const lista = [tradicional, chocolate, doceAmor, amorDeVo, doseDeAmor];
export const cesta = [];
export const listaDaCesta = document.querySelector('[data-listaCesta]');
const inptCheck = document.querySelectorAll('[data-check]');
const form = document.querySelectorAll('[data-form]');
form.forEach((element) => {
    element.addEventListener('submit', (event) => {
        event.preventDefault();
        const alvo = element.attributes[0].nodeValue;
        const quantidadeCookie = numeroDeCookies(`[data-quantidade="${alvo}"]`);
        const item = encontraInformacoes(`[data-titulo="${alvo}"]`);
        const precoCookie = quantidadeCookie * Number(item === null || item === void 0 ? void 0 : item.preco);
        if (item === null || item === void 0 ? void 0 : item.escolheMassa) {
            inptCheck.forEach(function (checkboxes) {
                if (checkboxes.checked) {
                    const massa = checkboxes.dataset.check;
                    checkboxes.checked = false;
                    criaItem(item === null || item === void 0 ? void 0 : item.nome, quantidadeCookie, precoCookie, massa);
                }
            });
        }
        else {
            criaItem(item === null || item === void 0 ? void 0 : item.nome, quantidadeCookie, precoCookie);
        }
        console.log(cesta);
        removeTextoCestaVazia();
        somaItensDaCesta(cesta);
        finalizaCompra();
    });
});
function encontraInformacoes(seletor) {
    const inptItem = document.querySelector(seletor);
    const item = inptItem.textContent;
    const encontra = lista.find(cookie => cookie.nome == item);
    return encontra;
}
