import {addClass, removeClass} from './helpers';

let mouseOverHandler = (event) =>{
    let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
    addClass(span, 'tooltip-show');
};
let mouseOutHandler = (event) =>{
    let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
    removeClass(span, 'tooltip-show');
};

export default{
    install(Vue){
        Vue.directive('tooltip', {
            bind(el, bindins){
                let span = document.createElement('SPAN');
                let text = document.createTextNode(`Seats available: ${bindins.value.seats}`);
                span.appendChild(text);
                addClass(span, 'tooltip');
                el.appendChild(span);
                let div = el.getElementsByTagName('DIV')[0];
                div.addEventListener('mouseover', mouseOverHandler);
                div.addEventListener('mouseout',mouseOutHandler);
            },
            unbind(el){
                let div = el.getElementsByTagName('DIV')[0];
                div.removeEventListener('mouseover', mouseOverHandler);
                div.removeEventListener('mouseout',mouseOutHandler);
            }
        })
    }
}