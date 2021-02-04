<template>
  <div class="user-cadastro">
      <h5>Cadastro de Funcionário</h5>
        <b-form class="mt-4">
            <input id="user-id" type="hidden" v-model="user.id" />
                <b-row v-show="mode === 'save'">
                    <b-col md="6" sm="12">

                        <p>Cargo:</p>
                        <b-form-select v-model="selected" :options="cargoName" v-on:change="getSelectedItem(selected)"  size="sm" class="mt-0"></b-form-select>
                        <small>*obrigatorio o seleção</small>
                    
                    </b-col>
                </b-row>
                <b-row>
                <b-col md="6" sm="12" class="mt-3 mb-2">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                            v-model="user.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12" class="mt-3 mb-2">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text"
                            v-model="user.email" required
                            placeholder="Informe o Email" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <b-table hover striped :items="users" :fields="fields">
            <template  v-slot:cell(actions)="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <h6>Edit</h6>
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                    <h6>Del</h6>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>

import { baseApiUrl, showError } from '../global'
import axios from 'axios'

export default {
  name: 'cadastro',
  data: function() {
      return {
          mode: 'save',
          user: {},
          users: [],
          cargoId:{},
          cargoName:[],
          cargoObj:[],
          fields: [
              { key: 'id', label: 'id', sortable: true },
              { key: 'name', label: 'Nome', sortable: true },
              { key: 'email', label: 'Email', sortable: true },
            //   { key: 'email', label: 'E-mail', sortable: true },
              { key: 'actions', label: 'Ações' }
          ]
      }
  },
    methods: {
        getSelectedItem(cargoname){
             console.log("dcargonameIDD", cargoname)
            let arr = []
            this.cargoObj.filter(i => i.name === cargoname && arr.push(i.id) )
            let teste = arr.pop()
            this.user.cargoId = teste

            console.log("cargoIdIDD", teste)
            // console.log(centrCusto)
            
            this.loadDepto()

          },
        
        loadUsers() {
            const url = `${baseApiUrl}/usuarios`
            axios.get(url).then(res => {
                this.users = res.data
                console.log(this.users)
            })
        },
         loadCargo() {
          const url = `${baseApiUrl}/cargo`
            axios.get(url).then(res => {
                const cargo = res.data.map(i => i['name'])
                this.cargoName = cargo
                
                const cargo2 = res.data.map(i => {
                    return {id: i.id, name:i.name}
                })
                 this.cargoObj = cargo2
                 console.log("this.centrCusto", cargo2)
                 console.log("this.centrCustoname", cargo)
            
            })
        },
        reset() {
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },
        save() {
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''
            axios[method](`${baseApiUrl}/usuarios${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.user.id
            axios.delete(`${baseApiUrl}/usuarios/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadUser(user, mode = 'save') {
            this.mode = mode
            this.user = { ...user }
        }
    },
    mounted() {
        this.loadUsers()
        this.loadCargo()
     }
  
}
</script>
<style>

</style>