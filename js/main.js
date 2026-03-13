Vue.component('note-card', {
    template: `
        <div class="card">
            <div class="card-header">
                <input 
                    type="text" 
                    v-model="card.title" 
                    placeholder="Заголовок"
                    class="title-input"
                    :disabled="card.column === 1 && $parent.isColumn1Blocked">
                <span v-if="card.column === 1 && $parent.isColumn1Blocked" class="blocked-label"></span>
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
                            @change="updateProgress"
                            :disabled="card.column === 1 && $parent.isColumn1Blocked">
                        <input 
                            type="text" 
                            v-model="item.text" 
                            placeholder="Пункт"
                            class="item-input"
                            :disabled="card.column === 1 && $parent.isColumn1Blocked">
                    </label>
                </div>
            </div>
            <div v-if="card.completedAt" class="completed-time">
                Завершено: {{ card.completedAt }}
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
                ],
                completedAt: null
            },
            {
                id: 2,
                title: 'Работа',
                column: 2,
                items: [
                    { text: 'Отчет', done: true },
                    { text: 'Звонок', done: true },
                    { text: 'Письмо', done: true }
                ],
                completedAt: '13.03.2026, 15:30'
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
        },
        isColumn1Blocked() {
            const hasCardOver50 = this.column1.some(card => {
                const total = card.items.length;
                const done = card.items.filter(item => item.done).length;
                const progress = total ? (done / total) * 100 : 0;
                return progress > 50;
            });
            return this.column2.length >= 5 && hasCardOver50;
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
            ],
            completedAt: null
        };
        this.cards.push(newCard);
        this.saveToStorage();
        console.log('Добавлена карточка в колонку', column);
    },

        handleUpdate(data) {
            const card = this.cards.find(c => c.id === data.id);
            if (!card) return;
            const oldColumn = card.column;
            if (card.column === 1 && data.progress > 50) {
                if (this.column2.length < 5) {
                    card.column = 2;
                    console.log('Карточка перемещена в колонку 2');
                }
            }
            if ((card.column === 1 || card.column === 2) && data.progress === 100) {
                card.column = 3;
                card.completedAt = new Date().toLocaleString();
                console.log('Карточка завершена и перемещена в колонку 3');
            }
            if (oldColumn !== card.column) {
                this.saveToStorage();
            }
        },
        saveToStorage() {
            localStorage.setItem('notes', JSON.stringify(this.cards));
        },
        loadFromStorage() {
            const saved = localStorage.getItem('notes');
            if (saved) {
                this.cards = JSON.parse(saved);
            }
        }
    },
    mounted() {
        this.loadFromStorage();
        console.log('Приложение загружено');
    }
});