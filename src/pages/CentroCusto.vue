<template>
 <div>
    <h5>Cadastro de Centro de Custo</h5>
        <b-form inline  class="mt-4">
            <label class="sr-only" for="inline-form-input-name">Name</label>
            <b-form-input
            v-model="centro.name" required
            id="cantro-custo"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Insira o Centro de Custo"
            >
            </b-form-input>

        <b-col xs="12">
            <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
            <b-button class="ml-2"  @click="reset">Cancelar</b-button>
        </b-col>
 
  </b-form>
  <hr>
    <b-table hover striped :items="centrCusto" :fields="fields">
        <template v-slot:cell(actions)="data">
            <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                <h6>Edit</h6>
                <i class="fa fa-pencil"></i>
            </b-button>
            <b-button variant="danger" @click="loadUser(data.item, 'remove')">
               <h6>Del</h6>
                <i class="fa fa-trash"></i>
            </b-button>
        </template>
    </b-table>
</div>
</template>


<script>

import { baseApiUrl, showError } from '../global'
import axios from 'axios'

export default {
  name: 'centroCusto',
  data: function() {
      return {
           mode: 'save',
           centro: {},
           centrCusto: [],
        //   cargo:[], 
          fields: [
              { key: 'id', label: 'id', sortable: true },
              { key: 'name', label: 'Nome', sortable: true },
            //   { key: 'email', label: 'Email', sortable: true },
            //   { key: 'email', label: 'E-mail', sortable: true },
              { key: 'actions', label: 'Ações' }
          ]
      }
  },
    methods: {
        
        loadCentroCusto() {
            // const url = 'http://localhost:3000/usuarios'
            const url = `${baseApiUrl}/centrocusto`
            axios.get(url).then(res => {
                this.centrCusto = res.data
            })
        },
    //      loadCargo() {
    //         // const url = 'http://localhost:3000/usuarios'
    //         const url = `${baseApiUrl}/cargo`
    //         axios.get(url).then(res => {
    //             const cargo2 = res.data.map(i => i['name'])
    //             this.cargo = cargo2
            
    //         })
    //     },
        reset() {
            this.mode = 'save'
            this.centro = {}
            this.loadCentroCusto()
        },
        save() {
            const method = this.centro.id ? 'put' : 'post'
            const id = this.centro.id ? `/${this.centro.id}` : ''
            axios[method](`${baseApiUrl}/centrocusto${id}`, this.centro)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.centro.id
            axios.delete(`${baseApiUrl}/centrocusto/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadUser(centro, mode = 'save') {
            this.mode = mode
            this.centro = { ...centro }
        }
     },
    mounted() {
     this.loadCentroCusto()
     }
  
}
</script>

<style>

</style>