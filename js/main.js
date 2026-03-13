// КОМПОНЕНТ КАРТОЧКИ - как в методичке (стр. 46-48)
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
            
            <!-- ПРОГРЕСС - как вычисляемое свойство (стр. 38-45) -->
            <div class="progress">
                Прогресс: {{ progress }}%
            </div>
            
            <!-- ЧЕК-ЛИСТ - как в методичке (стр. 20-25) -->
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
    // ВЫЧИСЛЯЕМЫЕ СВОЙСТВА (стр. 38-45)
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
            this.$emit('update', this.progress);
        }
    }
});

// Корневой экземпляр Vue (стр. 5-9)
let app = new Vue({
    el: '#app',
    data: {
        cards: [
            {
                id: 1,
                title: 'Покупки',
                column: 1,
                items: [
                    { text: 'Молоко', done: true },
                    { text: 'Хлеб', done: false },
                    { text: 'Яйца', done: false }
                ]
            },
            {
                id: 2,
                title: 'Работа',
                column: 1,
                items: [
                    { text: 'Отчет', done: true },
                    { text: 'Звонок', done: true },
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
    }
});