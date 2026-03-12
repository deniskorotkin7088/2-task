let app = new Vue({
    el: '#app',
    data: {
        cards: [
            {
                id: 1,
                title: 'Тестовая карточка',
                column: 1,
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
                    { text: 'Пункт 1', done: false },
                    { text: 'Пункт 2', done: false },
                    { text: 'Пункт 3', done: false }
                ]
            };
            this.cards.push(newCard);
            console.log('Добавлена карточка в колонку', column);
        }
    },
    mounted() {
        console.log('Notes App запущена');
        console.log('Текущие карточки:', this.cards);
    }
});