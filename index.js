const fruits = [
    {id: 1, title: 'apple', price: 20, img: 'https://frutstar.ru/image/catalog/fruits/yabloki.jpg'},
    {id: 2, title: 'an orange', price: 30, img: 'https://cdn.pixabay.com/photo/2010/12/13/09/51/orange-1714_1280.jpg'},
    {id: 3, title: 'mango', price: 40, img: 'https://i.ebayimg.com/00/s/NzE0WDEwMDA=/z/2PcAAOSw3ZtaRKUc/$_57.JPG?set_id=8800005007'}
];

const myModal = $.modal({
    title: 'Dmitriy Modal',
    closable: true,
    content: `
    <h4>Modal is working</h4>
    <p>Lorem ipsum dolor sit.</p>
    `,
    width: '400px',
    buttons: [
        {text: 'Ok', type: 'primary', handler() {
            console.log('Button ok clicked');
            myModal.close();
        }},
        {text: 'Cancel', type: 'danger', handler() {
            console.log('Button cancel clicked');
            myModal.close();
        }}
    ]
});  
