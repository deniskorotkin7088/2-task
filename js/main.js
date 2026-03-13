Vue.component('note-card', {
    template: `
        <div class="card">
            <div class="card-header">
                <input 
                    type="text" 
                    v-model="card.title" 
                    placeholder="Заголовок"
                    class="title-input">
            </div>
            <div class="progress">
                Прогресс: {{ progress }}%
            </div>
            <div class="checklist">
                <div v-for="(item, index) in card.items" :key="index" class="checklist-item">
                    <label>
                        <input 
                            type="checkbox" 
                            v-model="item.done"
                            @change="updateProgress">
                        <input 
                            type="text" 
                            v-model="item.text" 
                            placeholder="Пункт"
                            class="item-input">
                    </label>
                </div>
            </div>
        </div>
    `,
    props: {
        card: {
            type: Object,
            required: true
        }
    },
    computed: {
        progress() {
            if (!this.card.items || this.card.items.length === 0) return 0;
            const total = this.card.items.length;
            const done = this.card.items.filter(item => item.done).length;
            return Math.round((done / total) * 100);
        }
    },
    methods: {
        updateProgress() {
            this.$emit('update', {
                id: this.card.id,
                progress: this.progress
            });
        }
    }
});
let app = new Vue({
    el: '#app',
    data: {
        cards: [
            {
                id: 1,
                title: 'Покупки',
                column: 1,
                items: [
                    { text: 'Молоко', done: false },
                    { text: 'Хлеб', done: false },
                    { text: 'Яйца', done: false }
                ]
            },
            {
                id: 2,
                title: 'Работа',
                column: 2,
                items: [
                    { text: 'Отчет', done: false },
                    { text: 'Звонок', done: false },
                    { text: 'Письмо', done: false }
                ]
            }
        ]
    },
    computed: {
        column1() {
            return this.cards.filter(c => c.column === 1);
        },
        column2() {
            return this.cards.filter(c => c.column === 2);
        },
        column3() {
            return this.cards.filter(c => c.column === 3);
        }
    },
    methods: {
        handleUpdate(data) {
            const card = this.cards.find(c => c.id === data.id);
            if (!card) return;
            if (card.column === 1 && data.progress > 50) {
                if (this.column2.length < 5) {
                    card.column = 2;
                    console.log('Карточка перемещена в колонку 2');
                }
            }
            if ((card.column === 1 || card.column === 2) && data.progress === 100) {
                card.column = 3;
                console.log('Карточка перемещена в колонку 3');
            }
        }
    }
});