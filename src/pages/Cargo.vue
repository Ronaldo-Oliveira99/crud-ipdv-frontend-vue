<template>
 <div>
      <h5>Cadastro de Cargos</h5>
    <b-form  class="mt-4">
        <b-col md="6" sm="12">
            <div class="mb-4">
                <label for="">Cargos</label>
                <b-form-select v-model="selected" :options="dptoName"  v-on:change="getSelectedItem(selected)"  size="sm" ></b-form-select>
                  <small>*obrigatorio o seleção</small>
            </div>
            
            <label class="sr-only" for="inline-form-input-name">Name</label>
            <b-form-input
            v-model="cargo.name" required
            id="cargo"
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
    <b-table hover striped :items="cargoFild" :fields="fields">
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
           cargo: {},
           cargoFild: [],
           dptoId: {},
           dptoName: [],
           dptoObj:[], 
           fields: [
              { key: 'id', label: 'id', sortable: true },
              { key: 'name', label: 'Nome', sortable: true },
              { key: 'actions', label: 'Ações' }
          ]
      }
  },
    methods: {
         getSelectedItem(deptoname){
            let arr = []
            this.dptoObj.filter(i => i.name === deptoname && arr.push(i.id) )
            let teste = arr.pop()
            this.cargo.departamentoId = teste

            this.loadDepto()

          },
        
        loadCargo() {
            const url = `${baseApiUrl}/cargo`
            axios.get(url).then(res => {
                this.cargoFild = res.data
                 console.log("this.cargoFild", res.data)
            })
        },
         loadDepto() {
            // const url = 'http://localhost:3000/usuarios'
            const url = `${baseApiUrl}/departamento`
            axios.get(url).then(res => {
                const dpto = res.data.map(i => i['name'])
                this.dptoName = dpto
                
                const dpto2 = res.data.map(i => {
                    return {id: i.id, name:i.name}
                })
                 this.dptoObj = dpto2
                 console.log("this.centrCusto", dpto2)
                 console.log("this.centrCustoname", dpto)
            })
        },
        reset() {
            this.mode = 'save'
            this.cargo = {}
            this.loadCentroCusto()
        },
        save() {
            const method = this.cargo.id ? 'put' : 'post'
            const id = this.cargo.id ? `/${this.cargo.id}` : ''
            axios[method](`${baseApiUrl}/cargo${id}`, this.cargo)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.cargo.id
            axios.delete(`${baseApiUrl}/cargo/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadUser(cargo, mode = 'save') {
            this.mode = mode
            this.cargo = { ...cargo }
        }
     },
    mounted() {
     this.loadCargo(),
     this.loadDepto()
     }
  
}
</script>

<style>

</style>
