Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}

function _createModelFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div');
    }

    const wrap = document.createElement('div');
    wrap.classList.add('modal-footer');

    buttons.forEach(button => {
        const $button = document.createElement('button');
        $button.textContent = button.text;
        $button.classList.add('btn');
        $button.classList.add(`btn-${button.type || 'secondary'}`);
        $button.onclick = button.handler || noop;

        wrap.appendChild($button);
    });

    return wrap;
}

function _createModal(options) {
    const DEFAULT_WIDTH = '600px';
    const modal = document.createElement('div');
    modal.classList.add('dmodal');
    modal.insertAdjacentHTML('afterbegin',`
    <div class="modal-overlay" data-close="true">
        <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
            <div class="modal-header">
                <span class="modal-title">${options.title || 'Default title'}</span>
                ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
            </div>
            <div class="modal-body" data-content>
                ${options.content || ''}
            </div>
        </div>
    </div>
    `);
    const footer = _createModelFooter(options.buttons);
    footer.appendAfter(modal.querySelector('[data-content]'));
    document.body.appendChild(modal);
    return modal;
}
 
$.modal = function(options) {
    const $modal = _createModal(options);
    const ANIMATION_SPEED = 200;
    let closing = false;
    let destroyed = false;

    const modal = {
        open() {
            if (destroyed) {
                console.log('Window destroyed');
            }
            if (!closing) $modal.classList.add('open');
        },
        close() {
            closing = true;
            $modal.classList.remove('open');
            $modal.classList.add('hide');
            setTimeout(() => {
                closing = false;
                $modal.classList.remove('hide');
                if (typeof options.onClose === 'function') {
                    options.onClose();
                }
            },ANIMATION_SPEED);
        }
    };

    const listener = event => {
        if (event.target.dataset.close) {
            modal.close();
        }
    };

    $modal.addEventListener('click', listener);

    return Object.assign(modal, {
        destroy() {
            destroyed = true;
            $modal.parentNode.removeChild($modal);
            $modal.removeEventListener('click', listener);
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html;
        }
    });
};