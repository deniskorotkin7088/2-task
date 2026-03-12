Vue.component('note-card', {
    template: `
        <div class="card">
            <div class="card-header">
                <input 
                    type="text" 
                    v-model="card.title" 
                    placeholder="Заголовок карточки"
                    class="title-input">
            </div>
            <div class="card-body">
                <p>Колонка: {{ card.column }}</p>
                <p>Пунктов: {{ card.items.length }}</p>
            </div>
        </div>
    `,
    props: {
        card: {
            type: Object,
            required: true
        }
    }
});

let app = new Vue({
    el: '#app',
    data: {
        cards: [
            {
                id: 1,
                title: 'Заметка 1',
                column: 1,
                items: [
                    { text: 'Пункт 1', done: false },
                    { text: 'Пункт 2', done: false },
                    { text: 'Пункт 3', done: false }
                ]
            },
            {
                id: 2,
                title: 'Заметка 2',
                column: 1,
                items: [
                    { text: 'Пункт 1', done: false },
                    { text: 'Пункт 2', done: false },
                    { text: 'Пункт 3', done: false }
                ]
            },
            {
                id: 3,
                title: 'Заметка 3',
                column: 2,
                items: [
                    { text: 'Пункт 1', done: false },
                    { text: 'Пункт 2', done: false },
                    { text: 'Пункт 3', done: false }
                ]
            },
            {
                id: 4,
                title: 'Заметка 4',
                column: 3,
                items: [
                    { text: 'Пункт 1', done: false },
                    { text: 'Пункт 2', done: false },
                    { text: 'Пункт 3', done: false }
                ]
            }
        ]
    },
    computed: {
        column1() {
            return this.cards.filter(card => card.column === 1);
        },
        column2() {
            return this.cards.filter(card => card.column === 2);
        },
        column3() {
            return this.cards.filter(card => card.column === 3);
        }
    },
    methods: {
        addCard(column) {
            const newCard = {
                id: Date.now(),
                title: 'Новая карточка',
                column: column,
                items: [
                    { text: '', done: false },
                    { text: '', done: false },
                    { text: '', done: false }
                ]
            };
            this.cards.push(newCard);
            console.log('Добавлена карточка в колонку', column);
        }
    },
    mounted() {
        console.log('Notes App запущена');
        console.log('Компонент note-card создан');
    }
});