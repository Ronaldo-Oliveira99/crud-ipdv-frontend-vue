<template>
 <div>
      <h5>Cadastro de Departamento</h5>
    <b-form>
        <b-col md="6" sm="12">
            <div class="mt-4">
                <label for="">Centro de Custo</label>
                <b-form-select v-model="selected" :options="centroName"  v-on:change="getSelectedItem(selected)"  size="sm"></b-form-select>
                <small>*obrigatorio o seleção</small>
            </div>
            
            <label class="sr-only" for="inline-form-input-name">Name</label>
            <b-form-input
            v-model="dpto.name" required
            id="dpto"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Insira o Departamento"
            ></b-form-input>

            <b-col xs="12" class="mt-4">
                <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
                <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
                <b-button class="ml-2"  @click="reset">Cancelar</b-button>
            </b-col>
            </b-col>
    </b-form>
  <hr>
    <b-table hover striped :items="dptoFild" :fields="fields">
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
  name: 'departamento',
  data: function() {
      return {
           mode: 'save',
           dpto: {},
           dptoFild: [],
           centroid: null,
           centroName: [],
           centroObj: [],

          fields: [
              { key: 'id', label: 'id', sortable: true },
              { key: 'departamento', label: 'Departamento', sortable: true },
              { key: 'centro_custo', label: 'Centro de Custo', sortable: true },
            //   { key: 'email', label: 'Email', sortable: true },
            //   { key: 'email', label: 'E-mail', sortable: true },
              { key: 'actions', label: 'Ações' }
          ]
      }
  },
    methods: {
         getSelectedItem(centrCusto){
            let arr = []
            this.centroObj.filter(i => i.name === centrCusto && arr.push(i.id) )
            let teste = arr.pop()
            this.dpto.centroId = teste

            console.log("this.centrCusto", teste)
            console.log(centrCusto)

             this.loadDepto()

          },
        
        loadDepto() {
            // const url = 'http://localhost:3000/usuarios'
            const url = `${baseApiUrl}/deptwithcentro`
            axios.get(url).then(res => {
                this.dptoFild = res.data
                console.log("this.dptoFild", res.data)
            })
        },
        loadCentroCusto() {
            // const url = 'http://localhost:3000/usuarios'
            const url = `${baseApiUrl}/centrocusto`
            axios.get(url).then(res => {
                const centro = res.data.map(i => i['name'])
                this.centroName = centro
                
                const centro2 = res.data.map(i => {
                    return {id: i.id, name:i.name}
                })
                 this.centroObj = centro2
                 console.log("this.centrCusto", centro2)
                 console.log("this.centrCustoname", centro)
            })
        },
        reset() {
            this.mode = 'save'
            this.dpto = {}
            this.loadCentroCusto()
        },
        save() {
            const method = this.dpto.id ? 'put' : 'post'
            const id = this.dpto.id ? `/${this.dpto.id}` : ''
            axios[method](`${baseApiUrl}/departamento${id}`, this.dpto)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.dpto.id
            axios.delete(`${baseApiUrl}/departamento/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadUser(dpto, mode = 'save') {
            this.mode = mode
            this.dpto = { ...dpto }
        }
     },
    mounted() {
        this.loadDepto(),
        this.loadCentroCusto()
     }
  
}
</script>

<style>

</style>