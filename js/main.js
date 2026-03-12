let app = new Vue({
    el: '#app',
    data: {
        message: 'Notes App запущена'
    },
    mounted() {
        console.log(this.message);
        console.log('Приложение готово к работе');
    }
});