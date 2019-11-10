<template>
    <v-container fluid>
        <v-form v-model="valid">
            <v-container>
                <v-row>
                    <v-col
                    cols="12"
                    md="5"
                    >
                    <v-text-field
                        v-model="event_name"
                        :rules="eventnameRules"
                        :counter="25"
                        label="Event Name"
                        required
                    ></v-text-field>
                    </v-col>

                    <v-col
                    cols="12"
                    md="5"
                    >
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="dates"
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                        <v-combobox
                            v-model="dates"
                            multiple
                            chips
                            small-chips
                            label="Multiple picker in menu"
                            prepend-icon="mdi-calendar-month-outline"
                            readonly
                            v-on="on"
                        ></v-combobox>
                        </template>
                        <v-date-picker v-model="dates" multiple no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                    </v-col>
                    <v-col
                    cols="12"
                    md="2"
                    >
                    <v-btn
                        class="ma-2"
                        :loading="loading"
                        :disabled="loading"
                        color="secondary"
                        @click="save()"
                        >
                        Reserve
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
        <v-simple-table>
            <template v-slot:default fluid>
            <thead>
                <tr>
                <th class="text-left">Event Name</th>
                <th class="text-left">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in events" :key="item">
                    <td>{{ item.event_name }}</td>
                    <td>{{ moment(item.reserved_date).format('MMMM Do YYYY, dddd') }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>
<script src="./home.js"></script>
