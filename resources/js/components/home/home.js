var moment = require('moment');
export default {
    data () {
        return {
            headers: [
            {
                text: 'Event Name',
                align: 'left',
                sortable: false,
            },
            { text: 'Date', value: 'date' },
            ],
            dates: [],
            menu: false,
            events: null,
            moment:moment,
            loading:false,
            responseMessage: '',
            eventnameRules: [
                v => !!v || 'Event Name is required'
            ],
            event_name:'',
            reserved_dates:[],
            alert:false
        }
    },
    created() {
        this.fetchEvents()
    },
    methods: {
        fetchEvents() {
            axios.get('/events')
                .then(response => {
                    this.events = JSON.parse(JSON.stringify(response.data.data));
                });
        },
        save() {
            this.loading = true;
            axios.post('/events',{
                event_name: this.event_name,
                reserved_dates: this.dates
            }).then(response => {
                this.fetchEvents();
                this.alert = true;
                this.loading = false;
                this.responseMessage = 'Dates successfully reserved.';
                this.close();
            }).catch((error) => {
                this.alert = true;
                this.responseMessage = 'All fields are required';
                this.loading = false;
            });
        }
    }
}
