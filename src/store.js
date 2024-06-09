import { reactive } from 'vue';

export const userStore = reactive({
    user: {
        login: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        patronymic: '',
        phone: ''
    },
    setUser(data) {
        this.user = { ...data };
    },
    updateUser(data) {
        this.user = { ...this.user, ...data };
    }
});
