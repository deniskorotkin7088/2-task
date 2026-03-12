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
            <div class="checklist">
                <div v-for="(item, index) in card.items" :key="index" class="checklist-item">
                    <label>
                        <input 
                            type="checkbox" 
                            v-model="item.done"
                            @change="updateItems">
                        <input 
                            type="text" 
                            v-model="item.text" 
                            :placeholder="'Пункт ' + (index + 1)"
                            class="item-input"
                            @input="updateItems">
                    </label>
                    <button 
                        v-if="card.items.length > 3" 
                        @click="removeItem(index)"
                        class="remove-btn">×</button>
                </div>
                <button 
                    v-if="card.items.length < 5" 
                    @click="addItem" 
                    class="add-item-btn">
                    + Добавить пункт
                </button>
            </div>
            <div class="items-counter">
                Пунктов: {{ card.items.length }}/5
            </div>
        </div>
    `,
    props: {
        card: {
            type: Object,
            required: true
        }
    },
    methods: {
        addItem() {
            if (this.card.items.length < 5) {
                this.card.items.push({ text: '', done: false });
                this.$emit('update');
            }
        },
        removeItem(index) {
            if (this.card.items.length > 3) {
                this.card.items.splice(index, 1);
                this.$emit('update');
            }
        },
        
        updateItems() {
            this.$emit('update');
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
                title: 'Задачи по работе',
                column: 1,
                items: [
                    { text: 'Написать отчет', done: true },
                    { text: 'Созвониться с клиентом', done: false },
                    { text: 'Отправить письмо', done: false }
                ]
            },
            {
                id: 3,
                title: 'Идеи для проекта',
                column: 2,
                items: [
                    { text: 'Добавить анимацию', done: false },
                    { text: 'Улучшить дизайн', done: false },
                    { text: 'Оптимизировать код', done: false },
                    { text: 'Написать тесты', done: false }
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
        console.log('Notes App с чек-листами запущена!');
    }
});