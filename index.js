let fruits = [
    {id: 1, title: 'apple', price: 20, img: 'https://frutstar.ru/image/catalog/fruits/yabloki.jpg'},
    {id: 2, title: 'an orange', price: 30, img: 'https://cdn.pixabay.com/photo/2010/12/13/09/51/orange-1714_1280.jpg'},
    {id: 3, title: 'mango', price: 40, img: 'https://i.ebayimg.com/00/s/NzE0WDEwMDA=/z/2PcAAOSw3ZtaRKUc/$_57.JPG?set_id=8800005007'}
];

const toHTML = fruit => `
            <div class="col">
                <div class="card">
                    <img style="height: 300px;" src="${fruit.img}" class="card-img-top">
                    <div class="card-body">
                      <h5 class="card-title">${fruit.title}</h5>
                      <a href="#" class="btn btn-primary" data-btn="price" data-id=${fruit.id}>Check price</a>
                      <a href="#" class="btn btn-danger" data-btn="remove" data-id=${fruit.id}>Remove</a>
                    </div>
                  </div>
            </div>
`;

function render() {
    const html = fruits.map(toHTML).join('');
    document.querySelector('#fruits').innerHTML = html;
}

render();

const myModal = $.modal({
    title: 'Price',
    closable: true,
    width: '400px',
    buttons: [
        {text: 'Ok', type: 'primary', handler() {
            myModal.close();
        }}
    ]
});  

document.addEventListener('click', event => {
    event.preventDefault();
    const btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const fruit = fruits.find(f => f.id === id);

    if (btnType === 'price') {
        myModal.setContent(`
            <div><img src="${fruit.img}" style="margin-left: 50px; height: 50px; width="50px"></div>
            <p>Price on ${fruit.title} is equal <strong>${fruit.price}$</strong></p>
        `);

        myModal.open(fruits);
    }
    else if (btnType === 'remove') {
        $.confirm({
            title: 'Are you shure?',
            content: `You are removing fruit ${fruit.title}`
        })
        .then(() => {
            console.log('Reject');
            fruits = fruits.filter(f => f.id !== id);
            render();
        })
        .catch(() => {
            console.log('Cancel');
        });
    }
});