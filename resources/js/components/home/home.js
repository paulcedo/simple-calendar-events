var moment = require('moment');
export default {
    data () {
        return {
            headers: [
            {
                text: 'Event Name',
                align: 'left',
                sortable: false,
                value: 'event',
            },
            { text: 'Date', value: 'date' },
            ],
            date: new Date().toISOString().substr(0, 10),
            dates: [],
            menu: false,
            events: null,
            moment:moment,
            loading:false,
            errMessage: '',
            eventnameRules: [
                v => !!v || 'Event Name is required'
            ],
            event_name:'',
            reserved_dates:[]
        }
    },
    created() {
        this.fetchEvents()
        this.fetchEventDates()
        this.datesToArray()
    },
    methods: {
        fetchEvents() {
            axios.get('/events')
                .then(response => {
                    this.events = JSON.parse(JSON.stringify(response.data.data));
                });
        },
        fetchEventDates() {
            axios.get('/events/dates')
                .then(response => {
                    this.reserved_dates= JSON.parse(JSON.stringify(response.data.data));
                });
        },
        datesToArray(){
            this.reserved_dates.forEach(function(element) {
                this.dates.push = element;
            });
            console.log(this.dates)
        },
        save() {
            console.log(this.dates)
            this.loading = true;
            axios.post('/events',{
                event_name: this.event_name,
                reserved_dates: this.dates
            }).then(response => {
                this.fetchEvents();
                this.loading = false;
                this.close();
            }).catch((error) => {
                this.alert = true;
                this.errMessage = error.response.data.errors;
                this.loading = false;
            });
        }
    }
}
